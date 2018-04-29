import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  heading: string;
  categories$;
  constructor(
    private categoryService:CategoryService,
    private route: ActivatedRoute) {
    let param = route.snapshot.queryParamMap.get('id');
    if (param)
      this.heading = 'Edit Product';

    this.heading = 'New Product';
    this.categories$ = categoryService.getCategories();
    
  }

  ngOnInit() {
  }

}
