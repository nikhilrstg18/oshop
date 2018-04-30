import { OrderService } from './../../../services/order.service';
import { Component } from '@angular/core';
import { Order } from '../../../models/order';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
