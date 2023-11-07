export interface Product {
  id?: number;
  model: string;
  brand: string;
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
