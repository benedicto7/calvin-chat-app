import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private dataSvc: DataService,
  ) { }

  // Check if the user's typed email and password is already registered
  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Create a new account for user
  signupUser(name: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = result.user!.uid; // Confirms user is not null

        // Save new user information into firestore
        this.dataSvc.saveUserInfo(name, email, uid);

        resolve(result);
      }
      catch (error) {
        reject(error);
      }

    })
  }

  // Send an email to the valid email that is typed
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Change the state of the user to be logged out and re-route to the login page
  async logoutUser(): Promise<void> {
    this.router.navigateByUrl('login');

    const toast = await this.toastCtrl.create({
      message: `Account has been logout.`,
      duration: 1000,
    });

    await toast.present();

    return firebase.auth().signOut();
  }

  // Return current user email
  getCurrentUser(): string {
    return firebase.auth().currentUser!.email!; // confirms that the currentUser is not null and that the email is not null
  }

  // Return current user uid
  getCurrentUserUid(): string {
    return firebase.auth().currentUser!.uid;
  }
}
