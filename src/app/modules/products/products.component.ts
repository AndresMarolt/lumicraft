import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  brandFilters: string[] = [];
  brands = BRANDS;
  brand: any = undefined;
  minSelectedAmount: number = 0;
  maxSelectedAmount: number = 3000;
  sliderRelease = false;
  currentCategory!: string;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.productService.products$.subscribe((products) => {
      this.productsList = products;
    });
    this.route.params.subscribe((params) => {
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

      this.minSelectedAmount = 0;
      this.maxSelectedAmount = 3000;
      this.brandFilters = [];

      this.getProductsByCategoryAndFilter();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const minPriceFromUrl = queryParams['priceMin'] || 0;
      const maxPriceFromUrl = queryParams['priceMax'] || 3000;

      this.minSelectedAmount = +minPriceFromUrl;
      this.maxSelectedAmount = +maxPriceFromUrl;

      const brandsFromUrl = queryParams['brands'];
      this.brandFilters = brandsFromUrl ? brandsFromUrl.split(',') : [];

      this.getProductsByCategoryAndFilter();
    });
  }

  getProductsByCategoryAndFilter() {
    let filters = {
      minSelectedAmount: this.minSelectedAmount,
      maxSelectedAmount: this.maxSelectedAmount,
      brands: this.brandFilters,
    };

    this.productService
      .getFilteredProducts(this.currentCategory, filters)
      .subscribe((res) => {
        this.productsList = res;
      });
  }

  filterByBrand(brand: string) {
    const index = this.brandFilters.indexOf(brand);
    const currentParams = this.router.routerState.snapshot.root.queryParams;

    if (index === -1) {
      this.brandFilters.push(brand);
    } else {
      this.brandFilters.splice(index, 1);
    }

    let newParams = {
      ...currentParams,
      brands: this.brandFilters,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: 'merge', // Para fusionar con los parámetros existentes
    });

    this.productService
      .getFilteredProducts(this.currentCategory, {
        minSelectedAmount: this.minSelectedAmount,
        maxSelectedAmount: this.maxSelectedAmount,
        brands: this.brandFilters,
      })
      .subscribe((res) => {
        this.productsList = res;
      });
  }

  onSliderChange() {
    const currentParams = this.router.routerState.snapshot.root.queryParams;

    const newParams = {
      ...currentParams,
      priceMin: this.minSelectedAmount,
      priceMax: this.maxSelectedAmount,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: 'merge', // Para fusionar con los parámetros existentes
    });

    this.getProductsByCategoryAndFilter();
  }
}
