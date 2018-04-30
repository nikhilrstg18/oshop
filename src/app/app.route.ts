import { AdminProductFormComponent } from './components/admin/admin-product-form/admin-product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OopsComponent } from './components/oops/oops.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';


export const routes = [
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },

    { path: 'check-out', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'my-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },

    { path: 'admin-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/new', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/:id', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard] },

    { path: '**', component: OopsComponent },
];