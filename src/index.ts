import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

import UserModel from "./schemas/User";
import {UserCotroller} from "./controllers"

const app = express();
app.use(bodyParser.json());

const User = new UserCotroller()

mongoose.connect("mongodb://localhost:27017/chat");

app.get('/user/:id', User.index)

app.post("/user/create", User.create);

app.listen(9000, () => {
  console.log(
    "http://localhost:9000 is started\n http://localhost:9000/create"
  );
});
