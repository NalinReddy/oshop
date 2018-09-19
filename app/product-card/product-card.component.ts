import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Item } from '../models/item';
import { Items } from '../models/items';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product') product;
@Input('show-actions') showActions = true;
 shoppingCart:Items;

  constructor(private cartService: ShoppingCartService) { 
    cartService.getCart().valueChanges().subscribe((data:Items) => this.shoppingCart = data);
  }

  ngOnInit() {
  }
  addToCart(product: Product){
    this.cartService.addToCart(product);   
   }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = (this.shoppingCart.items[this.product.key]);
    return item ? item.quantity : 0;
  }

}
