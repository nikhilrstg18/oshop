import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async get(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .map(x => new ShoppingCart(x['items']));
  }

  getAll() {
    return this.db.list('/shopping-carts/').snapshotChanges().map(cart => {
      return cart.map(p => ({ key: p.key, ...p.payload.val() }));
    });
  }

  async addToCart(product: Product) {
    this.updateCartItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCartItem(product, -1);
    this.monthly();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private monthly() {
    debugger
    let cartToRemove = [];
    let currDate = new Date();
    this.getAll().subscribe(carts => {
      for (let cart of carts) {
        if (currDate.getMonth() - new Date(cart.dateCreated).getMonth() >= 1)
          cartToRemove.push(cart);
      }

      if (cartToRemove.length > 0) {
        for (let cart of cartToRemove) {
          this.db.object('/shopping-carts/' + cart.key).remove();

          if (localStorage.getItem('cartId') === cart.key)
            localStorage.removeItem('cartId');
        }
      }
    });

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
