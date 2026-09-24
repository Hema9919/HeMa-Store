import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/reset-password",
  ];

  const protectedRoutes = ["/cart", "/wishlist", "/profile"];

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let token = null;

  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    console.error("NextAuth getToken error:", error);
  }

  const isAuthenticated = !!token;

  // المستخدم غير مسجل دخول ويحاول دخول صفحة محمية
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // المستخدم مسجل دخول ويحاول فتح Login/Register
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

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