import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/product';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  get(productId:string):AngularFireObject<Product>{
    return this.db.object('/products/'+productId);
  }

  getAll() {
    return this.db.list('/products/').snapshotChanges().map(product => {
      return product.map(p => ({ key: p.key, ...p.payload.val() }));
    });
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  udpate(productId, product){
    return this.db.object('/products/'+productId).update(product);
  }
  
  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
