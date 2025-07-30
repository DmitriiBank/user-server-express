import express from "express";
import {userRouter} from "./userRouter.js";
import {loggerRouter} from "./loggerRouter.js";
import {postRouter} from "./postRouter.js";


export const apiRouter = express.Router();
apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postRouter)
apiRouter.use('/logger', loggerRouter)