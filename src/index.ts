import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"

import { UserCotroller, DialogCotroller, MessagesCotroller } from "./controllers";
import { checkAuth } from "./middlewares";

const app = express();

dotenv.config()

app.use(bodyParser.json());
app.use(checkAuth)

const User = new UserCotroller();
const Dialog = new DialogCotroller();
const Messages = new MessagesCotroller();

mongoose.connect("mongodb://localhost:27017/chat");

app.get("/user/:id", User.index);
app.get("/users/", User.show);
app.post("/user/create", User.create);
app.post("/user/login", User.login);

app.get("/dialogs/", Dialog.index);
app.get("/dialogs/all", Dialog.show);
app.post("/dialogs/create", Dialog.create);

app.get("/dialog/messages/:id", Messages.index);
app.get("/dialog/messages/", Messages.show);
app.put("/dialog/add/:id", Messages.createMessage)

app.listen(process.env.PORT, () => {
  console.log(
    `http://localhost:${process.env.PORT} is started`
  );
});
