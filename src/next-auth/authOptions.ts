// import { jwtDecode } from "jwt-decode";
// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "myLogin",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your Email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter your Password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }
//         const response = await fetch(`${process.env.API}auth/signin`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });
//         const payload = await response.json();
//         console.log("ROUTEMISR LOGIN:", payload);
//         if (!response.ok) {
//           return null;
//         }
//         const userData: { id: string } = jwtDecode(payload.token);
//         return {
//           id: userData.id,
//           email: payload.user.email,
//           name: payload.user.name,
//           token: payload.token,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.accessToken = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.accessToken = token.accessToken as string;
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// };
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "myLogin",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.API}auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const payload = await response.json();

          console.log("ROUTEMISR LOGIN:", payload);

          if (!response.ok || !payload?.token || !payload?.user) {
            return null;
          }

          const userData: { id: string } = jwtDecode(payload.token);

          return {
            id: userData.id,
            email: payload.user.email,
            name: payload.user.name,
            token: payload.token,
          };
        } catch (error) {
          console.error("LOGIN ERROR:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};