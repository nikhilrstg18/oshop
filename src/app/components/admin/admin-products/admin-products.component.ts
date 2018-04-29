import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnDestroy {

  products: { key: string, title: string, price: number, category: string, imageUrl: string }[];
  filteredProducts: any[]
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll()
      .subscribe(p => this.filteredProducts = this.products = p);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }


}
