import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    LoadingSpinnerComponent,
    ProductsCarouselComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [LoadingSpinnerComponent, ProductsCarouselComponent],
})
export class SharedModule {}
