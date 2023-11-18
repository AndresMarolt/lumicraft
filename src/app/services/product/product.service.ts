import { EventEmitter, Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Product } from '../../models/product.interface';

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

  getAllProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${environment.ApiURL}/api/products`)
      .pipe(
        tap((res) => {
          this.products.next(res);
        })
      );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${environment.ApiURL}/api/products/${category}`)
      .pipe(
        tap((res) => {
          this.products.next(res);
        })
      );
  }

  getFilteredProducts(
    category: string,
    filters: {
      minSelectedAmount?: number;
      maxSelectedAmount?: number;
      brands?: string[];
    }
  ) {
    let url = `${environment.ApiURL}/api/products/filter?category=${category}`;

    if (filters.brands && filters.brands.length > 0) {
      url += `&brands=${filters.brands.join(',')}`;
    }

    if (
      filters.minSelectedAmount !== undefined &&
      filters.maxSelectedAmount !== undefined
    ) {
      url += `&minPrice=${filters.minSelectedAmount}&maxPrice=${filters.maxSelectedAmount}`;
    }

    return this.httpClient.get<Product[]>(url);
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
