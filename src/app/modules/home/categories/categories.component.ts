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
      title: 'Tablets',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1700248323/lumicraft/mgrnwwplktxr5e4govi4.jpg',
      link: 'tablet',
    },
    {
      title: 'Portátiles',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707236619/lumicraft/uf2rbzmj5ufb88rqs87c.png',
      link: 'laptop',
    },
    {
      title: 'Ordenadores',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707392327/Lumicraft/oie_17bJ8LQNXm4l_gfran8.png',
      link: 'computer',
    },
    {
      title: 'Televisores',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707389870/lumicraft/wbsmq2m3qgmxctwe4rgl.png',
      link: 'tv',
    },
    {
      title: 'Videojuegos',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707391131/lumicraft/nogbiovgpnt8otxjujhk.png',
      link: 'videogame',
    },
    {
      title: 'Auriculares',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707389426/lumicraft/ss0zfmzdligag4gjk4em.png',
      link: 'headphones',
    },
    {
      title: 'Smartwatches',
      img: 'https://res.cloudinary.com/dpq3kpgdy/image/upload/v1707241157/lumicraft/kvxd3aooawcgwager5vb.webp',
      link: 'smartwatch',
    },
  ];
}
