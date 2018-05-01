import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.user$) {
      return this.auth.user$.map(user => {
        if (user) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      });
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return Observable.of(false);
    }
  }
}
