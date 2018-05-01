
import { Component, Input } from '@angular/core';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('card-width') cardWidth: string;
  @Input('image-height') imageHeight: string;
  @Input('show-actions') showActions: boolean;
  @Input('shopping-cart') shoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
