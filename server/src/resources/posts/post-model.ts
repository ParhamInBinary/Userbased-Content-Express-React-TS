import { InferSchemaType, Schema, model } from 'mongoose';

export const postSchema = new Schema({
    content: { type: String, required: true},
})

export type Post = InferSchemaType<typeof postSchema>;

export const PostModel = model('post', postSchema);