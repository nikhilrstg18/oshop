import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  gLogin() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth
      .auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth
      .auth
      .signOut();

  }
  
  get appUser$(): Observable<AppUser> {
    if (this.user$)
      return this.user$
        .switchMap(user => {
          if (user)
            return this.userService.get(user.uid).valueChanges();

          return Observable.of(null);
        });
  }

}
