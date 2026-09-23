import { CartResponse } from "../types/cartWishlistTypes";

const BASE_URL_V1 = "https://ecommerce.routemisr.com/api/v1/cart";
const BASE_URL_V2 = "https://ecommerce.routemisr.com/api/v2/cart";

// 1. Add Product to Cart (v2)
export async function addToCart(
  productId: string,
  token: string
): Promise<CartResponse> {
  const response = await fetch(BASE_URL_V2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }
  return data;
}

// 2. Update Cart Product Quantity (v1)
export async function updateCartQuantity(
  productId: string,
  count: number,
  token: string
): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL_V1}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ count: count.toString() }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update product quantity");
  }
  return data;
}

// 3. Get Logged User Cart (v1)
export async function getLoggedUserCart(
  token: string
): Promise<CartResponse> {
  const response = await fetch(BASE_URL_V1, {
    method: "GET",
    headers: {
      token: token,
    },
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart");
  }
  return data;
}

// 4. Remove Specific Cart Item (v1)
export async function removeCartItem(
  productId: string,
  token: string
): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL_V1}/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to remove item from cart");
  }
  return data;
}

// 5. Clear User Cart (v1)
export async function clearCart(token: string): Promise<{ message: string }> {
  const response = await fetch(BASE_URL_V1, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to clear cart");
  }
  return data;
}
