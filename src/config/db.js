  import mongoose from "mongoose";
  import dotenv from "dotenv";

  dotenv.config();

  const connectDatabase = async () => {
    // console.log("proces.env.MONGO_URL", process.env.MONGO_URL);
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error in connecting database", error);
      process.exit(1);
    }
  };

  connectDatabase();

  export default connectDatabase;
