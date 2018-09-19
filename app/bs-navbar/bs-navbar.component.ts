import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Items } from '../models/items';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(private auth: AuthService,public cartService: ShoppingCartService) {
     auth.appUser$.subscribe((appUser:AppUser) => this.appUser = appUser);
   }

  ngOnInit() {
  }
 
  logout(){
    this.auth.logout();
  }
}
