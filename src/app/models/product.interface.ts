export interface Product {
  id?: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category: Category;
}

export type Category =
  | 'phone'
  | 'tablet'
  | 'computer'
  | 'smartwatch'
  | 'accessory';
