import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/models/order.interface';

@Component({
  selector: 'app-user-orders-modal',
  templateUrl: './user-orders-modal.component.html',
  styleUrls: ['./user-orders-modal.component.scss'],
})
export class UserOrdersModalComponent {
  private dialog = inject(MatDialogRef);
  @Input()
  order!: Order;
}
