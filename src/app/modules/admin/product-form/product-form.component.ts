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
import { CloudinaryUploadResponse } from 'src/app/models/cloudinary-response.interface';

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
  loading = false;
  productForm!: FormGroup;
  brands = BRANDS;
  selectedFiles: File[] = [];
  imagesToDelete: { id?: number; image: string }[] = [];
  @Input() product!: Product;
  @Output() closeEditModeEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addProductEvent: EventEmitter<void> = new EventEmitter<void>();
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
        images: this.product.images,
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

  submit(event: Event) {
    event.preventDefault();
    if (this.productForm.invalid) return;

    this.loading = true;

    const isEditing = !!this.product;
    const hasSelectedFiles = this.selectedFiles.length > 0;

    const handleEdition = () => {
      if (hasSelectedFiles) {
        // EL PRODUCTO EDITADO TIENE IMAGEN/ES
        this.fileUpload().subscribe((res: CloudinaryUploadResponse[]) => {
          const filesUrls = res.map((obj) => ({
            image: obj.url,
            publicId: obj.public_id,
          }));
          const existingImagesUrls = this.productForm
            .get('images')!
            .value.map((obj: any) => ({
              image: obj.image,
              publicId: obj.publicId,
            }));

          this.submitProduct({
            ...this.productForm.value,
            id: this.product.id,
            images: [...filesUrls, ...existingImagesUrls],
          });
        });
      } else {
        // EL PRODUCTO EDITADO NO TIENE IMAGENES
        this.submitProduct({
          ...this.productForm.value,
          id: this.product.id,
        });
      }
    };

    const handleCreation = () => {
      // MODO DE CREACION DE PRODUCTO
      if (hasSelectedFiles) {
        // EL NUEVO PRODUCTO TIENE IMAGEN/ES
        this.fileUpload().subscribe((res: CloudinaryUploadResponse[]) => {
          const filesUrls = res.map((obj) => ({
            image: obj.url,
            publicId: obj.public_id,
          }));
          this.submitProduct({ ...this.productForm.value, images: filesUrls });
        });
      } else {
        // EL NUEVO PRODUCTO NO TIENE IMAGEN/ES
        this.submitProduct({ ...this.productForm.value });
      }

      this.addProductEvent.emit();
    };

    if (isEditing) {
      handleEdition();
    } else {
      handleCreation();
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
        this.loading = false;
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

  handleDeleteImage(
    event: Event,
    productImage: { id?: number; image: string }
  ) {
    event.preventDefault();

    const nonDeletedImages = this.images.value.filter(
      (img: { id: number; image: string }) => img.id !== productImage.id
    );
    this.productForm.patchValue({
      images: nonDeletedImages,
    });

    const imageInDeleteListIndex = this.imagesToDelete.findIndex(
      (img) => img.id === productImage.id
    );

    if (imageInDeleteListIndex === -1) {
      this.imagesToDelete.push(productImage);
    } else {
      this.imagesToDelete.splice(imageInDeleteListIndex, 1);
    }
  }

  isImageInImagesToDeleteList(productImage: {
    id?: number;
    image: string;
  }): boolean {
    return this.imagesToDelete.some((img) => img.id === productImage.id);
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

  get images() {
    return this.productForm.controls['images'];
  }
}
