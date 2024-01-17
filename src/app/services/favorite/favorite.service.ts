import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorites: WritableSignal<Product[]> = signal<Product[]>([]);
  private httpClient = inject(HttpClient);
  constructor() {}

  getFavorites(userId: number) {
    const url = `${environment.ApiURL}/api/favorites/${userId}`;
    this.httpClient.get<Product[]>(url).subscribe((res: Product[]) => {
      this.favorites.set(res);
    });
  }

  addToFavorites(userId: number, productId: number) {
    const url = `${environment.ApiURL}/api/favorites`;
    this.httpClient
      .post<Product>(url, { userId, productId })
      .subscribe((res) => {
        this.favorites.update((currentFavs) => {
          return [...currentFavs, res];
        });
      });
  }

  removeFromFavorites(userId: number, productId: number) {
    const url = `${environment.ApiURL}/api/favorites/${userId}/delete/${productId}`;
    this.httpClient.delete<void>(url).subscribe((res) => {
      this.favorites.update((currentFavs) => {
        currentFavs = currentFavs.filter((fav) => fav.id !== productId);
        return currentFavs;
      });
    });
  }
}
