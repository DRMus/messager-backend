import express from "express";

import { verifyJWTToken } from "../utils";
import jwt from "jsonwebtoken"

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.path === "/user/login" || req.path === "/user/create") {
    return next();
  }

  const token = req.headers.token;
  verifyJWTToken(token || "")
    .then((user) => {
      req.user = user.data;
      next();
    })
    .catch((err) => {
      res.status(403).json({ err: err, message: "Invalid JWT token" });
    });
};
