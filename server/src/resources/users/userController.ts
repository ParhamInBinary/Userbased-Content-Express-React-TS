import argon2 from "argon2";
import { Request, Response } from "express";
import Joi from "joi";
import { UserModel } from "./user-model";

export async function getAllUsers(
  req: Request,
  res: Response
) {
  const loggedInUser = req.session;
  const user = await UserModel.findOne({
    _id: loggedInUser?._id,
  });

  if (!user?.isAdmin) {
    return;
  }

  const users = await UserModel.find({}, { password: 0 });
  res.status(200).json(users);
}

export async function registerUser(
  req: Request,
  res: Response
) {
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

export async function loginUser(
  req: Request,
  res: Response
) {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    username,
  });

  if (!user) {
    res.status(401).json("Incorrect username or password");
    return;
  }
  const isAuth = await argon2.verify(
    user.password,
    password
  );
  if (!isAuth) {
    res.status(401).json("Incorrect username or password");
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

export async function logoutUser(
  req: Request,
  res: Response
) {
  req.session = null;
  res.sendStatus(204);
}

export async function updateUser(
  req: Request,
  res: Response
) {
  const loggedInUser = req.session;
  const user = await UserModel.findOne({
    _id: loggedInUser?._id,
  });

  if (!user?.isAdmin) {
    res
      .status(403)
      .json("Not authorized to delete this post");
    return;
  }

  const { username, isAdmin } = req.body;

  const foundUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    { username, isAdmin },
    { new: true, select: "-password" }
  );

  if (!foundUser) {
    return res
      .status(404)
      .json(`User ${req.params.id} not found`);
  }

  return res.status(200).json({
    username: foundUser.username,
    isAdmin: foundUser.isAdmin,
    _id: foundUser._id.toString(),
  });
}

export async function deleteUser(
  req: Request,
  res: Response
) {
  const loggedInUser = req.session;
  const user = await UserModel.findOne({
    _id: loggedInUser?._id,
  });

  if (!user?.isAdmin) {
    res
      .status(403)
      .json("Not authorized to delete this post");
    return;
  }

  const foundUser = await UserModel.findById(
    req.params.id,
    { password: 0 }
  );

  if (!foundUser) {
    return res
      .status(404)
      .json(`User ${req.params.id} not found`);
  }

  await UserModel.deleteOne({ _id: foundUser._id });

  res.sendStatus(204);
}
