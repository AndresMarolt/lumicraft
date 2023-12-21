import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import {
  ShoppingCart,
  ShoppingCartProduct,
} from 'src/app/models/shopping-cart';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private authService = inject(AuthService);
  private shoppingCartService = inject(ShoppingCartService);
  public cart = this.shoppingCartService.cart();
  public userId!: number;

  ngOnInit(): void {
    const { id } = this.authService.decodeToken(this.authService.getToken()!)!;
    this.userId = id;
  }

  substractItem(item: ShoppingCartProduct) {
    if (item.quantity > 1) {
      this.shoppingCartService
        .substractOneItem(this.userId, item.product)
        .subscribe();
    }
  }

  addItem(item: ShoppingCartProduct) {
    if (item.quantity < item.product.quantity) {
      this.shoppingCartService
        .addProduct(this.userId, item.product)
        .subscribe();
    }
  }

  removeItemFromCart(item: ShoppingCartProduct) {
    this.shoppingCartService
      .removeProduct(this.userId, item.product)
      .subscribe();
  }
}