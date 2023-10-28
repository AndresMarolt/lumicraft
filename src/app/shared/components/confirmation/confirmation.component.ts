import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Input() message!: string;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  private dialogRef = inject(MatDialogRef<ConfirmationComponent>);

  confirmAction() {
    this.action.emit();
    this.dialogRef.close();
  }
}
