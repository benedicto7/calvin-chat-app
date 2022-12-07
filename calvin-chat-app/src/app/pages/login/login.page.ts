import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  name: string;
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
    private loadingCtrl: LoadingController,
    private authSvc: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    // private storage: Storage,
  ) { }

  ngOnInit() {
    // await this.storage.create();
    // this.user.userName = (await this.storage.get('userName')) || '';
    // this.user.email = (await this.storage.get('email')) || '';
    // this.user.password = (await this.storage.get('password')) || '';
  }

  public loading: HTMLIonLoadingElement;

  public user: User = {
    name: '',
    email: '',
    password: '',
  };

  nameCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  async onSubmit() {
    this.loading = await this.loadingCtrl.create({
      message: "Logging in...",
      cssClass: 'loading-popup',
    });

    await this.loading.present();

    try {
      await this.authSvc.loginUser(this.user.email, this.user.password);

      this.saveUserInfo();
      this.loading.dismiss();

      // Go to the tabs page
      this.router.navigateByUrl('/tabs');
    }
    catch (error) {
      this.loading.dismiss();

      const alert = await this.alertCtrl.create({
        message: error as string,
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }],
      });
      alert.present();
    }
  }

  async createAccount(): Promise<void> {
    try {
      await this.authSvc.signupUser(this.user.email, this.user.password);

      this.saveUserInfo();

      const toast = await this.toastCtrl.create({
        message: `Account has been created.`,
        duration: 1000,
      });

      await toast.present();

      // Go to the tabs page
      this.router.navigateByUrl('tabs');
    }
    catch (error) {
      const alert = await this.alertCtrl.create({
        message: error as string,
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }],
      });
      alert.present();
    }
  }

  async resetPassword(): Promise<void> {
    if (!this.user.email) {
      const toast = await this.toastCtrl.create({
        message: `No email has been typed.`,
        duration: 1000,
      });

      await toast.present();

      return;
    }
    else {
      this.authSvc.resetPassword(this.user.email);

      const toast = await this.toastCtrl.create({
        message: `An email has been sent to ${this.user.email} to reset your password.`,
        duration: 1000,
      });

      await toast.present();
    }
  }

  // Saves the user info when they log in or create a new account.
  // So they do not have to log in back.
  private saveUserInfo() {
    // this.storage.set('userName', this.user.userName);
    // this.storage.set('email', this.user.email);
    // this.storage.set('password', this.user.password);
  }

  public reset: boolean = true;

  changeResetButton(): void {
    this.reset = false;
  }
}

// TODO: log out