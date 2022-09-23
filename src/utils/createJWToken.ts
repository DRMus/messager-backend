import jwt from "jsonwebtoken";
import _ from "lodash";
import { IUserModel } from "../schemas/interfaces";
import { IUserData } from "./interfaces";

export default function createJWToken(user: IUserData | IUserModel) {
  const details = user as IUserData;
  let token = jwt.sign(
    {
      data: _.reduce(
        details,
        (memo: IUserData, value, key) => {
          if (key != "password") {
            memo[key] = value;
          }
          return memo;
        },
        details
      ),
    },
    process.env.JWT_KEY || "",
    {
      expiresIn: process.env.JWT_MAX_AGE || "",
      algorithm: "HS256",
    }
  );

  return token;
}
