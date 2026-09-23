import {
  ChangePasswordRequest,
  GetAllUsersResponse,
  UpdateUserDataRequest,
  UserResponse,
} from "../types/userAuthTypes";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/users";

// 5. Update Logged User Password
export async function updateLoggedUserPassword(
  body: ChangePasswordRequest,
  token: string
): Promise<UserResponse> {
  const response = await fetch(`${BASE_URL}/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.msg || "Failed to update password");
  }
  return data;
}

// 6. Update Logged User Data
export async function updateLoggedUserData(
  body: UpdateUserDataRequest,
  token: string
): Promise<UserResponse> {
  const response = await fetch(`${BASE_URL}/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.msg || "Failed to update user profile");
  }
  return data;
}

// 7. Get All Users
export async function getAllUsers(query?: {
  limit?: number;
  keyword?: string;
}): Promise<GetAllUsersResponse> {
  const params = new URLSearchParams();
  if (query?.limit) params.set("limit", query.limit.toString());
  if (query?.keyword) params.set("keyword", query.keyword);

  const url = `${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data;
}
