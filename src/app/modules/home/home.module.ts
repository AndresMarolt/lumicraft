import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HomeComponent, HeroCarouselComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, FontAwesomeModule],
})
export class HomeModule {}
