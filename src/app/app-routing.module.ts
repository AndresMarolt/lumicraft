import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
