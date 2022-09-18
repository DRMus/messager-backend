import express from "express";
import { UserModel } from "../schemas";
import { IUserModel } from "../schemas/interfaces";

class UserCotroller {
  index(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    UserModel.findById(id, (err: any, user: IUserModel) => {
      if (err) {
        return res.status(404).json({
          message: "user not found",
        });
      } else if (user) {
        res.json(user);
      }
    });
  }

  show(req: express.Request, res: express.Response) {
    UserModel.find({}, (err: any, user: IUserModel) => {
      if (err) {
        return res.status(404).json({
          message: "users not found",
        });
      } else if (user) {
        res.json(user);
      }
    });
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };
    const user = new UserModel(postData);
    user
      .save()
      .then((obj) => {
        res.json(obj);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

export default UserCotroller;
