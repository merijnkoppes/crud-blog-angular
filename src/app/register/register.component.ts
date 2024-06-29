// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  newDoc: any;
  currentUser: any;
  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Current User:', this.currentUser);
    });
  }

  async register() {
    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password
      );
      if (userCredential.user) {
        await this.authService.saveUserData(userCredential.user);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return;
    }
    this.router.navigate(['/dashboard']);
  }

  // async addStaticTestData() {
  //   try {
  //     const testDoc = {
  //       name: 'Static Test User',
  //       email: 'testuser@example.com',
  //       createdAt: new Date(),
  //     };
  //     console.log('Static test document:', testDoc);
  //     await this.firebaseService.addDocument('testCollection', testDoc);
  //     console.log('Static test document added successfully.');
  //   } catch (error) {
  //     console.error('Error adding static test document:', error);
  //   }
  // }
}
