import express from "express";
import ISockets from "../interfaces";
import { MessagesModel, DialogModel } from "../schemas";
import { IMessagesModel, IUserModel } from "../schemas/interfaces";

class MessagesCotroller {
  io: ISockets.IServerIO;

  constructor(io: ISockets.IServerIO) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const userRequest = req.user as IUserModel;
    const id: string = userRequest._id;
    MessagesModel.findById(id, (err: any, messages: IMessagesModel) => {
      if (err) {
        return res.status(404).json({
          message: "messages not found",
        });
      } else if (messages) {
        res.json(messages);
      }
    });
  }

  show = (req: express.Request, res: express.Response) => {
    MessagesModel.find({}, (err: any, messages: IMessagesModel) => {
      if (err) {
        return res.status(404).json({
          message: "dialog not found",
        });
      } else if (messages) {
        res.json(messages);
      }
    });
  }

  createMessage = (req: express.Request, res: express.Response) => {
    const userRequest = req.user as IUserModel;
    const dialogReq = req.body as IMessagesModel
    const dialog: string = dialogReq.dialog_id;
    if (!dialog) {
      return res.send({
        message: "DialogId is empty",
      });
    }
    const putData = {
      author: userRequest._id,
      text: req.body.text,
    };
    MessagesModel.updateOne(
      { dialog_id: dialog },
      { $push: { messages: putData } },
      (err: any, obj: any) => {
        if (err) {
          return res.json(err);
        } else {
          DialogModel.updateOne(
            {
              _id: dialog,
            },
            { lastMessage: putData },
            (err: any, obj: any) => {
              if (err) {
                return res.json(err);
              }
            }
          );
          res.json(obj);
        }
      }
    );
  }
}

export default MessagesCotroller;
