import { Product } from './product.interface';

export interface PaginatedResponse {
  content: Product[]; // Lista de elementos en la página actual
  pageable: {
    pageNumber: number; // Número de la página actual
    pageSize: number; // Tamaño de la página
    offset: number; // Desplazamiento actual
    unpaged: boolean;
    paged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  totalPages: number; // Número total de páginas
  totalElements: number; // Número total de elementos en todas las páginas
  last: boolean; // Indica si es la última página
  first: boolean; // Indica si es la primera página
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number; // Número de elementos en la página actual
  size: number; // Tamaño de la página actual
  number: number; // Número de la página actual
  empty: boolean; // Indica si la página está vacía
}
