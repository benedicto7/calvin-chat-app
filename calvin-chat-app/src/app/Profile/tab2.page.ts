import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface FirestoreChat {
  docId?: string; // auth
  name?: string; // auth
  color?: string; // auth
  image?: string; // auth
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    private popoverController: PopoverController,
    private afStorage: AngularFireStorage
  ) { }

  @ViewChild('profile-image') imageElement: string; //HTMLImageElement

  public name: string = "Ben";
  public new_name: string = this.name;

  private PHOTO_STORAGE: string = 'photos';

  // Closes the popover when user clicks button or enter
  async editName(action: boolean): Promise<void> {
    if (action === true) {
      this.name = this.new_name;
      await this.popoverController.dismiss();
    }
    else {
      await this.popoverController.dismiss();
    }
  }

  getImage = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      direction: CameraDirection.Front,
      source: CameraSource.Camera,
      // width: 100,
      // height: 100,
    });

    // await this.saveImage(image);

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.webPath;

    // Can be set to the src of an image now
    // this.imageElement.src = imageUrl!; // Confirms imageUrl will not be undefined
    this.imageElement = imageUrl!;

  };

  // Uploads the image to cloud storage
  private async saveImage(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const filename = new Date().getTime() + ".jpeg";
    const storageRef = this.afStorage.ref(filename);
    storageRef.put(blob);
  }
}

// TODO: set the name for the first time when user sign in
// TODO: use local storage to set the next next time