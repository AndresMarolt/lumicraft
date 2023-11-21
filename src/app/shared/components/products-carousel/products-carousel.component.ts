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
  @Input() showSmallImagesBelow = false;

  ngOnInit() {
    this.carouselId = this.productImages[0].image;
  }

  // selectImage(index: number): void {
  // Cambiar la imagen activa en el carousel
  // Puedes usar la propiedad ngbCarousel para acceder al carousel
  // Asegúrate de importar NgbCarousel y NgbSlide en tu componente
  // y de tener configurado correctamente NgbModule en tu módulo.
  // if (this.showSmallImagesBelow) {
  // this.carousel.select(index);
  // }
  // }
}
