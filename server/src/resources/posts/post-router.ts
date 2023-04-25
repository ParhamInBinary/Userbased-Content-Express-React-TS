import express, { Request, Response } from "express";
import Joi from "joi";
import { auth } from "../../middlewares/auth";
import { UserModel } from "../users/user-model";
import { PostModel } from "./post-model";

export const postRouter = express
  .Router()
  .get(
    "/api/posts",
    async (req: Request, res: Response) => {
      const posts = await PostModel.find({});
      res.json(posts);
    }
  )
  .post(
    "/api/posts",
    auth,
    async (req: Request, res: Response) => {
      const loggedInUser = req.session;
      const user = await UserModel.findOne({
        _id: loggedInUser?._id,
      });
      const { title, content } = req.body;

      // CHECK FOR MISSING OR INCORRECT VALUES
      const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      });

      const result = schema.validate(req.body);

      if (result.error) {
        res.status(400).json(result.error.message);
        return;
      }

      const post = {
        title: title,
        content: content,
        author: user!._id,
      };
      const newPost = await PostModel.create(post);

      res.status(201).json({
        _id: newPost._id,
        title: newPost.title,
        content: newPost.content,
        author: newPost.author,
      });
    }
  )
  .get(
    "/api/posts/:id",
    async (req: Request, res: Response) => {
      const specificPost = await PostModel.findById(
        req.params.id
      );

      if (!specificPost) {
        res.status(404).json(`${req.params.id} not found`);
        return;
      }

      res.status(200).json({
        _id: specificPost!._id.toString(),
        title: specificPost!.title,
        content: specificPost!.content,
        author: specificPost!.author,
        createdAt: specificPost!.createdAt,
      });
    }
  )
  .delete(
    "/api/posts/:id",
    auth,
    async (req: Request, res: Response) => {
      const loggedInUser = req.session;
      const user = await UserModel.findOne({
        _id: loggedInUser?._id,
      });
      const post = await PostModel.findById(req.params.id);

      if (!post) {
        res.status(404).json(`${req.params.id} not found`);
        return;
      }

      if (post.author.toString() !== user?._id.toString()) {
        res
          .status(403)
          .json("Not authorized to delete this post");
        return;
      }

      await PostModel.deleteOne({ _id: post._id });
      res.sendStatus(204);
    }
  )
  .put(
    "/api/posts/:id",
    auth,
    async (req: Request, res: Response) => {
      const post = await PostModel.findById(req.params.id);

      if (!post) {
        res.status(404).json(`${req.params.id} not found`);
        return;
      }

      const loggedInUser = req.session;
      const user = await UserModel.findOne({
        _id: loggedInUser?._id,
      });

      if (
        !user ||
        (post.author.toString() !== user?._id.toString() &&
          !user.isAdmin)
      ) {
        res.status(403).json("Forbidden");
        return;
      }

      const { title, content } = req.body;

      const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required(),
        _id: Joi.string().required(),
        createdAt: Joi.date().required(),
      });

      const result = schema.validate(req.body);

      if (result.error) {
        res.status(400).json(result.error.message);
        return;
      }

      post.title = title;
      post.content = content;
      const updatedPost = await post.save();

      res.status(200).json({
        _id: updatedPost._id.toString(),
        title: updatedPost.title,
        content: updatedPost.content,
        author: updatedPost.author.toString(),
        createdAt: updatedPost.createdAt.toString(),
      });
    }
  );
