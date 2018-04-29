import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  heading: string;
  categories$;
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {

    let param = route.snapshot.queryParamMap.get('id');
    if (param)
      this.heading = 'Edit Product';
    this.heading = 'New Product';

    this.categories$ = categoryService.getCategories();

  }

  save(product) {
    this.productService.create(product).then()
    this.router.navigate(['/admin-products']);
  }

  ngOnInit() {
  }

}
