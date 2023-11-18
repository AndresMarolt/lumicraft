export interface Product {
  id?: number;
  model: string;
  brand: string;
  slug?: string;
  price: number;
  quantity: number;
  description: string;
  category: Category;
  images?: { id?: number; image: string }[];
}

export type Category =
  | 'phone'
  | 'tablet'
  | 'computer'
  | 'smartwatch'
  | 'accessory';
