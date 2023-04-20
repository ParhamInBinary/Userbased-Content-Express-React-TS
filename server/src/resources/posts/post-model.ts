import { InferSchemaType, Schema, model } from "mongoose";

export const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, maxlenght: 400 },
  author: { type: String, required: false },
}, {
  versionKey: false,
  timestamps: true,
});

export type Post = InferSchemaType<typeof postSchema>;

export const PostModel = model("post", postSchema);
