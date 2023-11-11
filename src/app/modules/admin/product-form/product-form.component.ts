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
import { Observable, catchError, forkJoin, of } from 'rxjs';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { BRANDS } from 'src/assets/brands';

interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  original_extension: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productCategories: { text: string; value: string | null }[] = [
    { text: 'Todas', value: null },
    { text: 'Móvil', value: 'phone' },
    { text: 'Ordenador', value: 'computer' },
    { text: 'Tablet', value: 'tablet' },
    { text: 'Smartwatch', value: 'smartwatch' },
    { text: 'Accesorio', value: 'accessory' },
  ];
  productForm!: FormGroup;
  brands = BRANDS;
  selectedFiles: File[] = [];
  @Input() product!: Product;
  @Output() closeEditModeEvent: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<ProductFormComponent>);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.productForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      price: [null, [Validators.required, this.nonNegativeValidator]],
      quantity: [null, [Validators.required, this.nonNegativeValidator]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(15)]],
      images: [[]],
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        model: this.product.model,
        brand: this.product.brand,
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
      if (this.selectedFiles.length) {
        this.fileUpload().subscribe((res: CloudinaryUploadResponse[]) => {
          const filesUrls = res.map((obj) => ({ image: obj.url }));
          this.submitProduct({ ...this.productForm.value, images: filesUrls });
        });
      } else {
        this.submitProduct({ ...this.productForm.value });
      }
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
        console.log(res);
        this.dialogRef.close();
        this.snackbarService.showSnackbar(
          `${
            this.product
              ? `Producto editado exitosamente.`
              : `${res?.brand} ${res?.model} creado exitosamente`
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

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.selectedFiles.push(files![0]);
    console.log(files);
  }

  fileUpload(): Observable<any> {
    const observables: Observable<any>[] = [];

    if (this.selectedFiles && this.selectedFiles.length) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'angular_cloudinary');
        data.append('cloud_name', 'dpq3kpgdy');

        const uploadObservable =
          this.productService.uploadCloudinaryImage(data);
        observables.push(uploadObservable);
      }
    }

    return forkJoin(observables);
  }

  get model() {
    return this.productForm.controls['model'];
  }
  get brand() {
    return this.productForm.controls['brand'];
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
