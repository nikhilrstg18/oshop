import { Component } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  order: Order = { datePlaced: 0 , items:[], shipping:{name:'',line1:'', line2:'', city:''}, UserId:''};
  orderId: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    let orderId = route.snapshot.paramMap.get('id');
    this.orderService.get(orderId).valueChanges()
      .take(1)
      .subscribe(o => {
        this.order = o;
      });
  }
  
  getTotalPrice():number{
    let total= 0;
    for (let item in this.order.items){
      total += this.order.items[item].totalPrice;
    }
    return total;
  }

}
