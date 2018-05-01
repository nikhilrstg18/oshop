import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserService } from 'shared/services/user.service';
@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$      
      .map(appUser => appUser.isAdmin);
  }

}
