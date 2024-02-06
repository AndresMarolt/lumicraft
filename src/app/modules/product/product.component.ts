import {
  Component,
  OnInit,
  inject,
  Signal,
  computed,
  effect,
  WritableSignal,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { LoginRedirectModalComponent } from './login-redirect-modal/login-redirect-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public isShippingFree = false;
  public loading = true;
  public product!: Product;
  public httpResponseHasError: boolean = false;
  public screenWidth: number = 0;
  private userId!: number;
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);
  private snackbarService = inject(SnackbarService);
  private dialog = inject(MatDialog);
  private screenSizeService = inject(ScreenSizeService);
  private subscriptions: Subscription[] = [];
  public favorites: WritableSignal<Product[]> = this.favoriteService.favorites;
  public isFav: Signal<boolean> = computed(() => {
    return this.favorites().some((fav) => fav.id === this.product.id);
  });

  constructor() {
    effect(() => {});
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.screenSizeService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      })
    );

    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.productService.getProductsBySlug(params['slug']).subscribe({
          next: (prod: Product) => {
            this.product = prod;

            if (this.authService.isLoggedIn()) {
              this.userId = this.authService.decodeToken(
                this.authService.getToken()!
              )!.id;
              this.favoriteService.getFavorites(this.userId);
            }

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
          },
          error: (e) => {
            if (e.status === 404) {
              this.httpResponseHasError = true;
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
      })
    );
  }

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      const { id: userId } = this.authService.decodeToken(
        this.authService.getToken()!
      )!;

      this.subscriptions.push(
        this.shoppingCartService.addProduct(userId, product).subscribe()
      );

      this.snackbarService.showSnackbar(
        `${product.brand} ${product.model} agregado al carrito.`,
        SnackbarTone.Success
      );
    } else {
      const loginRedirectModalRef = this.dialog.open(
        LoginRedirectModalComponent,
        {
          height: 'auto',
        }
      );
      loginRedirectModalRef.componentInstance.text =
        'Para agregar un producto al carrito debes iniciar sesión.';
    }
  }

  addToFavs(product: Product) {
    if (this.authService.isLoggedIn()) {
      const { id: userId } = this.authService.decodeToken(
        this.authService.getToken()!
      )!;
      this.favoriteService.addToFavorites(userId, product.id!);
      this.snackbarService.showSnackbar(
        `${product.brand} ${product.model} agregado a favoritos.`,
        SnackbarTone.Success
      );
    } else {
      const loginRedirectModalRef = this.dialog.open(
        LoginRedirectModalComponent,
        {
          height: 'auto',
        }
      );
      loginRedirectModalRef.componentInstance.text =
        'Para agregar un producto a favoritos debes iniciar sesión.';
    }
  }

  removeItemFromFavorites(item: Product) {
    this.favoriteService.removeFromFavorites(this.userId, item.id!);
    this.snackbarService.showSnackbar(
      `${item.brand} ${item.model} retirado de favoritos.`,
      SnackbarTone.Success
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
