import mongoose, { Callback, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import mongooseHidden from "mongoose-hidden";
import bcrypt from "bcrypt";

import { IUserModel } from "./interfaces";
import { comparePassword, verifyUserPassword } from "../utils";

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

UserSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  verifyUserPassword(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

const UserModel = mongoose.model<IUserModel>("User", UserSchema);

export default UserModel;
