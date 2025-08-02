import express, {Request, Response, NextFunction} from "express";
import {postController} from "../server.js";
import {myLogger} from "../utils/logger.js";
import asyncHandler from "express-async-handler";
import {PostDtoSchema} from "../joiSchemas/postSchemas.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const postRouter = express.Router()

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was received`)
    next()
})

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was received`)
    next()
})

postRouter.get('/post/:id',  asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params
    if (!id) throw new HttpError(400, 'Post not found')
    await postController.getPostById(req, res);
}))

postRouter.get('/', asyncHandler(async(req, res) => {
    const postDto = req.body
    const {error} = PostDtoSchema.validate(postDto)
    if(error) throw new HttpError(400, error.message)
    await postController.getAllPosts(req, res)
}))

postRouter.post('/', asyncHandler(async(req, res) => {
    const postDto = req.body
    const {error} = PostDtoSchema.validate(postDto)
    if(error) throw new HttpError(400, error.message)
    await postController.addPost(req, res)
}))


postRouter.delete('/post/:id', asyncHandler(async(req, res) => {
    const postDto = req.body
    const {error} = PostDtoSchema.validate(postDto)
    if(error) throw new HttpError(400, error.message)
    await postController.removePost(req, res)
}))

postRouter.put('/', asyncHandler(async (req, res) => {
    const postDto = req.body
    const {error} = PostDtoSchema.validate(postDto)
    if(error) throw new HttpError(400, error.message)
    await postController.updatePost(req, res)
}))


postRouter.get('/user', asyncHandler(async (req, res) => {
    const postDto = req.body
    const {error} = PostDtoSchema.validate(postDto)
    if(error) throw new HttpError(400, error.message)
    await postController.getPostsByUserName(req, res)
}))

