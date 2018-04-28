import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
      //email, displayName, photoUrl under uid unders /users
  }

  gLogin(){
    this.afAuth
    .auth
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth
      .auth
      .signOut();  
  }

  get user(){
    return this.user$;
  }

  destoryUser(){
    this.user$ = null;
  }
}
