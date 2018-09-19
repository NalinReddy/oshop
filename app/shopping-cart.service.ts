import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import {map, take} from 'rxjs/operators';
import { Item } from './models/item';
import { Items } from './models/items';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartCount:number=0;
  totalAmount:number=0;
  result:any;

  constructor(private db: AngularFireDatabase) { 
    this.getCart().valueChanges().subscribe((carts:Items) => {
      let count=0;
      let price=0;
     for( let productId in carts.items){
       if(carts.items[productId].quantity == 0){
         continue;
       }
      count += carts.items[productId].quantity;
      price += (carts.items[productId].product.price*carts.items[productId].quantity);
     }
     this.shoppingCartCount=count;
     this.totalAmount = price;
   });
  }
  create(){
    return this.db.list('/shopping-cart').push(
      {
        dateCreated: new Date().getTime()
      }
    )
  }
   getCart(){
     let cartId=this.getOrCreateCartId()
    return this.db.object('/shopping-cart/'+cartId)
    }
  clearCart(){
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-cart/'+cartId+'/items/').remove();
  }
  addToCart(product: Product){
    this.updateCartQuantity(product , 1);
  }
  removeQuantity(product:Product){
    this.updateCartQuantity(product , -1);
  }
   private getItem(product, cartId){
    let data:Item;
    return this.db.object('/shopping-cart/'+cartId+'/items/'+product.key)
    .snapshotChanges().pipe(map((item:any)=> {
              data= {...item.payload.val()}
             if(data.quantity == undefined){
               data.quantity =0;
             }
             return data;
    }))
  }
  private  getOrCreateCartId(){
     let cartId=localStorage.getItem('cartId');
    if(!cartId){
     let key= this.create()
      localStorage.setItem('cartId',key.key); 
      return cartId;
    }
    else {
      return cartId;
    }
  }
  
  updateCartQuantity(product:Product, quantity:number){
    let cartId =  this.getOrCreateCartId();
     this.getItem(product, cartId)
     .pipe(take(1)).subscribe((value:Item) => {
      this.db.object('/shopping-cart/'+cartId+'/items/'+product.key)
      .update({product:product,quantity: value.quantity + quantity })
    })
  }
}
