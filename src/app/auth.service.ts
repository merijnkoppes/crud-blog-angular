import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    this.router.navigate(['']);
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  async saveUserData(user: firebase.User) {
    const newBlogDoc = {
      userId: user.uid,
      blogTitle: user.email,
    };
    const blogId = await this.firebaseService.addDocumentAndGetId(
      'blogs',
      newBlogDoc
    );
    const newUserDoc = {
      id: user.uid,
      email: user.email,
      role: 0,
      createdAt: new Date(),
      blogId: blogId,
    };
    return this.firebaseService.addDocument('users', newUserDoc);
  }
}
