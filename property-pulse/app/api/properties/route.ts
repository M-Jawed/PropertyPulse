import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Failed to get route", { status: 404 });
  }
};
