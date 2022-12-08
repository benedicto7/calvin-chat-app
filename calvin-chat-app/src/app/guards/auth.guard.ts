import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => { // user: firebase.User
        if (user) {
          console.log('User is logged in!!');
          console.log(`User UID: ${user.uid}`);

          resolve(true);
        } else {
          console.log('User is not logged in -- putting them back on the login page');

          this.router.navigateByUrl('login');

          resolve(false);
        }
      });
    });
  }
}
