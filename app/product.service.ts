import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {map} from 'rxjs/operators';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(products){
      this.db.list("/products").push(products);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges()
    .pipe(map(actions => actions.map(a => ({key: a.key, ...a.payload.val()}) )))
  }
  get(id){
     return this.db.object('/products/'+id).snapshotChanges()
     .pipe(map(a => ({key: a.key, ...a.payload.val()}) ));
  }
  update(id , product){
    return this.db.object('/products/'+id).update(product);
  }
  remove(id){
    this.db.object('/products/'+id).remove();
  }
}
