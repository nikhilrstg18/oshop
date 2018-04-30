import { Order } from './../models/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  get(orderId: string) {

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
