import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    LoadingSpinnerComponent,
    ProductsCarouselComponent,
    PaginatorComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    LoadingSpinnerComponent,
    ProductsCarouselComponent,
    PaginatorComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}
