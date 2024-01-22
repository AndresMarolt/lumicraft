import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { SessionGuard } from 'src/app/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CartCheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
