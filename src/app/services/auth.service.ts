import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
      //email, displayName, photoUrl under uid unders /users
  }

  gLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth
    .auth
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth
      .auth
      .signOut();  
      
  }

}
