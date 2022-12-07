import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

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
  public color: string = "";

  // private PHOTO_STORAGE: string = 'photos';

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

    // Sets the imageElement src according to the user image
    this.imageElement = imageUrl!; // Confirms imageUrl will not be undefined

    /*     Preferences.set({
          key: this.PHOTO_STORAGE,
          value: JSON.stringify(this.imageElement),
        }); */
  };

  // Uploads the image to cloud storage
  private async saveImage(photo: Photo) {
    // Simple version: uploads image immediately to cloud storage
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const filename = new Date().getTime() + ".jpeg";
    const storageRef = this.afStorage.ref(filename);
    storageRef.put(blob);


    /*     // Convert photo to base64 format, required by Filesystem API to save
        const base64Data = await this.readAsBase64(photo);

        // Write the file to the data directory
        const fileName = new Date().getTime() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data
        });

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
          filepath: fileName,
          webviewPath: photo.webPath
        }; */
  }

  /*   private async readAsBase64(photo: Photo) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }

    private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    }); */
}

// TODO: save image to the user that is logged in instead
// TODO: set the name for the first time when user sign in as the one they input in sign up

// TODO: use local storage to skip log in