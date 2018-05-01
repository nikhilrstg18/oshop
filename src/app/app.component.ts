import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

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
        
        if (localStorage.getItem('returnUrl')) {
          let returnUrl = localStorage.getItem('returnUrl')
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    })
  }
  
  getYears(): string {
    let currentYear = new Date().getFullYear();
    let nextYear = currentYear + 1;
    return currentYear + '-' + nextYear;
  }

}
