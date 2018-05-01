import { AuthGuard } from 'shared/services/auth-guard.service';

import { OopsComponent } from '../components/oops/oops.component';
import { OrderDetailsComponent } from '../shopping/components/order-details/order-details.component';
import { ProductsComponent } from '../shopping/components/products/products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ShoppingCartComponent } from '../shopping/components/shopping-cart/shopping-cart.component';


export const adminRoutes = [

    { path: 'shopping-cart', component: ShoppingCartComponent },
    
    { path: 'admin-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/new', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products/:id', component: AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard] },
    { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard] },
];