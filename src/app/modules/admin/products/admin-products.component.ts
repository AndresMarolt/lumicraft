import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  displayedColumns: string[] = ['title', 'price', 'quantity', 'actions'];
  productsList: Product[] = [];
  form: boolean = false;
  closeResult!: string;
  currentPage: number = 0;
  pageSize: number = 10;
  pageIndex = 0;

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.productService.addProductEvent.subscribe((newProduct: Product) => {
      this.productsList = [...this.productsList, newProduct];
    });

    this.productService.editProductEvent.subscribe((editedProduct: Product) => {
      const index = this.productsList.findIndex(
        (p) => p.id === editedProduct.id
      );
      if (index >= 0) {
        this.productsList[index] = {
          ...editedProduct,
        };

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
    const action = () =>
      this.productService.deleteProduct(product.id!).subscribe(() => {
        this.productsList = this.productsList.filter(
          (prod) => prod.id !== product.id
        );

        this.snackbarService.showSnackbar(
          `${product.title} eliminado exitosamente!`,
          SnackbarTone.Success
        );
      });
    const message = '¿Está seguro que desea eliminar este producto?';
    this.openConfirmationModal(message, action);
  }

  openConfirmationModal(message: string, action: () => void) {
    const confirmationModalRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      autoFocus: false,
    });
    confirmationModalRef.componentInstance.message = message;
    confirmationModalRef.componentInstance.action.subscribe(() => {
      action();
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

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get pagedProductsList(): Product[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productsList.slice(startIndex, endIndex);
  }
}
