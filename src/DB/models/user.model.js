import mongoose, { Schema } from "mongoose";
export const genders = {
  male: "male",
  female: "female",
};
export const userTypes = {
  user: "user",
  admin: "admin",
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      required: [true, "userName is required"],
      type: String,
      minLength: [3, "userName must be at least 3 characters"],
      trim: true,
    },
    email: {
      required: [true, "email is required"],
      type: String,
      unique: [true, "email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      lowerCase: true,
    },
    password: {
      required: [true, "password is required"],
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      //  default: "male",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(userTypes),
      default: "user",
    },
    DOB: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
