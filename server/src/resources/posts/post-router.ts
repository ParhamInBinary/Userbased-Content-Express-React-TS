import express, { Request, Response } from "express";
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
      try {
        const loggedInUser = req.session;
        const user = await UserModel.findOne({
          loggedInUser,
        });
        const { title, content } = req.body;

        // CHECK FOR MISSING OR INCORRECT VALUES
        if (
          !title ||
          typeof title !== "string" ||
          title.length < 1
        ) {
          res.status(400).json('/"title"/i');
          return;
        }
        if (
          !content ||
          typeof content !== "string" ||
          content.length < 1
        ) {
          res.status(400).json('/"content"/i');
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
      } catch (error: any) {
        res.sendStatus(500);
        console.log(error?.message);
      }
    }
  )
  .get(
    "/api/posts/:id",
    async (req: Request, res: Response) => {
      try {
        const specificPost = await PostModel.findById(
          req.params.id
        );

        if (!specificPost) {
          res.status(404).json(`${req.params.id} not found`);
          return
        }

        res.status(200).json({
          _id: specificPost!._id.toString(),
          title: specificPost!.title,
          content: specificPost!.content,
          author: specificPost!.author,
          createdAt: specificPost!.createdAt,
          updatedAt: specificPost!.updatedAt,
        });
      } catch (error: any) {
        res.sendStatus(500);
        console.log(error?.message);
      }
    }
  )
  .delete(
    "/api/posts/:id",
    auth,
    async (req: Request, res: Response) => {
      try {
        const loggedInUser = req.session;
        const user = await UserModel.findOne({
          loggedInUser,
        });
        const post = await PostModel.findById(req.params.id);

        if (!post) {
          res.status(404).json(`Post not found`);
          return;
        }

        if (post.author.toString() !== user!._id.toString()) {
          res.status(403).json("Not authorized to delete this post");
          return;
        }

        
        await post.delete();
        res.sendStatus(204);
      } catch (error: any) {
        res.sendStatus(500);
        console.log(error?.message);
      }
    }
  );

