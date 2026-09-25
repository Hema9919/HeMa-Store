export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
}

export interface OrderCartItem {
  count: number;
  price: number;
  product: OrderProduct;
}

export interface Order {
  _id: string;
  user: string;
  cartItems: OrderCartItem[];
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  status: string;
  data: Order;
}

export interface UserOrdersResponse {
  status: string;
  data: Order[];
}