import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(
    private cartService:ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.get();
  }

  getCartProduct(item){
    return {
      key: item.key, 
      title:item.title, 
      imageUrl:item.imageUrl, 
      price:item.price };
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
