import type { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const propertes = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(propertes), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error instanceof Error && error.message }),
      { status: 400 },
    );
  }
};
