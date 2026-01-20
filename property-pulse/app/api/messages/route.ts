import type { NextRequest } from "next/server";
import Message from "@/models/Message";
import connectDB from "@/config/db";
import { getUserSession } from "@/utils/getUserSession";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "You need to be logged in" }),
        { status: 401 },
      );

    const { userId } = userSession;

    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { name, email, phone, message, recipient, property } =
      await request.json();
    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "User must be logged in" }),
        { status: 401 },
      );

    const { userId } = userSession;

    if (userId === recipient)
      return new Response(
        JSON.stringify({ message: "You cannot send a message to yourself" }),
        { status: 400 },
      );

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent succesfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 400 },
    );
  }
};
