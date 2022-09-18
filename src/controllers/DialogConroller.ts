import express from "express";
import { DialogModel } from "../schemas";
import { IDialogModel } from "../schemas/interfaces";

class DialogCotroller {
  index(req: express.Request, res: express.Response) {
    const authorId: string = req.params.id;
    DialogModel.find(
      {
        $or: [{ partner: authorId }, { author: authorId }],
      },).populate(["author", "partner"]).exec((err, dialogs) => {
        if (err) {
          return res.status(404).json({
            message: "Dialogs is empty",
          });
        } else if (dialogs) {
          res.json(dialogs);
        }
      })
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
      .then((obj) => {
        res.json(obj);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

export default DialogCotroller;
