import { InferSchemaType, Schema, model } from "mongoose";

export const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, maxlength: 400 },
  author: { type: String, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

export type Post = InferSchemaType<typeof postSchema> & { _id: string };
// export type PostCreate = Omit<Post, '_id' | 'createdAt' | 'updatedAt' | 'author'>;
// export type PostCreateAlt = Pick<Post, 'title' | 'content'>;

export const PostModel = model("post", postSchema);
