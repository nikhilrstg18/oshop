import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$:Observable<ShoppingCart>;

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
     await this.cartService.get().then(cart=>this.cart$= cart);


  }


}
