import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartDisplayComponent, CartComponent],
  imports: [CommonModule, CartRoutingModule, MaterialModule],
  exports: [CartDisplayComponent],
})
export class CartModule {}
