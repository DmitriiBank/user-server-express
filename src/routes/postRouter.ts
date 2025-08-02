import express, {NextFunction, Request, Response} from "express";
import {postController} from "../server.js";
import {myLogger} from "../utils/logger.js";
import asyncHandler from "express-async-handler";
import {
    GetAllPostsSchema,
    PostBodySchema,
    PostParamsSchema,
    PostQuerySchema,
    PostUpdateSchema
} from "../joiSchemas/postSchemas.js";
import {validate} from 'express-validation';

export const postRouter = express.Router()

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was received`)
    next()
})

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was received`)
    next()
})

postRouter.get('/post/:id',  validate(PostParamsSchema), asyncHandler(async(req: Request, res: Response) => {
    await postController.getPostById(req, res);
}))

postRouter.get('/', validate(GetAllPostsSchema), asyncHandler(async(req, res) => {
    await postController.getAllPosts(req, res)
}))

postRouter.post('/', validate(PostBodySchema), asyncHandler(async(req, res) => {
    await postController.addPost(req, res)
}))

postRouter.delete('/post/:id', validate(PostParamsSchema), asyncHandler(async(req, res) => {
    await postController.removePost(req, res)
}))

postRouter.put('/', validate(PostUpdateSchema), asyncHandler(async (req, res) => {
    await postController.updatePost(req, res)
}))


postRouter.get('/user', validate(PostQuerySchema), asyncHandler(async (req, res) => {
    await postController.getPostsByUserName(req, res)
}))

