import { WishlistResponse } from "../types/cartWishlistTypes";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

// 1. Add Product to Wishlist
export async function addToWishlist(
  productId: string,
  token: string
): Promise<WishlistResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to wishlist");
  }
  return data;
}

// 2. Remove Product from Wishlist
export async function removeFromWishlist(
  productId: string,
  token: string
): Promise<WishlistResponse> {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to remove product from wishlist");
  }
  return data;
}

// 3. Get Logged User Wishlist
export async function getLoggedUserWishlist(
  token: string
): Promise<WishlistResponse> {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      token: token,
    },
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }
  return data;
}
