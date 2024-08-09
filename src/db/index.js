import mongoose from "mongoose";
import { DB_Name } from "./../constants.js";

const connectDB = async () => {
  try {
    const connrctionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connrctionInstance.connection.host}`
    );
    // console.log('hjghjghjg',connrctionInstance);
  } catch (error) {
    console.error("mongo connection error: ", error);
    process.exit(1);
  }
};

export { connectDB };
