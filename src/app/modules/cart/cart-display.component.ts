import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss'],
})
export class CartDisplayComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  public cartItems = this.shoppingCartService.cart();

  ngOnInit(): void {
    const { id: userId } = this.authService.decodeToken(
      this.authService.getToken()!
    )!;

    this.shoppingCartService.getCartProducts(userId);
  }
}
