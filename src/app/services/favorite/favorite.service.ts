import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  OnDestroy,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService implements OnDestroy {
  public favorites: WritableSignal<Product[]> = signal<Product[]>([]);
  private httpClient = inject(HttpClient);
  private subscriptions: Subscription[] = [];
  constructor() {}

  getFavorites(userId: number) {
    const url = `${environment.ApiURL}/api/favorites/${userId}`;
    this.subscriptions.push(
      this.httpClient.get<Product[]>(url).subscribe((res: Product[]) => {
        this.favorites.set(res);
      })
    );
  }

  addToFavorites(userId: number, productId: number) {
    const url = `${environment.ApiURL}/api/favorites`;
    this.subscriptions.push(
      this.httpClient
        .post<Product>(url, { userId, productId })
        .subscribe((res) => {
          this.favorites.update((currentFavs) => {
            return [...currentFavs, res];
          });
        })
    );
  }

  removeFromFavorites(userId: number, productId: number) {
    const url = `${environment.ApiURL}/api/favorites/${userId}/delete/${productId}`;
    this.subscriptions.push(
      this.httpClient.delete<void>(url).subscribe((res) => {
        this.favorites.update((currentFavs) => {
          currentFavs = currentFavs.filter((fav) => fav.id !== productId);
          return currentFavs;
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
