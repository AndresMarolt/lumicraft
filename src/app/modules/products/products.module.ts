import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [ProductsComponent, FiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
