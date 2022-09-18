import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import mongooseHidden from "mongoose-hidden";

import { IUserModel } from "./interfaces";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Invalidate Email"],
      unique: true,
    },
    avatar: String,
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    confirmed: { type: String, default: false },
    confirm_hash: String,
    last_seen: Date,
  },
  {
    timestamps: true,
  }
);

// UserSchema.plugin(mongooseHidden, { hidden: { password: true } });

const UserModel = mongoose.model<IUserModel>("User", UserSchema);

export default UserModel;
