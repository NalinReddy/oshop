import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-quantity',
  templateUrl: './shopping-quantity.component.html',
  styleUrls: ['./shopping-quantity.component.css']
})
export class ShoppingQuantityComponent implements OnInit {
  @Input('product') product;
  shoppingCart;

  constructor(private cartService: ShoppingCartService) {
    cartService.getCart().valueChanges().subscribe(data => this.shoppingCart = data);
   }

  ngOnInit() {
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);   
   }
   removeFromCart(product: Product){
     this.cartService.removeQuantity(product);
   }
   getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = (this.shoppingCart.items[this.product.key]);
    return item ? item.quantity : 0;
  }
   
}
