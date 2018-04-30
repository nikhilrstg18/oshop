import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = {name:'',line1:'', line2:'', city:''};
  subscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder(shipping) {
    this.shipping = shipping;
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
