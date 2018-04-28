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
  
  constructor(private auth:AuthService, private router: Router) {

  }

  logout() {
    this.auth.logout()
    this.auth.user$ = null;
    this.router.navigate(['/']);
  }

 
}
