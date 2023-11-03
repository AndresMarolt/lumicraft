import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quickInfoItems = [
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
}
