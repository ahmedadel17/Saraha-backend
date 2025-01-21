import mongoose from "mongoose";
const connectDB = () => {
  try {
    console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
};
export default connectDB;
