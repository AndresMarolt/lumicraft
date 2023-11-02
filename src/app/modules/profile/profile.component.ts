import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: User;
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  constructor() {
    this.user = this.authService.getUser()!;
  }

  openModal() {
    const editUserModalRef = this.dialog.open(EditUserModalComponent, {
      autoFocus: false,
    });

    editUserModalRef.componentInstance.user = this.user;
    editUserModalRef.componentInstance.updateProfileData.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.user = this.authService.getUser()!;
  }
}
