import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import {
  SnackbarService,
  SnackbarTone,
} from 'src/app/services/snackbar/snackbar.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PageEvent } from '@angular/material/paginator';
import { ProductComponent } from '../admin-product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  productsList: Product[] = [];
  filteredProductsList: Product[] = [];
  displayedColumns: string[] = ['title', 'price', 'quantity', 'actions'];
  productCategories: { text: string; value: string | null }[] = [
    { text: 'Todas', value: 'todas' },
    { text: 'Móviles', value: 'phone' },
    { text: 'Ordenadores', value: 'computer' },
    { text: 'Tablets', value: 'tablet' },
    { text: 'Smartwatches', value: 'smartwatch' },
    { text: 'Accesorios', value: 'accessory' },
  ];
  closeResult!: string;
  currentPage: number = 0;
  pageSize: number = 10;
  pageIndex = 0;
  category = 'todas';
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.productService.products$.subscribe((products) => {
      this.productsList = products;
      this.filteredProductsList = products;
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  onCategoryChange(category: string) {
    if (category === 'todas') {
      this.getAllProducts();
    } else {
      this.filterByCategory(category);
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe();
  }

  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe();
  }

  filterByCategory(category: string) {
    this.productsList = this.productsList.filter(
      (prod) => prod.category === category
    );
  }

  openFormModal(product: Product | undefined = undefined) {
    const modalRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      autoFocus: false,
    });

    if (product) {
      modalRef.componentInstance.product = product;
    }
  }

  openProductModal(product: Product) {
    const modalRef = this.dialog.open(ProductComponent, {
      width: '600px',
      autoFocus: false,
    });

    this.productService.selectProduct(product);
    modalRef.componentInstance.deleteProductEvent.subscribe(() => {
      this.productsList = this.productsList.filter(
        (prod) => prod.id !== product.id
      );

      this.snackbarService.showSnackbar(
        `${product.brand} ${product.model} eliminado exitosamente!`,
        SnackbarTone.Success
      );
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  search(searchTerm: string) {
    // ACA SE RECIBE LO INGRESADO EN LA BARRA DE BÙSQUEDA DEL SEARCH BAR COMPONENT
    if (!searchTerm) {
      this.productsList = this.filteredProductsList;
    }

    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((term) => term.trim() !== ''); // Dividir el término de búsqueda en palabras

    // Obtiene la última palabra en el término de búsqueda.
    const lastWord = searchTerms.pop() || '';

    this.productsList = this.filteredProductsList.filter((product) => {
      const brand = product.brand.toLowerCase();
      const model = product.model.toLowerCase();

      // Comprueba si todas las palabras, excepto la última, están presentes en brand o label.
      const matchAllWords = searchTerms.every(
        (word) => brand.includes(word) || model.includes(word)
      );

      // Comprueba si la última palabra parcial coincide con model o model.
      const partialMatchLastWord =
        brand.includes(lastWord) || model.includes(lastWord);

      return matchAllWords && partialMatchLastWord;
    });
  }

  get pagedProductsList(): Product[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productsList.slice(startIndex, endIndex);
  }
}
