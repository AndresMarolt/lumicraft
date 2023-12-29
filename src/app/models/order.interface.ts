import { Product } from './product.interface';

export interface Order {
  id?: number;
  status: string;
  timestamp: Date;
  totalAmount: number;
  totalQuantity: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  product: Product;
}
