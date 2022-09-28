import express from "express";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import {
  UserCotroller as UserCtrl,
  DialogCotroller as DialogCtrl,
  MessagesCotroller as MessagesCtrl,
} from "../controllers";
import ISockets from "../interfaces";
import { loginValidation } from "../utils/validation";

const createRoutes = (
  app: express.Express,
  io: Server<
    ISockets.ClientToServer,
    ISockets.ServerToClient,
    DefaultEventsMap,
    any
  >
) => {
  const UserCotroller = new UserCtrl(io);
  const DialogCotroller = new DialogCtrl(io);
  const MessagesCotroller = new MessagesCtrl(io);

  app.get("/user/:id", UserCotroller.index);
  app.get("/users/", UserCotroller.show);
  app.get("/users/me", UserCotroller.getMe);
  app.post("/user/create", UserCotroller.create);
  app.post("/user/login", loginValidation, UserCotroller.login);

  app.get("/dialogs/", DialogCotroller.index);
  app.get("/dialogs/all", DialogCotroller.show);
  app.post("/dialogs/create", DialogCotroller.create);

  app.get("/dialog/messages/:id", MessagesCotroller.index);
  app.get("/dialog/messages/", MessagesCotroller.show);
  app.put("/dialog/add/:id", MessagesCotroller.createMessage);
};

export default createRoutes;
