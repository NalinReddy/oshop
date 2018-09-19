import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  
  orders: any;
  constructor(private orderService: OrderService, authService: AuthService) {
    
    this.orderService.userOrders().subscribe((v:any) =>{
      this.orders = v.filter( i => authService.uid === i.userId)
    });

   }

  ngOnInit() {
  }

}
