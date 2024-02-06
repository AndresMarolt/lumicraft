import { Component } from '@angular/core';
import {
  faUpRightAndDownLeftFromCenter,
  faMemory,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss'],
})
export class HeroCarouselComponent {
  public faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  public faMemory = faMemory;
  public faCamera = faCamera;
}
