import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { BRANDS } from 'src/assets/brands';
import { FiltersComponent } from './filters/filters.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsList: Product[] = [];
  productListLength: number = 0;
  brandFilters: string[] = [];
  brands = BRANDS;
  minSelectedAmount: number = 0;
  maxSelectedAmount: number = 3000;
  currentCategory!: string;
  loading = false;
  currentPage: number = 0;
  pageSize: number = 9;
  pageIndex = 0;
  screenWidth!: number;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private screenSizeService = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.screenSizeService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      })
    );

    this.subscriptions.push(
      this.productService.products$.subscribe((products) => {
        this.productsList = products;
      })
    );

    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.currentCategory = params['category'];
        this.minSelectedAmount = 0;
        this.maxSelectedAmount = 3000;
        this.pageIndex = 0;
        this.currentPage = 0;
        this.brandFilters = [];
        this.getProductsByCategoryAndFilter();
      })
    );

    this.subscriptions.push(
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

          if (this.screenWidth < 768) {
            this.getProductsByCategoryAndFilter();
          }
        } else {
          this.getProductsByCategoryAndFilter();
        }
      })
    );
  }

  getProductsByCategoryAndFilter() {
    let filters = {
      minSelectedAmount: this.minSelectedAmount || 0,
      maxSelectedAmount: this.maxSelectedAmount || 3000,
      brands: this.brandFilters || undefined,
    };
    this.subscriptions.push(
      this.productService
        .getFilteredProducts(this.currentPage, 9, this.currentCategory, filters)
        .subscribe({
          next: (res) => {
            this.productsList = res.content;
            this.productListLength = res.totalElements;
            this.loading = false;
          },
          error: (e) => {
            if (e.status === 404) {
              this.productsList = [];
              this.productListLength = 0;
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        })
    );
  }

  updateProductsList(event: { products: Product[]; totalElements: number }) {
    this.productsList = event.products;
    this.productListLength = event.totalElements;
    this.loading = false;
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

    this.getProductsByCategoryAndFilter();
  }

  toggleFiltersModal() {
    const filtersModal = this.dialog.open(FiltersComponent, {
      autoFocus: false,
      width: '100%',
    });

    filtersModal.componentInstance.currentCategory = this.currentCategory;
    filtersModal.componentInstance.brandFilters = this.brandFilters;
    filtersModal.componentInstance.minSelectedAmount = this.minSelectedAmount;
    filtersModal.componentInstance.maxSelectedAmount = this.maxSelectedAmount;

    this.subscriptions.push(
      filtersModal.componentInstance.closeModal.subscribe(() => {
        filtersModal.close();
      })
    );
  }

  private addURLParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
