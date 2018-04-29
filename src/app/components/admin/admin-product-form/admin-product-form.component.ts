import { Product } from './../../../models/product';
import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  heading: string;
  categories$;
  product: Product = { key: '', title: '', price: 0, imageUrl: '', category: '' };
  id: string;
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {

    this.categories$ = categoryService.getAll();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.heading = 'Edit Product';
      productService.get(this.id)
        .valueChanges()
        .take(1)
        .subscribe(p => {
          this.product = p;
        });
    }
    else {
      this.heading = 'New Product';
    }
  }

  save(product) {
    if (this.id)
      this.productService.udpate(this.id, this.product)

    this.productService.create(product).then()
    this.router.navigate(['/admin-products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin-products']);

  }

  ngOnInit() {
  }

}
