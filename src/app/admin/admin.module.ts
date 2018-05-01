import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ng5-validation';
import { SharedModule } from 'shared/shared.module';

import { adminRoutes } from './admin.route';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminProductFormComponent,
  ],
  providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
