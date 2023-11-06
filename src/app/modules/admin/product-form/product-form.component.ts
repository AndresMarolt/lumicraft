import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { catchError, of } from 'rxjs';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  @Input() product!: Product;
  @Output() closeEditModeEvent: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<ProductFormComponent>);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.productForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      price: [null, [Validators.required, this.nonNegativeValidator]],
      quantity: [null, [Validators.required, this.nonNegativeValidator]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        title: this.product.title,
        price: this.product.price,
        quantity: this.product.quantity,
        category: this.product.category,
        description: this.product.description,
      });
    }
  }

  nonNegativeValidator(control: FormControl) {
    const value = control.value;
    if (value < 0) {
      return { nonNegative: true };
    }
    return null;
  }

  submit() {
    if (this.productForm.invalid) return;

    if (this.product) {
      this.submitProduct({
        ...this.productForm.value,
        id: this.product.id,
      });
      this.closeEditModeEvent.emit();
    } else {
      this.submitProduct({ ...this.productForm.value });
      this.dialogRef.close();
    }
  }

  submitProduct(product: Product) {
    this.productService[`${this.product ? 'editProduct' : 'addProduct'}`](
      product
    )
      .pipe(
        catchError((error) => {
          this.snackbarService.showSnackbar(
            `${
              this.product
                ? 'Error al intentar editar el producto.'
                : 'Error al intentar crear el producto'
            }`,
            SnackbarTone.Error
          );
          return of(null);
        })
      )
      .subscribe((res) => {
        this.snackbarService.showSnackbar(
          `${
            this.product
              ? `Producto editado exitosamente.`
              : `${res?.title} creado exitosamente`
          }`,
          SnackbarTone.Success
        );
      });
  }

  closeProductForm() {
    if (this.product) {
      this.closeEditModeEvent.emit();
    } else {
      this.dialogRef.close();
    }
  }

  get title() {
    return this.productForm.controls['title'];
  }
  get price() {
    return this.productForm.controls['price'];
  }
  get quantity() {
    return this.productForm.controls['quantity'];
  }
  get category() {
    return this.productForm.controls['category'];
  }
  get description() {
    return this.productForm.controls['description'];
  }
}
