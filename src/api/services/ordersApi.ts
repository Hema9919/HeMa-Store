import type {
  CreateOrderResponse,
  ShippingAddress,
  UserOrdersResponse,
} from "../types/orderTypes";

const BASE_URL =
  "https://ecommerce.routemisr.com/api/v1/orders";

// Create Cash Order
export async function createCashOrder(
  cartId: string,
  token: string,
  shippingAddress: ShippingAddress
): Promise<CreateOrderResponse> {
  const response = await fetch(`${BASE_URL}/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create order"
    );
  }

  return data;
}

// Get User Orders
export async function getUserOrders(
  userId: string,
  token: string
): Promise<UserOrdersResponse> {
  const response = await fetch(
    `${BASE_URL}/user/${userId}`,
    {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
}