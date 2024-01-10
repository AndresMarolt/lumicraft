import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules').then((m) => m.AdminModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules').then((m) => m.ProfileModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./modules').then((m) => m.ProductsModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./modules').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules').then((m) => m.CartModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules').then((m) => m.HomeModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
