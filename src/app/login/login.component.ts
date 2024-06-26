// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      // Handle successful login
    } catch (error) {
      // Handle error
    }
  }
}
