import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  private user$;
  
  constructor(private auth:AuthService, private router: Router) {
    if(this.auth.user)
    this.user$ = this.auth.user;
   }

  logout() {
    this.auth.logout()
    this.auth.destoryUser();
    this.router.navigate(['/']);
  }

 
}
