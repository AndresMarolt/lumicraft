import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { BillingComponent } from './cart-checkout/billing/billing.component';
import { DeliveryComponent } from './cart-checkout/delivery/delivery.component';
import { SummaryComponent } from './cart-checkout/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CartDisplayComponent,
    CartComponent,
    CartCheckoutComponent,
    BillingComponent,
    DeliveryComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    SharedModule,
    MaterialModule,
    FontAwesomeModule,
  ],
  exports: [CartDisplayComponent],
})
export class CartModule {}
