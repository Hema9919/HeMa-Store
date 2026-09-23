import NextAuth from "next-auth";
import "next-auth/jwt";
declare module "next-auth" {
  interface User {
    token: string;
  }
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
