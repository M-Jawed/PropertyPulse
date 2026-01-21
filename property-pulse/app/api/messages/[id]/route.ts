import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";
import type { NextRequest } from "next/server";

export const PUT = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) => {
  try {
    await connectDB();

    const { id } = await params;

    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "You must be logged in" }),
        { status: 400 },
      );

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (message.recipient.toString() !== userId)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error instanceof Error && error.message }),
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await connectDB();

    const { id } = await params;

    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "You are not logged in" }),
        { status: 400 },
      );

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (message.recipient.toString() !== userId)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    await message.deleteOne();

    return new Response(JSON.stringify({ message: "Deleted succesfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error instanceof Error && error.message }),
      { status: 500 },
    );
  }
};
