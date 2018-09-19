import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";
import {switchMap} from "rxjs/operators";
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {
  id: string;
  appUser: AppUser;

  constructor(private auth:AuthService ,private userService: UserService) { }
  canActivate(){
 
  return this.auth.appUser$
 .pipe(map((appUser:AppUser) => appUser.isAdmin)
)

}

}