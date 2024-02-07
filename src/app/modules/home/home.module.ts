import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { MainProductsComponent } from './main-products/main-products.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

@NgModule({
  declarations: [HomeComponent, HeroCarouselComponent, CategoriesComponent, MainProductsComponent, TestimonialsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class HomeModule {}
