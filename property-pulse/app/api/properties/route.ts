import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextRequest } from "next/server";
import { getUserSession } from "@/utils/getUserSession";
import cloudinary from "@/config/cloudinary";

type PropertyForm = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: {
    weekly?: string;
    monthly?: string;
    nightly?: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  owner?: string;
  images?: string[];
};

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get("pageSize")) || 6;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments();

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), { status: 200 });
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
    const images = formData
      .getAll("images")
      .filter((image) => image !== "") as File[];

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

    const imageUploadPromises = [];

    for (let image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        },
      );

      imageUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises);

      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 400 });
  }
};
