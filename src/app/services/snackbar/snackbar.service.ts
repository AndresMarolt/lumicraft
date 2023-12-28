import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnackbarTone {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  showSnackbar(message: string, tone: SnackbarTone) {
    const icon = tone === 'success' ? '✔️' : '❌';
    this.snackbar.open(message, icon, {
      duration: 3000,
      panelClass: `notification-${tone}`,
      data: { icon: 'check_circle' },
      horizontalPosition: 'end',
    });
  }
}
