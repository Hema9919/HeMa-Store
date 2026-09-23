"use server";
//register
import { RegisterFormData } from "@/schemas/registerShema";

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

    return response.ok;
  } catch (error) {
    console.error("userRegister error:", error);
    return false;
  }
}

// login
// import type { LoginFormData } from "@/schemas/loginSchema";
// import { cookies } from "next/headers";

// export async function userLogin(data: LoginFormData) {
//   try {
//     const response = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       },
//     );

//     const result = await response.json();
//     if (response.ok) {
//       const cookie = await cookies();
//       cookie.set("userToken", result.token, {
//         httpOnly: true,
//         // maxAge
//         // expires
//         // secure
//       });
//     }
//     return response.ok;
//   } catch (error) {
//     throw error;
//   }
// }
