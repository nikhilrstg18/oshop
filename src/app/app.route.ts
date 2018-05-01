import { AdminProductFormComponent } from './admin/components/admin-product-form/admin-product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { CanActivate } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { OopsComponent } from './components/oops/oops.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './shopping/components/order-details/order-details.component';


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