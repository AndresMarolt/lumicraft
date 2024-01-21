import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

export enum DeliveryMethodEnum {
  DOMICILIO = 'DOMICILIO',
  TIENDA = 'TIENDA',
}
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
  public deliveryMethod = '';
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public cart = this.shoppingCartService.cart();
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor() {
    if (!this.cart.totalQuantity) {
      this.router.navigate(['/cart']);
    }
  }

  ngOnInit(): void {
    const { id } = this.authService.decodeToken(this.authService.getToken()!)!;
    this.userId = id;
  }

  changeStep(tabNumber: number) {
    this.enabledIndex = this.tabGroup.selectedIndex = tabNumber;
  }

  updateUserBillingData(user: User) {
    this.user = { id: this.userId, ...user };
  }

  setDeliveryMethod(method: string) {
    this.deliveryMethod = method;
  }
}
