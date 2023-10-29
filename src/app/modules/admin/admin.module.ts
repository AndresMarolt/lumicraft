import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminComponent, ProductFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
  ],
})
export class AdminModule {}
