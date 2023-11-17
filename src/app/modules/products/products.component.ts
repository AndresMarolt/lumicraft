import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { BRANDS } from 'src/assets/brands';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList: Product[] = [];
  brands = BRANDS;
  brand: any = undefined;
  minSelectedAmount: number = 0;
  maxSelectedAmount: number = 2000;
  sliderRelease = false;
  currentCategory!: string;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.productService.products$.subscribe((products) => {
      console.log(products);

      this.productsList = products;
    });
    this.route.params.subscribe((params) => {
      console.log(params);

      switch (params['category']) {
        case 'phones':
          this.currentCategory = 'phone';
          break;
        case 'computers':
          this.currentCategory = 'computer';
          break;
        case 'smartwatches':
          this.currentCategory = 'smartwatch';
          break;
        case 'tablets':
          this.currentCategory = 'tablet';
          break;
      }

      this.getProductsByCategory(this.currentCategory);
    });
  }

  ngOnInit(): void {
    this.getProductsByCategory(this.currentCategory);
  }

  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe();
  }

  filterByBrand(brand: string) {}

  onSliderChange() {
    console.log('MIN: ', this.minSelectedAmount);
    console.log('MAX: ', this.maxSelectedAmount);
  }
}
