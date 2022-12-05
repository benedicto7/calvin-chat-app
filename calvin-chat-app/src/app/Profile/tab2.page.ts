import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

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
  constructor(private popoverController: PopoverController) { }

  public name: string = "Ben";
  public new_name: string = this.name;

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
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };
}

