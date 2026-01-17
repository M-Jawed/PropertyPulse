import type { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location as string, "i");

    console.log(location, propertyType);
    // Match properties with the given details
    let query: Record<string, any> = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // If property exists and property is not equal to 'All'
    if (propertyType && propertyType.toLocaleLowerCase() !== "all") {
      const propertyTypePattern = new RegExp(propertyType as string, "i");
      query.type = propertyTypePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
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
