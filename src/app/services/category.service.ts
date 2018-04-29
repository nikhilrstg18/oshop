import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges().map(category => {
      return category.map(cat => ({ key: cat.key, ...cat.payload.val() }));
    });
  }
  
}
