import { Component, inject, OnInit } from '@angular/core';
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
  public isUserLoggedIn = false;

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();

    this.authService.user$.subscribe((user) => {
      this.isUserLoggedIn = this.authService.isLoggedIn();

      if (this.isUserLoggedIn) {
        const { id: userId } = this.authService.decodeToken(
          this.authService.getToken()!
        )!;

        this.shoppingCartService.getCartProducts(userId);
      }
    });
  }
}
