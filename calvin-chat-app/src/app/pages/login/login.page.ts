import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    // private loadingCtrl: LoadingController,
    // private authSvc: AuthService,
    // private router: Router,
    // private alertCtrl: AlertController,
    // private toastCtrl: ToastController,
    // private storage: Storage,
  ) { }

  public loading: HTMLIonLoadingElement;

  public user: User = {
    userName: '',
    email: '',
    password: '',
  };

  ngOnInit() {
  }

  // async onSubmit() {
  //   this.loading = await this.loadingCtrl.create();
  //   await this.loading.present();
  //   try {
  //     await this.authSvc.loginUser(this.user.email,
  //       this.user.password);
  //     this.loading.dismiss();
  //     this.router.navigateByUrl('home');
  //   }
  //   catch (error) {
  //     this.loading.dismiss();
  //     const alert = await this.alertCtrl.create({
  //       // message: error,
  //       buttons: [{
  //         text: 'Ok',
  //         role: 'cancel'
  //       }],
  //     });
  //     alert.present();
  //   }
  // }

  // resetPassword(): void {
  //   if (!this.user.email) {
  //     return; // put up an alert or something.
  //   }
  //   this.authSvc.resetPassword(this.user.email);
  // }

  // async createAccount(): Promise<void> {
  //   try {
  //     await this.authSvc.signupUser(this.user.email,
  //       this.user.password);
  //     this.router.navigateByUrl('home');
  //   } catch (error) {
  //     const alert = await this.alertCtrl.create({
  //       // message: error,
  //       buttons: [{
  //         text: 'Ok',
  //         role: 'cancel'
  //       }],
  //     });
  //     alert.present();
  //   }
  // }

}
