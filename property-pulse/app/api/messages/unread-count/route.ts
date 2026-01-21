import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "You must be logged in" }),
        { status: 400 },
      );

    const { userId } = userSession;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error instanceof Error && error.message }),
      { status: 400 },
    );
  }
};
