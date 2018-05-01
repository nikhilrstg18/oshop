import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin/components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { OopsComponent } from './components/oops/oops.component';
import { OrderDetailsComponent } from './shopping/components/order-details/order-details.component';
import { ProductsComponent } from './shopping/components/products/products.component';


export const routes = [
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },   

    { path: 'admin-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/new', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/:id', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard] },

    { path: '**', component: OopsComponent },
];