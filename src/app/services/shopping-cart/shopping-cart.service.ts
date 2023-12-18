import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { tap } from 'rxjs';
import {
  ShoppingCart,
  ShoppingCartProduct,
} from 'src/app/models/shopping-cart';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  public cart = signal<ShoppingCart>({
    allProducts: [],
    totalAmount: 0,
    totalQuantity: 0,
  });
  private httpClient = inject(HttpClient);

  constructor() {}

  getCartProducts(userId: number) {
    const url = `${environment.ApiURL}/api/cart/${userId}`;
    this.httpClient.get<ShoppingCartProduct[]>(url).subscribe((res) => {
      this.cart.mutate((currentCart) => {
        res.map((cartItem) => {
          currentCart.totalAmount += cartItem.quantity * cartItem.product.price;
          currentCart.allProducts.push(cartItem);
          currentCart.totalQuantity += cartItem.quantity;
        });
      });
    });
  }

  addProduct(userId: number, product: Product) {
    this.cart.mutate((currentCart) => {
      const existingItem = currentCart.allProducts.find(
        (p) => p.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity < product.quantity) {
          existingItem.quantity++;
          currentCart.totalAmount += existingItem.product.price;
          currentCart.totalQuantity++;
        }
      } else {
        const newCartItem: ShoppingCartProduct = {
          product: product,
          quantity: 1,
        };
        currentCart.allProducts.push(newCartItem);
        currentCart.totalAmount += product.price;
        currentCart.totalQuantity++;
      }
    });

    const url = `${environment.ApiURL}/api/cart/${userId}/add?productId=${product.id}&quantity=1`;

    return this.httpClient.post<any>(url, {}).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  removeProduct(productId: number) {
    this.cart.mutate((currentCart) => {
      const itemIndex = currentCart.allProducts.findIndex(
        (p) => p.product.id === productId
      );
      if (itemIndex !== -1) {
        const removedItem = currentCart.allProducts[itemIndex];
        currentCart.totalAmount -=
          removedItem.product.price * removedItem.quantity;
        currentCart.allProducts.splice(itemIndex, 1);
      }
    });
  }
}
