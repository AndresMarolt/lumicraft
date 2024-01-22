import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { AdminComponent } from './modules';
import { AdminGuard } from './guards/admin.guard';
import { SessionGuard } from './guards/session.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./modules').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules').then((m) => m.ProfileModule),
    canActivate: [SessionGuard],
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
    canActivate: [SessionGuard],
  },
  {
    path: 'my-favorites',
    loadChildren: () => import('./modules').then((m) => m.FavoritesModule),
    canActivate: [SessionGuard],
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
