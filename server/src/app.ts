import cookieSession from "cookie-session";
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import "express-async-errors";
import { postRouter } from "./resources/posts/post-router";
import { userRouter } from "./resources/users/user-router";

export const app = express();
// SKRIV DIN SERVERKOD HÄR!
app.use(express.json());
app.use(
  cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "sdg669s8dguiksg7993kjbh1",
    maxAge: 1000 * 86400,
  })
);
app.use(userRouter);
app.use(postRouter);

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.sendStatus(500);
    console.error(err);
  }
);
