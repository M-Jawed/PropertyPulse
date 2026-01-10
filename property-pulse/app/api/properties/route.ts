import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextRequest } from "next/server";
import { getUserSession } from "@/utils/getUserSession";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Failed to get route", { status: 404 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const session = await getUserSession();

    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: "Please log in first" }), {
        status: 400,
      });
    }

    const { userId } = session;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 400 });
  }
};
