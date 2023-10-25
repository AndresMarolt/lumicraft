import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  editProductEvent: EventEmitter<Product> = new EventEmitter<Product>();
  addProductEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.ApiURL}/api/products`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${environment.ApiURL}/api/add-product`,
      product
    );
  }

  editProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${environment.ApiURL}/api/edit-product`,
      product
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.ApiURL}/api/delete-product/${productId}`
    );
  }
}
