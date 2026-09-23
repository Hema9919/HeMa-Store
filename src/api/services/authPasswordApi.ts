import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyResetCodeRequest,
} from "../types/userAuthTypes";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

// 1. Forgot Password
export async function forgotPassword(
  body: ForgotPasswordRequest
): Promise<{ statusMsg: string; message: string }> {
  const response = await fetch(`${BASE_URL}/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset code");
  }
  return data;
}

// 2. Verify Reset Code
export async function verifyResetCode(
  body: VerifyResetCodeRequest
): Promise<{ status: string }> {
  const response = await fetch(`${BASE_URL}/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid or expired reset code");
  }
  return data;
}

// 3. Reset Password
export async function resetPassword(
  body: ResetPasswordRequest
): Promise<{ token: string }> {
  const response = await fetch(`${BASE_URL}/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }
  return data;
}

// 4. Verify Token
export async function verifyToken(
  token: string
): Promise<{ message: string; decoded: any }> {
  const response = await fetch(`${BASE_URL}/verifyToken`, {
    method: "GET",
    headers: {
      token: token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid token");
  }
  return data;
}
