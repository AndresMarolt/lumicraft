import { Component, OnInit, inject } from '@angular/core';
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
      this.productsList = products;
    });
    this.route.params.subscribe((params) => {
      switch (params['category']) {
        case 'phones':
          this.currentCategory = 'phone';
          return;
        case 'computers':
          this.currentCategory = 'computer';
          return;
        case 'smartwatches':
          this.currentCategory = 'smartwatch';
          return;
        case 'tablets':
          this.currentCategory = 'tablet';
          return;
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProductsByCategory(this.currentCategory).subscribe();
  }

  filterByBrand(brand: string) {}

  onSliderChange() {
    console.log('MIN: ', this.minSelectedAmount);
    console.log('MAX: ', this.maxSelectedAmount);
  }
}
