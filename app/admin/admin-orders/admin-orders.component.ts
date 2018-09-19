import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  list: {}[];
  constructor(private orderService: OrderService) {
    this.orderService.ordersList().subscribe(list => this.list = list);
   }

  ngOnInit() {
  }

}
