import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { ShoppingCartItem } from 'shared/models/shoppin-cart-item';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
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
