export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  user: ReviewUser;
  product: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  results?: number;
  data: Review[];
  message?: string;
}
