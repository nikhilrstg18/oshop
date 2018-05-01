import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$:Observable<Order[]>;

  constructor(
    private router:Router,
    private orderService:OrderService) { 
    this.orders$ = this.orderService.getAll();
  }
  orderDetails(orderId:string){
    this.router.navigate(['/admin-orders', orderId]);

  }
}
