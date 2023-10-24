import { Injectable } from '@angular/core';
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
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, tone: SnackbarTone) {
    this.snackbar.open(message, 'X', {
      duration: 3000,
      panelClass: `notification-${tone}`,
      data: { icon: 'check_circle' },
      horizontalPosition: 'end',
    });
  }
}
