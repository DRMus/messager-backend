import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

import { UserCotroller, DialogCotroller, MessagesCotroller } from "./controllers";

const app = express();
app.use(bodyParser.json());

const User = new UserCotroller();
const Dialog = new DialogCotroller();
const Messages = new MessagesCotroller();

mongoose.connect("mongodb://localhost:27017/chat");

app.get("/user/:id", User.index);
app.get("/users/", User.show);
app.post("/user/create", User.create);

app.get("/dialogs/:id", Dialog.index);
app.get("/dialogs/", Dialog.show);
app.post("/dialogs/create", Dialog.create);

app.get("/dialog/messages/:id", Messages.index);
app.get("/dialog/messages/", Messages.show);
app.post("/dialog/create", Messages.create);
app.put("/dialog/add/:id", Messages.createMessage)

app.listen(9000, () => {
  console.log(
    "http://localhost:9000 is started\n http://localhost:9000/create"
  );
});
