import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from './auth.service';

interface User {
  name: string;
  imageUrl: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  constructor(
    private afStorage: AngularFireStorage,
    private auth: AuthService,
    private db: AngularFirestore,
  ) { }

  // Changes the user image
  changeImage = async () => {

    // Opens the camera to take a picture or choose an existing image
    // when user clicks their images
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      direction: CameraDirection.Front,
      source: CameraSource.Camera,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // const imageUrl = image.webPath;
    // return imageUrl!; // Confirms imageUrl will not be undefined

    // Save user image to cloud storage, so that the current user image can be replaced with the new one
    const imageUrl = await this.saveImage(image);

    return imageUrl!; // Confirms imageUrl will not be undefined
  };

  // Save the user image to cloud storage, to use the URL as a src link
  private async saveImage(photo: Photo) {
    const response = await fetch(photo.webPath!);

    const blob = await response.blob();

    // Saves the file name as the time now
    const filename = new Date().getTime() + ".jpeg";

    // Puts the image into cloud storage
    const storageRef = this.afStorage.ref(filename);

    await storageRef.put(blob);

    // Update the user image only in firestore
    storageRef.getDownloadURL().subscribe(url => {
      // Logs the image url
      console.log(`ImageUrl: ${url}`);

      const userUid = this.auth.getCurrentUserUid();
      this.db.doc<User>(`/users/${userUid}`).update({
        imageUrl: url,
      });

      return url;
    });
  }
}
