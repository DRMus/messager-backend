import mongoose from "mongoose";
import express from "express";

import User from "./schemas/User";

const app = express();

mongoose.connect("mongodb://localhost:27017/chat");

app.get("/", (_, res) => {
  res.send("hello")
  const user = new User({ email: "hello@a.com", fullname: "Pete Dare" });
  user.save().then(() => console.log("user saved"));
});

app.listen(9000, () => {
  console.log(123);
});
