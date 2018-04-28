import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.user.map(user => {
      if (user) return true;

      this.router.navigate(['/login']);
      return false;

    });
}
}
