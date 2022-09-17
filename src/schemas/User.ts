import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";

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

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
