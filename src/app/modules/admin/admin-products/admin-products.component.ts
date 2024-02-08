import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PageEvent } from '@angular/material/paginator';
import { ProductComponent } from '../admin-product/product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public loading = true;
  productsList: Product[] = [];
  filteredProductsList: Product[] = [];
  displayedColumns: string[] = ['title', 'price', 'quantity', 'actions'];
  productCategories: { text: string; value: string | null }[] = [
    { text: 'Todas', value: 'todas' },
    { text: 'Móviles', value: 'phone' },
    { text: 'Portátiles', value: 'laptop' },
    { text: 'Tablets', value: 'tablet' },
    { text: 'Smartwatches', value: 'smartwatch' },
    { text: 'Accesorios', value: 'accessory' },
  ];
  closeResult!: string;
  currentPage: number = 0;
  pageIndex = 0;
  productListLength: number = 0;
  category = 'todas';
  httpResponseHasError: boolean = false;
  private subscriptions: Subscription[] = [];
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private errorService = inject(ErrorService);

  constructor() {
    this.subscriptions.push(
      this.productService.products$.subscribe((products) => {
        this.productsList = products;
        this.filteredProductsList = products;
      })
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe((queryParams) => {
        this.pageIndex = queryParams['page'] || 0;
        this.category = queryParams['category'] || 'todas';
        this.getProducts(this.pageIndex, this.category);
      })
    );
  }

  onCategoryChange(category: string) {
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    let newParams;
    if (category && category !== 'todas') {
      newParams = {
        ...currentParams,
        page: 0,
        category,
      };
      this.addURLParams(newParams);
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 0 },
      });
    }

    this.subscriptions.push(
      this.productService
        .getFilteredProducts(
          this.currentPage,
          10,
          category === 'todas' ? undefined : category
        )
        .subscribe((res) => {
          this.productListLength = res.totalElements;
        })
    );
  }

  getProducts(page: number, category: string | undefined) {
    this.subscriptions.push(
      this.productService
        .getFilteredProducts(
          page,
          10,
          category === 'todas' ? undefined : category
        )
        .subscribe({
          next: (res) => {
            this.productListLength = res.totalElements;
          },
          error: (e) => {
            if (e.status === 404) {
              this.httpResponseHasError = true;
              this.errorService.setError(true);
            }
            this.loading = false;
          },
          complete: () => {
            this.httpResponseHasError = false;
            this.loading = false;
          },
        })
    );
  }

  openFormModal(product: Product | undefined = undefined) {
    const modalRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      autoFocus: false,
      maxWidth: '100%',
    });

    if (product) {
      modalRef.componentInstance.product = product;
    }

    this.subscriptions.push(
      modalRef.componentInstance.addProductEvent.subscribe(() => {
        this.getProducts(0, this.category);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 0, category: this.category },
        });
      })
    );
  }

  openProductModal(product: Product) {
    const modalRef = this.dialog.open(ProductComponent, {
      width: '600px',
      autoFocus: false,
      maxWidth: '100%',
    });

    this.productService.selectProduct(product);
    this.subscriptions.push(
      modalRef.componentInstance.deleteProductEvent.subscribe(() => {
        this.filteredProductsList = this.productsList.filter(
          (prod) => prod.id !== product.id
        );

        this.snackbarService.showSnackbar(
          `${product.brand} ${product.model} eliminado exitosamente!`,
          SnackbarTone.Success
        );

        this.getProducts(1, this.category);

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 0, category: this.category },
        });
      })
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    const newParams = {
      ...currentParams,
      page: this.currentPage,
    };
    this.addURLParams(newParams);
    this.subscriptions.push(
      this.productService
        .getFilteredProducts(this.currentPage, 10, this.category)
        .subscribe((res) => {
          this.productListLength = res.totalElements;
        })
    );
  }

  search(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProductsList = this.productsList;
    }

    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((term) => term.trim() !== ''); // Dividir el término de búsqueda en palabras

    // Obtiene la última palabra en el término de búsqueda.
    const lastWord = searchTerms.pop() || '';

    this.filteredProductsList = this.productsList.filter((product) => {
      const brand = product.brand.toLowerCase();
      const model = product.model.toLowerCase();

      // Comprueba si todas las palabras, excepto la última, están presentes en brand o label.
      const matchAllWords = searchTerms.every(
        (word) => brand.includes(word) || model.includes(word)
      );

      // Comprueba si la última palabra parcial coincide con model o model.
      const partialMatchLastWord =
        brand.includes(lastWord) || model.includes(lastWord);

      return matchAllWords && partialMatchLastWord;
    });
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
