import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  public categories = [
    {
      title: 'Móviles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1704446016/lumicraft/nvypfsa1fw1i7cg1ns9b.webp',
      link: 'phone',
    },
    {
      title: 'Portátiles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707236619/lumicraft/uf2rbzmj5ufb88rqs87c.png',
      link: 'laptop',
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
      title: 'Videojuegos',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Ordenadores',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Televisores',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
    {
      title: 'Auriculares',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
  ];
}
