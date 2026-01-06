import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type { SignIn, SessionProps } from "@/types/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      return true;
    },

    async session({ session }) {
      return session;
    },
  },
};
