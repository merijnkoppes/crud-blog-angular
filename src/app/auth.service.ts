// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { FirebaseService } from './firebase.service';
// import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService
  ) {
    // Call the base class constructor and pass required parameters
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  saveUserData(user: firebase.User) {
    const testDoc = {
      name: user.uid,
      email: user.email,
      createdAt: new Date(),
    };
    return this.firebaseService.addDocument('users', testDoc);
    // return this.firebaseService.addDocumentWithId('users', user.uid, {
    //   uid: user.uid,
    //   email: user.email,
    //   createdAt: new Date(),
    // });
  }
}
