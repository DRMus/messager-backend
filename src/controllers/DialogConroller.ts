import express from "express";
import { DialogModel, MessagesModel } from "../schemas";
import { IDialogModel, IMessagesModel, IUserModel } from "../schemas/interfaces";


class DialogCotroller {
  index(req: express.Request, res: express.Response) {
    const userRequest = req.user as IUserModel;
    const authorId: string = userRequest._id;
    DialogModel.find({
      $or: [{ partner: authorId }, { author: authorId }],
    })
      .populate(["author", "partner"])
      .exec((err, dialogs) => {
        if (err) {
          return res.status(404).json({
            message: "Dialogs is empty",
          });
        } else if (dialogs) {
          res.json(dialogs);
        }
      });
  }

  show(req: express.Request, res: express.Response) {
    DialogModel.find({}, (err: any, dialogs: IDialogModel) => {
      if (err) {
        return res.status(404).json({
          message: "dialogs not found",
        });
      } else if (dialogs) {
        res.json(dialogs);
      }
    });
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };
    const dialog = new DialogModel(postData);
    dialog
      .save()
      .then((dialog: IDialogModel) => {
        const sendObj : Array<object> = [];
        sendObj.push(dialog);
        const message = new MessagesModel({ dialog_id: dialog._id });
        message
          .save()
          .then((dialogMessages: IMessagesModel) => {
            sendObj.push(dialogMessages)
            res.send(sendObj)
          })
          .catch((err) => {
            return res.send(err);
          });
        
      })
      .catch((err) => {
        return res.send(err);
      });
  }
}

export default DialogCotroller;
