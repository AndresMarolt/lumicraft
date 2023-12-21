import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { LoginRedirectModalComponent } from './login-redirect-modal/login-redirect-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public isShippingFree = false;
  public loading = true;
  public product!: Product;
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productService
        .getProductsBySlug(params['slug'])
        .subscribe((prod: Product) => {
          this.product = prod;
          if (
            prod.category === 'accessory' ||
            prod.category === 'phone' ||
            prod.category === 'smartwatch'
          ) {
            this.isShippingFree = true;
          } else if (
            prod.category === 'computer' ||
            prod.category === 'tablet'
          ) {
            this.isShippingFree = false;
          }

          this.loading = false;
        });
    });
  }

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      const { id: userId } = this.authService.decodeToken(
        this.authService.getToken()!
      )!;

      this.shoppingCartService.addProduct(userId, product).subscribe();

      this.snackbarService.showSnackbar(
        `${product.brand} ${product.model} agregado al carrito.`,
        SnackbarTone.Success
      );
    } else {
      this.dialog.open(LoginRedirectModalComponent, {
        height: 'auto',
      });
    }
  }
}
