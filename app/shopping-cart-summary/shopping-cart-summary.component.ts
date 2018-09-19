import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Items } from '../models/items';
import { Item } from '../models/item';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit , OnDestroy{

  
  items=[];
  cartSubscription: Subscription;
  constructor(public cartService: ShoppingCartService) {
    this.cartSubscription=this.cartService.getCart().valueChanges().subscribe((v:Items) =>{
     this.items=Object.values(v.items)
     this.items =this.items.filter((elm,i) => {
       return (elm.quantity > 0);
     })
    });
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
