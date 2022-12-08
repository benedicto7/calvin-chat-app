import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app'
import { IonContent } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


// TODO: Set color

interface Chat {
  timestamp: firebase.firestore.Timestamp; // chat
  message: string; // chat
  name: string; // auth
  imageUrl: string; // auth
  color?: string; // auth
  docId?: string; // auth
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  // Initial homepage
  constructor(private db: AngularFirestore) {
    // Get all the documents inside the general collection to display the correct chat section
    const collectionDatabase = this.db.collection<Chat>("/general", (ref) => ref.orderBy('timestamp'));
    collectionDatabase.valueChanges().subscribe((result) => { // valueChanges({idField: 'docId'})
      if (result) {
        // Stores all the chat results in an array to be displayed
        this.chats = result;
      }
    })

    // Automatically scrolls to the bottom of the page
    // this.scrollToBottom();
  }

  // To scroll to the bottom
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;

  // Home tab
  public chats: Chat[] = [];
  public course: string = "general";

  // Users variable
  public name: string = "";
  public message: string = "";
  public color: string = "";
  public imageUrl: string = "";

  public message_placeholder: string = "Message #GENERAL";

  // Button state
  public general_button: string = "solid";
  public cs108_button: string = "outline";
  public cs112_button: string = "outline";
  public cs212_button: string = "outline";
  public cs262_button: string = "outline";
  public cs214_button: string = "outline";
  public cs232_button: string = "outline";
  public cs336_button: string = "outline";

  // Icon state
  public general_icon: boolean = true;
  public cs108_icon: boolean = false;
  public cs112_icon: boolean = false;
  public cs212_icon: boolean = false;
  public cs262_icon: boolean = false;
  public cs214_icon: boolean = false;
  public cs232_icon: boolean = false;
  public cs336_icon: boolean = false;

  ngOnInit() {
    this.scrollToBottom();
  }

  // TODO: Scroll the chat to the bottom
  scrollToBottom() {
    setTimeout(() => {
      this.myContent.scrollToBottom(300);
    }, 1000);
  }

  // Select which course is displayed according to chat collection
  selectCourse() {
    // Get all the documents inside the selected collection to display the correct chat section
    const collectionDatabase = this.db.collection<Chat>(`/${this.course}`, (ref) => ref.orderBy('timestamp'));
    collectionDatabase.valueChanges().subscribe((result) => { // {idField: 'docId'}
      if (result) {
        // Stores all the chat results in an array to be displayed
        this.chats = result;
      }
    })
  }

  // Create a new chat message
  async createChat(): Promise<void> {
    // When user has at least typed a character
    if (this.message.length > 0) {
      // Data object
      const data: Chat = {
        timestamp: Timestamp.now(),
        name: this.name,
        message: this.message,
        imageUrl: this.imageUrl,
        color: this.color,
      };

      // Add data object into the selected collection with a unique key document
      await this.db.collection<Chat>(this.course).add(data);

      // Resets the message display
      this.message = "";
    }
  }

  // TODO: Delete the chat message
  async deleteChat(): Promise<void> {
    await this.db.doc('/cs336-chat').delete();
  }

  setCourse(course: string): void {
    // General course
    if (course === "general") {
      this.course = "general";
      this.message_placeholder = "Message #GENERAL";

      this.general_button = "solid";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = true;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS108 course
    else if (course === "cs108") {
      this.course = "cs108";
      this.message_placeholder = "Message #CS108";

      this.general_button = "outline";
      this.cs108_button = "solid";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = true;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS112 course
    else if (course === "cs112") {
      this.course = "cs112";
      this.message_placeholder = "Message #CS112";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "solid";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = true;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS212 course
    else if (course === "cs212") {
      this.course = "cs212";
      this.message_placeholder = "Message #CS212";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "solid";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = true;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS262 course
    else if (course === "cs262") {
      this.course = "cs262";
      this.message_placeholder = "Message #CS262";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "solid";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = true;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS214 course
    else if (course === "cs214") {
      this.course = "cs214";
      this.message_placeholder = "Message #CS214";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "solid";
      this.cs232_button = "outline";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = true;
      this.cs232_icon = false;
      this.cs336_icon = false;
    }
    // CS232 course
    else if (course === "cs232") {
      this.course = "cs232";
      this.message_placeholder = "Message #CS232";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "solid";
      this.cs336_button = "outline";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = true;
      this.cs336_icon = false;
    }
    // CS336 course
    else if (course === "cs336") {
      this.course = "cs336";
      this.message_placeholder = "Message #CS336";

      this.general_button = "outline";
      this.cs108_button = "outline";
      this.cs112_button = "outline";
      this.cs212_button = "outline";
      this.cs262_button = "outline";
      this.cs214_button = "outline";
      this.cs232_button = "outline";
      this.cs336_button = "solid";

      this.general_icon = false;
      this.cs108_icon = false;
      this.cs112_icon = false;
      this.cs212_icon = false;
      this.cs262_icon = false;
      this.cs214_icon = false;
      this.cs232_icon = false;
      this.cs336_icon = true;
    }

    // Select which course to be displayed
    this.selectCourse();
  }
}