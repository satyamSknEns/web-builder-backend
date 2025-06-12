import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  // console.log("proces.env.MONGO_URL", process.env.MONGO_URL);
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the .env file");
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error in connecting database", error);
    process.exit(1);
  }
};
 
export default connectDatabase;
