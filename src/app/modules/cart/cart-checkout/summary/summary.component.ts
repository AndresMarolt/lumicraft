import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class SummaryComponent implements OnDestroy {
  @Output() changeStep: EventEmitter<number> = new EventEmitter<number>();
  @Input() user!: User;
  @Input() userId!: number;
  @Input() deliveryMethod!: string;
  @Input() cart!: ShoppingCart;
  private shoppingCartService = inject(ShoppingCartService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  private subscriptions: Subscription[] = [];

  previousStep() {
    this.changeStep.emit(1);
  }

  createOrder() {
    this.subscriptions.push(
      this.shoppingCartService.generateOrder(this.userId).subscribe((res) => {
        this.snackbarService.showSnackbar(
          'Orden de compra generada exitosamente',
          SnackbarTone.Success
        );
        this.shoppingCartService.clearCart();
        this.router.navigate(['/']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
