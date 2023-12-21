import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRedirectModalComponent } from './login-redirect-modal/login-redirect-modal.component';

@NgModule({
  declarations: [ProductComponent, LoginRedirectModalComponent],
  imports: [CommonModule, ProductRoutingModule, MaterialModule, SharedModule],
})
export class ProductModule {}
