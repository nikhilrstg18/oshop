import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async get(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .map(x => new ShoppingCart(x['items']));
  }

  async addToCart(product: Product) {
    this.updateCartItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCartItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();

  }

  private async updateCartItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItemRef(cartId, product.key);
    let qty: number;
    let item$ = itemRef
      .valueChanges()
      .take(1)
      .subscribe(item => {
        if (item) {
          qty = item['quantity'] != 0
            ? item['quantity'] + change
            : item['quantity'] + change > 0
              ? change
              : 0;
          if (qty === 0) {
            itemRef.remove();
          } else {
            itemRef.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: qty
            });
          }
        } else {
          itemRef.set({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1
          });
        }
      });
  }

  private getItemRef(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private create() {
    return this.db.list('shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

}
