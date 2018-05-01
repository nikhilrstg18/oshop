import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Order } from 'shared/models/order';

import { ShoppingCartService } from './shopping-cart.service';


@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  get(orderId: string): AngularFireObject<Order> {
    return this.db.object('/orders/' + orderId);
  }

  getAll(): Observable<Order[]> {
    return this.db.list('/orders').snapshotChanges().map(orders => {
      return orders.map(o => ({ key: o.key, ...o.payload.val() }));
    });
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

}
