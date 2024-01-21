import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { User } from 'src/app/models/user.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Output() changeStep: EventEmitter<number> = new EventEmitter<number>();
  @Input() user!: User;
  @Input() userId!: number;
  @Input() deliveryMethod!: string;
  @Input() cart!: ShoppingCart;
  private shoppingCartService = inject(ShoppingCartService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  previousStep() {
    this.changeStep.emit(1);
  }

  createOrder() {
    this.shoppingCartService.generateOrder(this.userId).subscribe((res) => {
      this.snackbarService.showSnackbar(
        'Orden de compra generada exitosamente',
        SnackbarTone.Success
      );
      this.shoppingCartService.clearCart();
      this.router.navigate(['/']);
    });
  }
}
