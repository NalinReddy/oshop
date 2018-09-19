import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  cartSubscription: Subscription;
 shipping={};
 shoppingCartItems;
 uid;
  constructor( 
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService, 
    private order: OrderService) { }

  ngOnInit() {
    this.cartSubscription=this.cartService.getCart().valueChanges().subscribe(v => this.shoppingCartItems= v);
    this.authSubscription=this.authService.user$.subscribe(u => this.uid=u.uid);
  }
 placeOrder(formVal: NgForm){
   this.shipping=formVal;
   let order = {
     userId:this.uid,
     date: new Date().getTime(),
     shipping:this.shipping,
     items: this.shoppingCartItems.items
   }
  let result= this.order.onPlaceOrder(order);
   this.cartService.clearCart();
   this.router.navigate(['/order-success',result.key])
 }
 ngOnDestroy(){
   this.authSubscription.unsubscribe();
   this.cartSubscription.unsubscribe();
 }

}
