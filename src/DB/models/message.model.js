import mongoose, { Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      required: [true, "content is required"],
      type: String,
      minLength: [3, "content must be at least 3 characters"],
      trim: true,
    },
    sender: {
      required: [true, "sender is required"],
      type: Types.ObjectId,
      trim: true,
      ref: "User",
    },
    receiver: {
      required: [true, "receiver is required"],
      type: Types.ObjectId,
      trim: true,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
