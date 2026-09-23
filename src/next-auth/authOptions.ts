import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // ways to sign in by google/email/github/credentials
    Credentials({
      // name button
      name: "myLogin",
      credentials: {
        //inputInfo
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      //call api , navigate user to home page
      async authorize(credentials) {
        // return null or error or object
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const payload = await response.json();
        return {
          id:'',
          email:payload.user.email,
          name:payload.user.name,
          token:payload.token
        };
      },
    }),
  ],
  //pages
  pages:{
    signIn:'/login'
  }
};
