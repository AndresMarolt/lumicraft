import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent implements OnInit {
  public userId!: number;
  public user: User = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    address: null,
    city: null,
    country: null,
  };
  public enabledIndex = 0;
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  public cart = this.shoppingCartService.cart();
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  ngOnInit(): void {
    const { id } = this.authService.decodeToken(this.authService.getToken()!)!;
    this.userId = id;
  }

  nextStep(tabNumber: number) {
    this.enabledIndex = this.tabGroup.selectedIndex = tabNumber;
  }

  updateUserBillingData(user: User) {
    this.user = { id: this.userId, ...user };
  }
}
