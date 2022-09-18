import { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    author: {type: String, require: true},
    text: String,
    unread: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default MessageSchema;
