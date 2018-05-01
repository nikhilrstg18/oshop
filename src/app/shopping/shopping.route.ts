import { AuthGuard } from 'shared/services/auth-guard.service';

import { LoginComponent } from '../core/components/login/login.component';
import { OopsComponent } from '../core/components/oops/oops.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';




export const shoppingRoutes = [
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },

    { path: 'check-out', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'my-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    
    { path: '**', component: OopsComponent },
];