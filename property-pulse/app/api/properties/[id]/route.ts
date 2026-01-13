import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import type { PropertyForm } from "@/types/types";

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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;
    const userSession = await getUserSession();

    const property = await Property.findById(id);

    if (!property)
      return new Response(
        JSON.stringify({ message: "No properties found with that id" }),
        { status: 404 }
      );

    if (!userSession || !userSession?.user)
      return new Response(
        JSON.stringify({ message: "User is not logged in" }),
        { status: 400 }
      );

    if (property.owner.toString() !== userSession.userId)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    await property.deleteOne();

    return new Response(JSON.stringify({ message: "Property deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 400 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    await connectDB();

    const session = await getUserSession();

    if (!session || !session.user)
      return new Response(
        JSON.stringify({ message: "User is not logged in" }),
        { status: 401 }
      );

    const { userId } = session;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    const propertyData: PropertyForm = {
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
      },
      beds: formData.get("beds") as string,
      baths: formData.get("baths") as string,
      square_feet: formData.get("square_feet") as string,
      amenities: amenities as string[],
      rates: {
        weekly: formData.get("rates.weekly") as string,
        monthly: formData.get("rates.monthly") as string,
        nightly: formData.get("rates.nightly") as string,
      },
      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
      owner: userId as string,
    };

    const property = await Property.findById(id);
    if (!property)
      return new Response(
        JSON.stringify({ message: "Property with that id not found" }),
        { status: 404 }
      );

    if (property.owner.toString() !== userId)
      return new Response(JSON.stringify({ message: "Permission Denied" }), {
        status: 401,
      });

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(
      JSON.stringify({ message: "Property Updated", updatedProperty }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 400 }
    );
  }
};
