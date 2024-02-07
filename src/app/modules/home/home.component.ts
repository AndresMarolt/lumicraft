import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private productService = inject(ProductService);
  public prominentProducts: Product[] = [];
  public sizeRow: number = 1;
  public productsChunks: Product[][] = [];

  private subscriptions: Subscription[] = [];

  public quickInfoItems = [
    { text: 'Financiamiento flexible', icon: 'credit_score' },
    {
      text: 'Envío sin costo adicional',
      icon: 'local_shipping',
    },
    {
      text: 'Seguridad en tus compras en línea',
      icon: 'lock',
    },
    {
      text: 'Devoluciones sin complicaciones',
      icon: 'assignment_return',
    },
  ];

  public categories = [
    {
      title: 'Móviles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1704446016/lumicraft/nvypfsa1fw1i7cg1ns9b.webp',
      link: 'phone',
    },
    {
      title: 'Laptops',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707236619/lumicraft/uf2rbzmj5ufb88rqs87c.png',
      link: 'computer',
    },
    {
      title: 'Tablets',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1700248323/lumicraft/mgrnwwplktxr5e4govi4.jpg',
      link: 'tablet',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
  ];

  @HostListener('window:resize', ['$event'])
  detectScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth > 770 && screenWidth <= 996) {
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
          this.prominentProducts = res.content;
          for (
            let i = 0;
            i < this.prominentProducts.length;
            i += this.sizeRow
          ) {
            this.productsChunks.push(
              this.prominentProducts.slice(i, i + this.sizeRow)
            );
          }
        })
    );
  }

  aux() {
    console.log(this.productsChunks);
  }
}
