import argon2 from "argon2";
import express, { Request, Response } from "express";
import { UserModel } from "./user-model";

export const userRouter = express
  .Router()
  .get("/api/users", async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
  })
  .post(
    "/api/users/register",
    async (req: Request, res: Response) => {
      const { username, password, isAdmin } = req.body;

      // CHECKS FOR INCORRECT OR MISSING VALUES
      if (
        !username ||
        typeof username !== "string" ||
        username.length < 3
      ) {
        res.status(400).json("Invalid username");
        return;
      }
      if (
        !password ||
        typeof password !== "string" ||
        password.length < 3
      ) {
        res.status(400).json("Invalid password");
        return;
      }

      const hashedPassword = await argon2.hash(password);

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
        password: hashedPassword,
        isAdmin: false,
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
      const { username, password, isAdmin } = req.body;
      const user = await UserModel.findOne({
        username: username,
      });

      if (!user) {
        res
          .status(400)
          .json("Incorrect username or password");
      }

      const isAuth = await argon2.verify(
        user!.password,
        password,
        isAdmin
      );
      if (!isAuth)
        return res
          .status(400)
          .json("Incorrect username or password");

      req.session!.username = user!.username;

      res
        .status(200)
        .json(
          `Login successful! Welcome ${user?.username}`
        );
    }
  );
