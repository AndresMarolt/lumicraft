import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss'],
})
export class MainProductsComponent implements OnDestroy {
  private productService = inject(ProductService);
  public mainProducts: Product[] = [];
  public sizeRow: number = 1;
  public productsChunks: Product[][] = [];
  private subscriptions: Subscription[] = [];

  @HostListener('window:resize', ['$event'])
  detectScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768 && screenWidth < 1024) {
      this.sizeRow = 2;
    } else {
      this.sizeRow = 3;
    }

    if (screenWidth <= 770) {
      this.sizeRow = 1;
    }
  }

  constructor() {
    this.detectScreenSize();

    this.subscriptions.push(
      this.productService
        .getFilteredProducts(0, 6, undefined, {
          minSelectedAmount: 600,
          maxSelectedAmount: 3000,
          brands: ['apple', 'samsung', 'xiaomi'],
        })
        .subscribe((res) => {
          this.mainProducts = res.content;
          for (let i = 0; i < this.mainProducts.length; i += this.sizeRow) {
            this.productsChunks.push(
              this.mainProducts.slice(i, i + this.sizeRow)
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
