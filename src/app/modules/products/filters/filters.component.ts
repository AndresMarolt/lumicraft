import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { BRANDS } from 'src/assets/brands';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() currentCategory: string = '';
  @Output() emitFilteredProducts: EventEmitter<{
    products: Product[];
    totalElements: number;
  }> = new EventEmitter<{
    products: Product[];
    totalElements: number;
  }>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() brandFilters: string[] = [];
  @Input() minSelectedAmount: number = 0;
  @Input() maxSelectedAmount: number = 3000;
  brands = BRANDS;
  loading: boolean = false;
  pageIndex = 0;
  currentPage = 0;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private screenWidthService = inject(ScreenSizeService);
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.screenWidthService.screenWidth$.subscribe((width) => {
        if (width > 768) {
          this.route.queryParams.subscribe((queryParams) => {
            if (Object.keys(queryParams).length !== 0) {
              this.loading = true;
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
            this.emitFilteredProducts.emit({
              products: res.content,
              totalElements: res.totalElements,
            });
            this.loading = false;
          },
          error: (e) => {
            if (e.status === 404) {
              this.emitFilteredProducts.emit({
                products: [],
                totalElements: 0,
              });
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        })
    );
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

  private addURLParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: 'merge', // Para fusionar con los parámetros existentes
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
