import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';

@NgModule({
  declarations: [ProductsComponent, ProductsCarouselComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ProductsRoutingModule],
})
export class ProductsModule {}
