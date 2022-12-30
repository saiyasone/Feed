import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  loading = false;
  user: any;
  constructor(private profileService: ProfileService) {
    this.initializeForm();
  }

  initializeForm() {
    this.loading = true;
    this.profileService.getPost().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
