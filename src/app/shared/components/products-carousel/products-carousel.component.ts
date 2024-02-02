import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  carouselId!: string;
  @Input() productImages: { id?: number; image: string }[] = [];
  @Input() imageWidth = '300px';
  @Input() imageHeight = '250px';
  @Input() hasFullWidth: boolean = false;
  @Input() showSmallImagesBelow = false;

  ngOnInit() {
    this.carouselId = this.productImages[0].image;
  }
}
