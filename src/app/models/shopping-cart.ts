import { Product } from './product.interface';

export interface ShoppingCart {
  id?: number;
  allProducts: ShoppingCartProduct[];
  totalAmount: number;
  totalQuantity: number;
}

export interface ShoppingCartProduct {
  quantity: number;
  product: Product;
}
