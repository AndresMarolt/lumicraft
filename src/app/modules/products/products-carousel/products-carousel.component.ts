import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  carouselId!: string;
  @Input() productImages: { id?: number; image: string }[] = [];

  ngOnInit() {
    this.carouselId = this.productImages[0].image;
  }
}
