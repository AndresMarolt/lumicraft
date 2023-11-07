import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  customerSupportOptions = [
    { text: 'Gestionar cuenta', link: '#' },
    { text: 'Centro de ayuda', link: '#' },
    { text: 'Entregas', link: '#' },
    { text: 'Devoluciones', link: '#' },
  ];

  aboutOptions = [
    { text: 'Nuestra historia', link: '#' },
    { text: 'Términos de uso', link: '#' },
    { text: 'Política de privacidad', link: '#' },
    { text: 'Tratamiento de datos personales', link: '#' },
  ];

  servicesOptions = [
    { text: 'Instalación en tu hogar', link: '#' },
    { text: 'Tarjeta Lumicraft', link: '#' },
    { text: 'Black Friday', link: '#' },
  ];
}
