import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public isShippingFree = false;
  public loading = true;
  public product!: Product;
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productService
        .getProductsBySlug(params['slug'])
        .subscribe((prod: Product) => {
          this.product = prod;
          if (
            prod.category === 'accessory' ||
            prod.category === 'phone' ||
            prod.category === 'smartwatch'
          ) {
            this.isShippingFree = true;
          } else if (
            prod.category === 'computer' ||
            prod.category === 'tablet'
          ) {
            this.isShippingFree = false;
          }

          this.loading = false;
        });
    });
  }
}
