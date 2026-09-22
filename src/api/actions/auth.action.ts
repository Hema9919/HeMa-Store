"use server";
//register
import { RegisterFormData } from "@/schemas/registerShema";
import toast from "react-hot-toast";
export async function userRegister(data: RegisterFormData) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    return response.ok;
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
    );
  }
}

// login
import type { LoginFormData } from "@/schemas/loginSchema";

export async function userLogin(data: LoginFormData) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
return response.ok
  } catch (error) {
    throw error;
  }
}