import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db : AngularFireDatabase) { }
  onPlaceOrder(order){
    return this.db.list('/orders').push(order)
  }
  ordersList(){
    return this.db.list('/orders').valueChanges()
  }
  userOrders(){
    return this.db.list('/orders').valueChanges();
  }
}
