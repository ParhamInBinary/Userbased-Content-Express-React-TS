import express from "express";
import { auth } from "../../middlewares/auth";
import {
  createPost,
  deletePost,
  findPost,
  getAllPosts,
} from "./postController";

export const postRouter = express
  .Router()
  .get("/api/posts", getAllPosts)
  .post("/api/posts", auth, createPost)
  .get("/api/posts/:id", findPost)
  .delete("/api/posts/:id", auth, deletePost)
  .put("/api/posts/:id", auth);
