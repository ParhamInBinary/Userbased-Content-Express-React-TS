import { InferSchemaType, Schema, model } from 'mongoose';

export const userSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
})

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model('user', userSchema);