import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    alert("user logged out");

    this.router.navigateByUrl('login');
    return firebase.auth().signOut();
  }

  getCurrentUser(): string | null {
    return firebase.auth().currentUser!.email; // confirms that currentUser is not null
  }
}
