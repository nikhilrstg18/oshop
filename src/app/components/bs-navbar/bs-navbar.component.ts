import { ShoppingCartService } from './../../services/shopping-cart.service';
import { AppUser } from './../../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private cartService: ShoppingCartService,
    private auth: AuthService,
    private router: Router) {
    auth.appUser$
      .subscribe(appUser => this.appUser = appUser);

  }

  logout() {
    this.auth.logout()
    this.auth.user$ = null;
    this.router.navigate(['/']);
  }
  async ngOnInit() {
    this.auth.appUser$
      .subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.cartService.get();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount =0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    })

  }


}
