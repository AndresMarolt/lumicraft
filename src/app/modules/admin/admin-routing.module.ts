import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
  {
    path: 'products',
    component: AdminProductsComponent,
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
