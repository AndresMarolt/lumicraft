import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  private authService = inject(AuthService);

  constructor() {
    this.user = this.authService.getUser()!;
  }
}
