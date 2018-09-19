import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Items } from '../models/items';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 items:any[]=[];
  constructor(public cartService: ShoppingCartService) {
    cartService.getCart().snapshotChanges().pipe(map((item) => {
      let cart:any={};
     cart =  {...item.payload.child('items').val()}
     this.items = (Object.values(cart));
     this.items =this.items.filter((elm,i) => {
       return (elm.quantity > 0);
     })
    }))   
    .subscribe();
  }
  

  ngOnInit() {
  }
  clear(){
    this.cartService.clearCart();
  }

}
