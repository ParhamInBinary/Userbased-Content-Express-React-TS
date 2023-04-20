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
  );

  .put(
    "/api/posts/:id",
    auth,
    async (req: Request, res: Response) => {
      try {
        const { title, content } = req.body;
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          { title, content },
          { new: true }
        );
  
        if (!updatedPost) {
          res.status(404).json(`${req.params.id} not found`);
          return;
        }
  
        res.status(200).json({
          _id: updatedPost._id.toString(),
          title: updatedPost.title,
          content: updatedPost.content,
          author: updatedPost.author,
          createdAt: updatedPost.createdAt,
          updatedAt: updatedPost.updatedAt,
        });
      } catch (error: any) {
        res.sendStatus(500);
        console.log(error?.message);
      }
    }
  );
  