import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Order } from 'src/app/models/order.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  private authService = inject(AuthService);
  private shoppingCartService = inject(ShoppingCartService);
  private dialog = inject(MatDialog);
  public orders: Order[] = [];

  ngOnInit(): void {
    this.user = this.authService.getUser()!;
    this.authService.decodeToken(this.authService.getToken()!);
    this.shoppingCartService
      .getOrders(
        this.authService.decodeToken(this.authService.getToken()!)?.id!
      )
      .subscribe((res) => {
        console.log(res);
        this.orders = res;
      });
  }

  openModal() {
    const editUserModalRef = this.dialog.open(EditUserModalComponent, {
      autoFocus: false,
    });

    editUserModalRef.componentInstance.user = this.user;
    editUserModalRef.componentInstance.updateProfileData.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.user = this.authService.getUser()!;
  }
}
