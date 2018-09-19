import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private auth: AuthService, private router: Router, private userService: UserService){
   auth.user$.subscribe(user => {
     if(user){
       userService.save(user);
       let returnUrl = localStorage.getItem('queryUrl');
       if(returnUrl){
         localStorage.removeItem('queryUrl')
        router.navigateByUrl(returnUrl);
       } else return;
     }
   })
 }
}