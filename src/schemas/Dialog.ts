import mongoose, { Schema } from "mongoose";

import MessageSchema from "./Message";
import { IDialogModel } from "./interfaces";

const DialogSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", require: true },
    partner: { type: Schema.Types.ObjectId, ref: "User", require: true },
    lastMessage: { type: MessageSchema, default: null },
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model<IDialogModel>("Dialog", DialogSchema);

export default DialogModel;
