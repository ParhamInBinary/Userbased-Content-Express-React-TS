import argon2 from "argon2";
import express, { Request, Response } from "express";
import Joi from "joi";
import { UserModel } from "./user-model";

export const userRouter = express
  .Router()
  .get(
    "/api/users",
    async (req: Request, res: Response) => {
      const users = await UserModel.find({});
      res.json(users);
    }
  )
  .post(
    "/api/users/register",
    async (req: Request, res: Response) => {
      const { username, password } = req.body;

      // CHECK FOR MISSING OR INCORRECT VALUES
      const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });

      const result = schema.validate(req.body);

      if (result.error) {
        res.status(400).json(result.error.message);
        return;
      }

      // CHECKS USERNAME TO EXSISTING ONE
      const existsingUser = await UserModel.findOne({
        username,
      });
      if (existsingUser) {
        res
          .status(409)
          .json(
            "This username is taken. Please chose another one"
          );
        return;
      }

      const user = {
        username,
        password,
      };
      const newUser = await UserModel.create(user);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        isAdmin: newUser.isAdmin,
      });
    }
  )
  .post(
    "/api/users/login",
    async (req: Request, res: Response) => {
      const { username, password } = req.body;
      const user = await UserModel.findOne({
        username,
      });

      if (!user) {
        res
          .status(401)
          .json("Incorrect username or password");
        return;
      }
      const isAuth = await argon2.verify(
        user.password,
        password
      );
      if (!isAuth) {
        res
          .status(401)
          .json("Incorrect username or password");
        return;
      }

      req.session!.username = user.username;
      req.session!._id = user._id;
      req.session!.isAdmin = user.isAdmin;

      res.status(200).json({
        _id: user!._id,
        username: user!.username,
        isAdmin: user!.isAdmin,
      });
    }
  )
  .post(
    "/api/users/logout",
    async (req: Request, res: Response) => {
      req.session = null;
      res.sendStatus(204);
    }
  )