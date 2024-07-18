import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting mongo db", error);
  }
};
