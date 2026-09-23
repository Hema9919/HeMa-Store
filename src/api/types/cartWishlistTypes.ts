import { ProductType } from "./productTypes";

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: ProductType;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
}

export interface WishlistResponse {
  status: string;
  count?: number;
  message?: string;
  data: ProductType[] | string[];
}
