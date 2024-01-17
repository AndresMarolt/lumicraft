import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);
  public favorites = this.favoriteService.favorites;
  private userId!: number;

  ngOnInit(): void {
    this.userId = this.authService.decodeToken(
      this.authService.getToken()!
    )!.id;
    this.favoriteService.getFavorites(this.userId);
  }

  removeItemFromFavorites(item: Product) {
    this.favoriteService.removeFromFavorites(this.userId, item.id!);
  }
}
