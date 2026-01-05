import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /properties/:id
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  console.log(id);

  if (!id)
    return new Response(JSON.stringify({ message: "ID not found" }), {
      status: 404,
    });

  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property)
      return new Response(
        JSON.stringify({ message: "Property with that id not found" }),
        { status: 404 }
      );

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error("failed to get the property details", error);
    return new Response(
      JSON.stringify({ message: "An error occured in this route", error }),
      { status: 400 }
    );
  }
};
