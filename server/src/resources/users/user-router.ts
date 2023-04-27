import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "./userController";

export const userRouter = express
  .Router()
  .get("/api/users", getAllUsers)
  .post("/api/users/register", registerUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser)
  .put("/api/users/:id", updateUser)
  .delete("/api/users/:id", deleteUser);
