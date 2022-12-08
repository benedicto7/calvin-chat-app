import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserInfo {
  email: string;
  imageUrl: string;
  name: string;
  uid: string;
  color?: string
}

@Injectable({
  providedIn: 'root'
})

/*
  This class gets called only when the user first creates
  their account. It will upload their user information into
  a firebase collection called users, with their uid as their
  unique key.
*/
export class DataService {
  constructor(
    private db: AngularFirestore
  ) { }

  saveUserInfo(name: string, email: string, uid: string) {
    const data: UserInfo = {
      email: email,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", // default image placeholder
      name: name,
      uid: uid,
      color: "" // color is default based on the user's phone theme
    }

    // Save the user information inside the users collection in firestore
    this.db.collection<UserInfo>("/users").doc(uid).set(data);
  }
}
