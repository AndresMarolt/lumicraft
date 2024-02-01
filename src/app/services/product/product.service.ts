import { EventEmitter, Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, filter, tap } from 'rxjs';
import { Product } from '../../models/product.interface';
import { PaginatedResponse } from 'src/app/models/paged-products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  public products$ = this.products.asObservable();
  private selectedProduct: Subject<Product> = new Subject<Product>();
  public selectedProduct$ = this.selectedProduct.asObservable();

  getProducts(page: number, size: number): Observable<PaginatedResponse> {
    let url = `${environment.ApiURL}/api/products?page=${page}&size=${size}`;
    return this.httpClient.get<PaginatedResponse>(url).pipe(
      tap((res) => {
        const productsList = res.content.map((prod) => prod);
        this.products.next(productsList);
      })
    );
  }

  getFilteredProducts(
    page: number,
    size: number,
    category?: string,
    filters?: {
      minSelectedAmount?: number;
      maxSelectedAmount?: number;
      brands?: string[];
    }
  ): Observable<PaginatedResponse> {
    let url = `${environment.ApiURL}/api/products?page=${page}&size=${size}`;

    if (category) {
      url += `&category=${category}`;
    }

    if (filters) {
      if (filters.brands && filters.brands.length > 0) {
        url += `&brands=${filters.brands.join(',')}`;
      }

      if (
        filters.minSelectedAmount !== undefined &&
        filters.maxSelectedAmount !== undefined
      ) {
        url += `&minPrice=${filters.minSelectedAmount}&maxPrice=${filters.maxSelectedAmount}`;
      }
    }

    return this.httpClient.get<PaginatedResponse>(url).pipe(
      tap((res) => {
        const productsList = res.content.map((prod) => prod);
        this.products.next(productsList || []);
      })
    );
  }

  getProductsBySlug(slug: string): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.ApiURL}/api/product/${slug}`
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(`${environment.ApiURL}/api/add-product`, product)
      .pipe(
        tap((res) => {
          const existingProducts = this.products.getValue();
          existingProducts.push(res);
          this.products.next(existingProducts);
        })
      );
  }

  editProduct(product: Product): Observable<Product> {
    return this.httpClient
      .put<Product>(`${environment.ApiURL}/api/edit-product`, product)
      .pipe(
        tap((res) => {
          let existingProducts = this.products.getValue();
          const index = existingProducts.findIndex((p) => p.id === res.id);
          if (index >= 0) {
            existingProducts[index] = {
              ...res,
            };
            this.products.next(existingProducts);
            this.selectedProduct.next(res);
          }
        })
      );
  }

  deleteProduct(productId: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.ApiURL}/api/delete-product/${productId}`)
      .pipe(
        tap(() => {
          let existingProducts = this.products.getValue();
          const index = existingProducts.findIndex((p) => p.id === productId);
          existingProducts.splice(index, 1);
          this.products.next(existingProducts);
        })
      );
  }

  selectProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  uploadCloudinaryImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(
      'https://api.cloudinary.com/v1_1/dpq3kpgdy/image/upload?folder=lumicraft',
      formData
    );
  }

  deleteImage(imageId: number) {
    return this.httpClient.delete<void>(
      `${environment.ApiURL}/api/product-image/delete/${imageId}`
    );
  }
}
