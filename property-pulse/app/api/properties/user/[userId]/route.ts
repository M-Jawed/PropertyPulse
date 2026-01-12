import type { NextRequest } from "next/server";
import Property from "@/models/Property";
import connectDB from "@/config/db";
import mongoose from "mongoose";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    await connectDB();

    const { userId } = await params;

    if (!userId)
      return new Response(
        JSON.stringify({ message: "No user found with that id" }),
        { status: 404 }
      );

    const properties = await Property.find({
      owner: userId,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 400 }
    );
  }
};
