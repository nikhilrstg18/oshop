import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {

    productService.getAll()
      .switchMap(p => {
        this.products = p;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category)
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

}
