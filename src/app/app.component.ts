import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentUser: firebase.User | null = null;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
