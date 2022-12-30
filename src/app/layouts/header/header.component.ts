import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated = false;
  constructor(private authService: AuthService) {
    authService.isAuthenticate$.subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }

  signOut() {
    this.authService.signOut();
  }
}
