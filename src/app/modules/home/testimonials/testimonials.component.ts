import { Component } from '@angular/core';
import {
  faQuoteLeft,
  faQuoteRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  public faStar = faStar;
  public faQuoteLeft = faQuoteLeft;
  public faQuoteRight = faQuoteRight;
  public testimonials: {
    image: string;
    name: string;
    rating: number;
    text: string;
    date: Date;
  }[] = [
    {
      image:
        'https://this-person-does-not-exist.com/img/avatar-gen112404137a1267341df49e8d88b79294.jpg',
      name: 'María García',
      date: new Date(),
      rating: 5,
      text: '¡Increíble experiencia de compra en Lumicraft! Compré un nuevo portátil y el proceso fue muy fácil y rápido. El producto llegó en perfectas condiciones y es exactamente lo que esperaba. Definitivamente volveré a comprar aquí para mis necesidades tecnológicas.',
    },
    {
      image:
        'https://this-person-does-not-exist.com/img/avatar-gen11761759b8bbd88940667c64acf58b8e.jpg',
      name: 'Alejandro López',
      date: new Date(),
      rating: 5,
      text: '¡Una tienda excepcional con una amplia gama de productos tecnológicos! Compré un smartphone y estoy completamente satisfecho con mi compra. El envío fue rápido y el servicio al cliente fue excelente. Recomiendo esta tienda a todos los amantes de la tecnología.',
    },
    {
      image:
        'https://this-person-does-not-exist.com/img/avatar-gen113ba9f8265e19f44f819faf995cb987.jpg',
      name: 'Laura Martínez',
      date: new Date(),
      rating: 5,
      text: 'Compré una nueva tablet y estoy impresionada con su rendimiento. El proceso de compra fue súper simple y, además, el equipo de atención al cliente fue muy servicial y amable. Definitivamente volveré a comprar aquí en el futuro.',
    },
    {
      image:
        'https://this-person-does-not-exist.com/img/avatar-gen11af2316128be9231935b7d217622225.jpg',
      name: 'Javier Rodríguez',
      date: new Date(),
      rating: 5,
      text: 'Compré una cámara digital y estoy muy contento con mi compra. El precio era competitivo y el producto llegó en perfectas condiciones. Además, el seguimiento del envío fue muy útil para mantenerme informado sobre el estado de mi pedido. ¡Altamente recomendado!',
    },
  ];
}
