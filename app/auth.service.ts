import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, empty, observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AdminAuthGaurdService } from './admin-auth-gaurd.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;
   user$ :Observable<firebase.User>;
   empty: Observable<{}>;

  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
  private router: Router,
private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('queryUrl', returnUrl); //or localStorage.setItem(any:string, value:string)
    const provider = new firebase.auth.GoogleAuthProvider();
   this.afAuth.auth.signInWithRedirect(provider);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$():Observable<{}> {
    return this.user$
    .pipe(switchMap((user:AppUser) => {
      if(user==null) return '0';
      this.uid = user.uid;
      if(user) return this.userService.get(user.uid);

      return this.user$
    })
    );
}
  
}
