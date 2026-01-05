import mongoose from "mongoose";

let connected = false;
const mongodbURI = process.env.MONGODB_URI as string;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(mongodbURI, { dbName: "propertypulsedb" });
    connected = true;
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
  }
};

export default connectDB;
