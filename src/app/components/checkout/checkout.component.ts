import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {

    let cart$ = await this.cartService.get();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.auth.user$.subscribe(user => this.userId = user.uid)

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping) {
    this.shipping = shipping;
    let order = new Order(this.userId, this.shipping, this.cart)

    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }

}
