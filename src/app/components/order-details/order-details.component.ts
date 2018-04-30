import { OrderService } from './../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent{
  order$;
  orderId:string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {

    this.orderId = route.snapshot.paramMap.get('id');    
    this.order$ = this.orderService.getAll();
  }

}
