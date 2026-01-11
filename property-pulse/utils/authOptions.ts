import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import type { SignIn, SessionProps } from "@/types/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const userExists = await User.findOne({ email: user?.email });

      if (!userExists) {
        const username = user?.name?.slice(0, 20);
        await User.create({
          email: user?.email,
          username,
          image: user?.image,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();

      const user = await User.findOne({ email: session?.user?.email });

      if (!user || !session.user) {
        return session;
      }

      session.user.id = user._id.toString();

      return session;
    },
  },
};
