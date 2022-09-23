import { Document, Schema } from "mongoose";

export interface IUserModel extends Document {
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  avatar?: String,
  confirm_hash?: String,
  last_seen?: Date,
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageModel extends Document {
  text: string;
  unread: Boolean
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessagesModel extends Document {
  dialog_id: string;
  messages: IMessageModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDialogModel extends Document {
  author: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  partner: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  lastMessage: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
}
