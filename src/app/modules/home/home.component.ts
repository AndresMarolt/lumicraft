import { Component, HostListener, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import {
  faStar,
  faQuoteLeft,
  faQuoteRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faXTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faQuora,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  [x: string]: any;
  private productService = inject(ProductService);
  public prominentProducts: Product[] = [];
  public sizeRow: number = 1;
  public productsChunks: Product[][] = [];
  public testimonials: {
    image: string;
    name: string;
    rating: number;
    text: string;
    date: Date;
  }[] = [];
  public faStar = faStar;
  public faQuoteLeft = faQuoteLeft;
  public faQuoteRight = faQuoteRight;

  public faFacebook = faFacebook;
  public faInstagram = faInstagram;
  public faLinkedin = faLinkedin;
  public faYoutube = faYoutube;
  public faQuora = faQuora;
  public faPinterest = faPinterest;

  private subscriptions: Subscription[] = [];

  public quickInfoItems = [
    { text: 'Financiamiento flexible', icon: 'credit_score' },
    {
      text: 'Envío sin costo adicional',
      icon: 'local_shipping',
    },
    {
      text: 'Seguridad en tus compras en línea',
      icon: 'lock',
    },
    {
      text: 'Devoluciones sin complicaciones',
      icon: 'assignment_return',
    },
  ];

  public categories = [
    {
      title: 'Móviles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1704446016/lumicraft/nvypfsa1fw1i7cg1ns9b.webp',
      link: 'phone',
    },
    {
      title: 'Portátiles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707236619/lumicraft/uf2rbzmj5ufb88rqs87c.png',
      link: 'computer',
    },
    {
      title: 'Tablets',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1700248323/lumicraft/mgrnwwplktxr5e4govi4.jpg',
      link: 'tablet',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
  ];

  public socialMedia: { icon: IconDefinition; link: string }[] = [
    { icon: faFacebook, link: 'www.facebook.com' },
    { icon: faInstagram, link: 'www.instagram.com' },
    { icon: faXTwitter, link: 'www.x.com' },
    { icon: faLinkedin, link: 'www.linkedin.com' },
    { icon: faYoutube, link: 'www.youtube.com' },
    { icon: faPinterest, link: 'www.pinterest.com' },
  ];

  @HostListener('window:resize', ['$event'])
  detectScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768 && screenWidth < 1024) {
      this.sizeRow = 2;
    } else {
      this.sizeRow = 3;
    }

    if (screenWidth <= 770) {
      this.sizeRow = 1;
    }
  }
  constructor() {
    this.detectScreenSize();

    this.subscriptions.push(
      this.productService
        .getFilteredProducts(0, 6, undefined, {
          minSelectedAmount: 600,
          maxSelectedAmount: 3000,
          brands: ['apple', 'samsung', 'xiaomi'],
        })
        .subscribe((res) => {
          this.prominentProducts = res.content;
          for (
            let i = 0;
            i < this.prominentProducts.length;
            i += this.sizeRow
          ) {
            this.productsChunks.push(
              this.prominentProducts.slice(i, i + this.sizeRow)
            );
          }
        })
    );

    this.testimonials = [
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

    // this.testimonials.forEach((testimonial) => {
    //   this.get.rating);
    // });
  }

  // getStarsArray(rating: number): number[] {
  //   const integerPart = Math.floor(rating);
  //   const decimalPart = rating - integerPart;

  //   const starsArray = Array(integerPart).fill(1); // Fill array with 1 for full stars
  //   if (decimalPart > 0) {
  //     starsArray.push(2); // Add 2 for half star
  //   }
  //   console.log(starsArray);

  //   return starsArray;
  // }
}
