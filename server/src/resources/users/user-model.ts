import { InferSchemaType, Schema, model } from "mongoose";

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
