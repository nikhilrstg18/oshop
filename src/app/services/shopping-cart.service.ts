import { Product } from './../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async get() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItemRef(cartId, product.key);
    let item$ = itemRef
      .valueChanges()
      .take(1)
      .subscribe(item => {
        item
        ? itemRef.update({ product: product, quantity: item['quantity'] + 1 })
        : itemRef.set({ product: product, quantity: 1 });
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

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

}
