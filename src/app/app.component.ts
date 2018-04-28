import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    db: AngularFirestore) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        debugger
        if (localStorage.getItem('returnUrl')) {
          let returnUrl = localStorage.getItem('returnUrl')
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    })
  }
  
}
