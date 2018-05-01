import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { OopsComponent } from './components/oops/oops.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forChild([])
  ],
  declarations: [
    LoginComponent,
    BsNavbarComponent,
    OopsComponent
  ],
  exports:[
    BsNavbarComponent
  ]
  
})
export class CoreModule { }
