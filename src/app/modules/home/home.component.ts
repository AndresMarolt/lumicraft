import { Component } from '@angular/core';
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
  public faFacebook = faFacebook;
  public faInstagram = faInstagram;
  public faLinkedin = faLinkedin;
  public faYoutube = faYoutube;
  public faQuora = faQuora;
  public faPinterest = faPinterest;

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

  public socialMedia: { icon: IconDefinition; link: string }[] = [
    { icon: faFacebook, link: 'www.facebook.com' },
    { icon: faInstagram, link: 'www.instagram.com' },
    { icon: faXTwitter, link: 'www.x.com' },
    { icon: faLinkedin, link: 'www.linkedin.com' },
    { icon: faYoutube, link: 'www.youtube.com' },
    { icon: faPinterest, link: 'www.pinterest.com' },
  ];
}
