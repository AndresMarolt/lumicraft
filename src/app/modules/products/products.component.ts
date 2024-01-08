import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  productListLength: number = 0;
  brandFilters: string[] = [];
  brands = BRANDS;
  minSelectedAmount: number = 0;
  maxSelectedAmount: number = 3000;
  currentCategory!: string;
  loading = true;
  currentPage: number = 0;
  pageSize: number = 9;
  pageIndex = 0;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.productsList = products;
    });

    this.route.params.subscribe((params) => {
      this.loading = true;
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
      this.pageIndex = 0;
      this.currentPage = 0;
      this.brandFilters = [];

      this.getProductsByCategoryAndFilter();
    });

    this.route.queryParams.subscribe((queryParams) => {
      if (Object.keys(queryParams).length !== 0) {
        const minPriceFromUrl = queryParams['priceMin'] || 0;
        const maxPriceFromUrl = queryParams['priceMax'] || 3000;
        this.pageIndex = queryParams['page'] || 0;
        this.currentPage = queryParams['page'] || 0;

        this.minSelectedAmount = +minPriceFromUrl;
        this.maxSelectedAmount = +maxPriceFromUrl;

        const brandsFromUrl = queryParams['brands'];
        this.brandFilters = brandsFromUrl ? brandsFromUrl.split(',') : [];
        this.getProductsByCategoryAndFilter();
      }
    });
  }

  getProductsByCategoryAndFilter() {
    let filters = {
      minSelectedAmount: this.minSelectedAmount || 0,
      maxSelectedAmount: this.maxSelectedAmount || 3000,
      brands: this.brandFilters || undefined,
    };
    this.productService
      .getFilteredProducts(
        this.currentPage,
        9,
        this.currentCategory || undefined,
        filters
      )
      .subscribe((res) => {
        this.productListLength = res.totalElements;
        this.loading = false;
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
      page: 0,
      brands: this.brandFilters.length ? this.brandFilters.join(',') : null,
    };

    this.addURLParams(newParams);
  }

  onSliderChange() {
    const currentParams = this.router.routerState.snapshot.root.queryParams;

    const newParams = {
      ...currentParams,
      priceMin: this.minSelectedAmount,
      priceMax: this.maxSelectedAmount,
    };

    this.addURLParams(newParams);
  }

  onPageChange(event: PageEvent): void {
    const currentParams = this.router.routerState.snapshot.root.queryParams;

    this.currentPage = event.pageIndex;

    const newParams = {
      ...currentParams,
      page: this.currentPage,
    };
    this.addURLParams(newParams);
  }

  private addURLParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: 'merge', // Para fusionar con los parámetros existentes
    });
  }
}
