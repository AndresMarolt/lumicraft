import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { AdminComponent } from './modules';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
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
    path: 'my-favorites',
    loadChildren: () => import('./modules').then((m) => m.FavoritesModule),
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
