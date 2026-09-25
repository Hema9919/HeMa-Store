import type {
  Review,
  ReviewsResponse,
} from "../types/reviewsTypes";

const BASE_URL =
  "https://ecommerce.routemisr.com/api/v1/products";

const REVIEWS_URL =
  "https://ecommerce.routemisr.com/api/v1/reviews";

// =========================
// Add Review
// =========================

export async function addReview(
  productId: string,
  token: string,
  review: string,
  rating: number
): Promise<{ data: Review; message?: string }> {
  const response = await fetch(
    `${BASE_URL}/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add review");
  }

  return data;
}

// =========================
// Get Reviews
// =========================

export async function getProductReviews(
  productId: string
): Promise<ReviewsResponse> {
  const response = await fetch(
    `${BASE_URL}/${productId}/reviews`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
}

// =========================
// Update Review
// =========================

export async function updateReview(
  reviewId: string,
  token: string,
  review: string,
  rating: number
): Promise<{ data: Review; message?: string }> {
  const response = await fetch(
    `${REVIEWS_URL}/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update review");
  }

  return data;
}

// =========================
// Delete Review
// =========================

export async function deleteReview(
  reviewId: string,
  token: string
): Promise<{ message?: string }> {
  const response = await fetch(
    `${REVIEWS_URL}/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete review");
  }

  return data;
}