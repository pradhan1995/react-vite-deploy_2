// src/types/index.ts

export type Category = 'Grocery' | 'Dairy' | 'Snacks' | 'Beverages';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  emoji: string;
  description: string;
  inStock: boolean;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export type DeliveryMode = 'delivery' | 'pickup';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
  address?: string;
}

export interface OrderPayload {
  items: OrderItem[];
  deliveryMode: DeliveryMode;
  customer: CustomerInfo;
  total: number;
}

export interface OrderResponse {
  orderId: string;
  orderRef: string;
  message: string;
}

export type OrderStatus = 'verified' | 'accepted' | 'paid' | 'shipped' | 'delivered';

export interface TrackingInfo {
  orderRef: string;
  status: OrderStatus;
  customer: { name: string; phone: string };
  items: OrderItem[];
  total: number;
  deliveryMode: DeliveryMode;
  shippingInfo?: {
    carrier: string;
    trackingId: string;
    estimatedDelivery: string;
  };
  paymentLink?: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    label: string;
  }[];
}

export interface RelatedProduct extends Product {}

export interface ProductDetail extends Product {
  related: RelatedProduct[];
}

export interface CatalogResponse {
  products: Product[];
}
