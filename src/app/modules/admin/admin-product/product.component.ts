import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnDestroy, OnDestroy {
  isEditing = false;
  product!: Product;
  @Output() deleteProductEvent: EventEmitter<Product> =
    new EventEmitter<Product>();
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private thisDialogRef = inject(MatDialogRef<ProductComponent>);
  private subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      this.productService.selectedProduct$.subscribe((product) => {
        this.product = product;
      })
    );
  }

  deleteProduct(product: Product) {
    const action = () =>
      this.subscriptions.push(
        this.productService.deleteProduct(product.id!).subscribe(() => {
          this.deleteProductEvent.emit(product);
        })
      );
    const message = '¿Está seguro que desea eliminar este producto?';
    this.openConfirmationModal(message, action);
  }

  openConfirmationModal(message: string, action: () => void) {
    const confirmationModalRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      autoFocus: false,
    });
    confirmationModalRef.componentInstance.message = message;
    this.subscriptions.push(
      confirmationModalRef.componentInstance.action.subscribe(() => {
        action();
        this.thisDialogRef.close();
      })
    );
  }

  toggleEditMode(value: boolean) {
    this.isEditing = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
