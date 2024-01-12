import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductComponent } from './admin-product/product.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductFormComponent,
    AdminProductsComponent,
    ProductComponent,
    SearchBarComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgbModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
  ],
})
export class AdminModule {}
