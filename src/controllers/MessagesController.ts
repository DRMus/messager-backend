import express from "express";
import { MessagesModel } from "../schemas";
import { IMessagesModel } from "../schemas/interfaces";

class MessagesCotroller {
  index(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
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

  show(req: express.Request, res: express.Response) {
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

  create(req: express.Request, res: express.Response) {
    const postData = {
      dialog_id: req.body.dialog_id,
    };
    const message = new MessagesModel(postData);
    message
      .save()
      .then((obj) => {
        this.createMessage(req, res);
      })
      .catch((err) => {
        return res.send(err);
      });
  }

  createMessage(req: express.Request, res: express.Response) {
    let dialog: string = req.params.id ? req.params.id : req.body.dialog_id;
    const putData = {
      author: req.body.author,
      text: req.body.text,
    };
    MessagesModel.updateOne(
      { dialog_id: dialog },
      { $push: { messages: putData } },
      (err: any, obj: any) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(obj);
        }
      }
    );
  }
}

export default MessagesCotroller;

// .then(() => {
//   this.createMessage(req, res)
// })
