import Property from "@/models/Property";
import User from "@/models/User";
import { getUserSession } from "@/utils/getUserSession";
import connectDB from "@/config/db";

export const GET = async () => {
  try {
    await connectDB();

    const session = await getUserSession();

    if (!session || !session.user)
      return new Response(
        JSON.stringify({ message: "User is not logged in" }),
        { status: 401 }
      );

    const { userId } = session;

    const user = await User.findOne({ _id: userId });

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify({ bookmarks }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      })
    );
  }
};
