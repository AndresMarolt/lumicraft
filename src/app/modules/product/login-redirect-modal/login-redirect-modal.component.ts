import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-redirect-modal',
  templateUrl: './login-redirect-modal.component.html',
  styleUrls: ['./login-redirect-modal.component.scss'],
})
export class LoginRedirectModalComponent {
  @Input() text: string = '';
  private dialogRef = inject(MatDialogRef<LoginRedirectModalComponent>);

  closeModal() {
    this.dialogRef.close();
  }
}
