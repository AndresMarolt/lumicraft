import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { Observable, tap } from 'rxjs';
import {
  ShoppingCart,
  ShoppingCartProduct,
} from 'src/app/models/shopping-cart';
import { environment } from 'src/environments/environment.development';
import { Order } from 'src/app/models/order.interface';

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
        currentCart.totalAmount = 0;
        currentCart.allProducts = [];
        currentCart.totalQuantity = 0;
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

    return this.httpClient.post<any>(url, {});
  }

  substractOneItem(userId: number, product: Product) {
    this.cart.mutate((currentCart) => {
      currentCart.allProducts.map((prod, index) => {
        if (prod.product === product) {
          currentCart.allProducts[index].quantity--;
          currentCart.totalAmount -=
            currentCart.allProducts[index].product.price;
          currentCart.totalQuantity--;
        }
      });
    });
    const url = `${environment.ApiURL}/api/cart/${userId}/substract-item/${product.id}`;
    return this.httpClient.delete<void>(url);
  }

  removeProduct(userId: number, product: Product) {
    this.cart.mutate((currentCart) => {
      const itemIndex = currentCart.allProducts.findIndex(
        (p) => p.product.id === product.id
      );
      if (itemIndex !== -1) {
        const removedItem = currentCart.allProducts[itemIndex];
        currentCart.totalAmount -=
          removedItem.product.price * removedItem.quantity;
        currentCart.totalQuantity -= removedItem.quantity;
        currentCart.allProducts.splice(itemIndex, 1);
      }
    });

    const url = `${environment.ApiURL}/api/cart/${userId}/delete-item/${product.id}`;
    return this.httpClient.delete<void>(url);
  }

  clearCart() {
    this.cart.mutate((currentCart) => {
      currentCart.allProducts = [];
      currentCart.totalAmount = 0;
      currentCart.totalQuantity = 0;
    });
  }

  getUserOrders(userId: number): Observable<Order[]> {
    const url = `${environment.ApiURL}/api/order/user/${userId}`;
    return this.httpClient.get<Order[]>(url);
  }

  getAllOrders(): Observable<Order[]> {
    const url = `${environment.ApiURL}/api/order/all`;
    return this.httpClient.get<Order[]>(url);
  }

  generateOrder(userId: number): Observable<Order> {
    const url = `${environment.ApiURL}/api/order/create`;
    return this.httpClient.post<Order>(url, userId);
  }
}
