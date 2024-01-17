import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfirmationComponent,
    LoadingSpinnerComponent,
    ProductsCarouselComponent,
    PaginatorComponent,
    NotFoundComponent,
    NoItemsComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    LoadingSpinnerComponent,
    ProductsCarouselComponent,
    PaginatorComponent,
    NotFoundComponent,
    NoItemsComponent,
  ],
})
export class SharedModule {}
