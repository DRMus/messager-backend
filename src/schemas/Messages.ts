import mongoose, { Schema } from "mongoose";

import MessageSchema from "./Message";
import { IMessagesModel } from "./interfaces";

const MessagesSchema = new Schema(
  {
    dialog_id: {type: Schema.Types.ObjectId, ref: "Dialog", require: true},
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

const MessagesModel = mongoose.model<IMessagesModel>("Messages", MessagesSchema);

export default MessagesModel;
