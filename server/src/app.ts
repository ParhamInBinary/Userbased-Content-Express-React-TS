import express from 'express';
import 'express-async-errors';
import { postRouter } from './resources/posts/post-router';
import { userRouter } from './resources/users/user-router';

export const app = express();
// SKRIV DIN SERVERKOD HÄR!
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
