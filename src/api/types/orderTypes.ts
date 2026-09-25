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

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  id: number;

  cartItems: OrderCartItem[];

  createdAt: string;
  updatedAt: string;

  user: OrderUser;

  shippingAddress: ShippingAddress;

  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;

  paymentMethodType: string;

  isPaid: boolean;
  isDelivered: boolean;
}

export interface CreateOrderResponse {
  status: string;
  data: Order;
}

export type UserOrdersResponse = Order[];