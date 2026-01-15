export const dynamic = "force-dynamic";

import type { NextRequest } from "next/server";
import User from "@/models/User";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import connectDB from "@/config/db";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    console.log(propertyId);
    const userSession = await getUserSession();

    if (!userSession || !userSession.user)
      return new Response(
        JSON.stringify({ message: "User is not logged in" }),
        { status: 401 }
      );

    const user = await User.findOne({
      _id: userSession?.userId,
    });

    if (!user)
      return new Response(
        JSON.stringify({ message: "User with that id not found" }),
        { status: 404 }
      );

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {}
};
