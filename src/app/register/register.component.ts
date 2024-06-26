// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password
      );
      if (userCredential.user) {
        await this.authService.saveUserData(userCredential.user);
      }
      // Handle successful registration
    } catch (error) {
      // Handle error
    }
  }
}
