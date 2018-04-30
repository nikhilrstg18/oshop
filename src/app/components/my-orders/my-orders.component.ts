import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {
  orders$:Observable<Order[]>;

  constructor(
    private router:Router,
    private orderService:OrderService) { 
    this.orders$ = this.orderService.getAll();
  }
  
  orderDetails(orderId:string){
    this.router.navigate(['/my-orders', orderId]);

  }

}
