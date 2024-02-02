import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Order } from 'src/app/models/order.interface';
import { UserOrdersModalComponent } from './user-orders-modal/user-orders-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: User;
  private authService = inject(AuthService);
  private shoppingCartService = inject(ShoppingCartService);
  private dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];
  public orders: Order[] = [];

  ngOnInit(): void {
    this.user = this.authService.getUser()!;
    this.authService.decodeToken(this.authService.getToken()!);
    this.subscriptions.push(
      this.shoppingCartService
        .getUserOrders(
          this.authService.decodeToken(this.authService.getToken()!)?.id!
        )
        .subscribe((res) => {
          this.orders = res;
        })
    );
  }

  openUserModal() {
    const editUserModalRef = this.dialog.open(EditUserModalComponent, {
      autoFocus: false,
    });

    editUserModalRef.componentInstance.user = this.user;
    this.subscriptions.push(
      editUserModalRef.componentInstance.updateProfileData.subscribe(() => {
        this.getUser();
      })
    );
  }

  openOrderModal(order: Order) {
    const orderModalRef = this.dialog.open(UserOrdersModalComponent);

    orderModalRef.componentInstance.order = order;
  }

  getUser() {
    this.user = this.authService.getUser()!;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
