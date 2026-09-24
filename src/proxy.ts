import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // المسارات الخاصة بالمصادقة (لا يدخلها المستخدم إذا كان مسجل دخول بالفعل)
  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/reset-password",
  ];

  // المسارات المحمية (تتطلب تسجيل الدخول)
  const protectedRoutes = ["/cart", "/wishlist", "/profile"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1. إذا كان يحاول الوصول لصفحة محمية وهو غير مسجل دخول
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. إذا كان مسجل دخول بالفعل ويحاول فتح صفحة تسجيل الدخول أو التسجيل
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// تحديد المسارات التي يشتغل عليها الـ proxy
export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/reset-password",
  ],
};
