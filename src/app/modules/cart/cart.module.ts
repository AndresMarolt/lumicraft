import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDisplayComponent } from './cart-display.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CartDisplayComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CartDisplayComponent],
})
export class CartModule {}
