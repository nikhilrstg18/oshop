import { AngularFireAuth } from 'angularfire2/auth';
import { Component} from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private afAuth:AngularFireAuth) { 
    //For checking what happens when logged in and logging out
    afAuth.authState.subscribe(res => {
      console.log(res);
    })
    //email, displayName, photoUrl under uid unders /users

  }

  logout() {
    this.afAuth
      .auth
      .signOut();
      console.log('logged out')
  }
}
