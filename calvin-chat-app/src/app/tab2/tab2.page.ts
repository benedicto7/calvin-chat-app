import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// TODO: Set color

interface User {
  name: string;
  imageUrl: string;
  color: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  constructor(
    private popoverController: PopoverController,
    private auth: AuthService,
    private image: ImageService,
    private db: AngularFirestore,
  ) {
    // TODO: doesn't update
    // Get the current user name, default imageUrl, and color from their uid in firestore
    const userUid = this.auth.getCurrentUserUid();
    console.log(userUid);

    this.db.doc<User>(`/users/${userUid}`).valueChanges().subscribe((result) => {
      if (result) {
        this.name = result.name;
        this.imageUrl = result.imageUrl;
        this.color = result.color;

        console.log(`User name: ${this.name}`);
        console.log(`User default imageUrl: ${this.imageUrl}`);
        console.log(`User default color: ${this.color}`);
      }
    })
  }

  @ViewChild('profile-image') imageUrl: string; // or HTMLImageElement if it's this.imageElement.src

  public name: string = "";
  public new_name: string = this.name;
  public color: string = "";

  // Closes the popover when user clicks button or enter
  async editName(action: boolean): Promise<void> {
    if (action === true) {
      this.name = this.new_name;

      // TODO: Update the user name in firestore

      await this.popoverController.dismiss();
    }
    else {
      await this.popoverController.dismiss();
    }

    // this.name = (action === true) ? this.new_name : this.name;
    // await this.popoverController.dismiss();
  }

  // Let the user logout from the application
  logout(): void {
    this.auth.logoutUser();
  }

  // Allows the user to change their image
  changeImage = async () => {
    // Upload the user image to firestore and cloud storage
    const imageURL = await this.image.changeImage();

    // TODO: Update the user image in firestore

    // Sets the src image using the imageUrl from firestore
    this.imageUrl = imageURL;
  }
}