import { Component, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>
  items: Product[] = [];
  itemCount;


  constructor(private productService: ProductService) {
    this.subscription = productService.getAll()
    .subscribe(products => {
      this.products = products;
      this.initialiseDataTable(products);
    });

  }

  reloadItems(params) {
    if (!this.tableResource)
      return;

    this.tableResource.query(params)
      .then(items => this.items = items)

  }

  initialiseDataTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0, limit:10 })
      .then(items => this.items = items)
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;

      this.initialiseDataTable(filteredProducts)
  }


}
