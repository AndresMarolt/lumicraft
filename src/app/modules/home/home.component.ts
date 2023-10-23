import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from './product-form/product-form.component';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'quantity', 'actions'];
  productsList: Product[] = [];
  form: boolean = false;
  closeResult!: string;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.productService.addProductEvent.subscribe((newProduct: Product) => {
      this.productsList = [...this.productsList, newProduct];
    });

    this.productService.editProductEvent.subscribe((editedProduct: Product) => {
      const index = this.productsList.findIndex(
        (p) => p.id_product === editedProduct.id_product
      );
      if (index) {
        this.productsList[index] = editedProduct;
        console.log(this.productsList);

        this.productsList = [...this.productsList];
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productsList = res;
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id_product!).subscribe(() => {
      this.productsList = this.productsList.filter(
        (prod) => prod.id_product !== product.id_product
      );

      this.snackbarService.showSnackbar(
        `${product.title} eliminado exitosamente!`,
        SnackbarTone.Success
      );
    });
  }

  openModal(product: Product | undefined = undefined) {
    const modalRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      autoFocus: false,
    });

    if (product) {
      modalRef.componentInstance.product = product;
    }
  }
}
