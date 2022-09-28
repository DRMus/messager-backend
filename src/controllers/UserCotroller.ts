import express from "express";
import { validationResult } from "express-validator";
import ISockets from "../interfaces";

import { UserModel } from "../schemas";
import { IUserModel } from "../schemas/interfaces";
import { comparePassword, createJWToken } from "../utils";

class UserCotroller {
  io: ISockets.IServerIO;

  constructor(io: ISockets.IServerIO) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
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

  show = (_req: express.Request, res: express.Response) => {
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

  create = (req: express.Request, res: express.Response) => {
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

  getMe = (req: express.Request, res: express.Response) => {
    const userData = req.user as IUserModel;
    if (userData) {
      return res.json(userData);
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  }

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors = validationResult(postData);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    UserModel.findOne(
      { email: postData.email },
      (err: any, user: IUserModel) => {
        if (err || !user) {
          return res.status(404).json({
            message: "user not found",
          });
        } else {
          comparePassword(postData.password, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                return res.json({
                  status: "error",
                  message: "incorrect password or email",
                });
              }

              const token = createJWToken(user);

              res.json({
                status: "success",
                token: token,
              });
            })
            .catch((err) => {
              if (err) {
                return res.json({
                  status: "error",
                  message: err,
                });
              }
            });
        }
      }
    );
  }
}

export default UserCotroller;
