import {PostService} from "../services/PostService.js";
import {PostType} from "../model/postTypes.js";
import {myLogger} from "../utils/logger.js";
import {Request, Response} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export class PostController {
    constructor(private postService: PostService) {
    }

    async addPost(req: Request, res: Response) {
        const body = req.body as PostType
        const isSuccess = this.postService.addPost(body);
        if (!isSuccess)
            throw new HttpError(409, `Post with id ${body.id} already exists`);
        res.status(201).send('Post was added')
        myLogger.save(`Post created with id ${body.id}`)

    }

    async updatePost(req: Request, res: Response) {
        const body = req.body as PostType
        if (!body || !body.id)
            throw new HttpError(400, "Post ID is required for update");
        const isUpdated = this.postService.updatePost(body);
        if (!isUpdated) throw new HttpError(500, "Failed to update post");
        res.status(200).send("Post was updated");
        myLogger.save(`Post with id ${body.id} was updated`)

    }

    async removePost(req: Request, res: Response) {
        const postId = parseInt(req.params.id);
        if (isNaN(postId))
            throw new HttpError(400, "Invalid post ID");

        const isDelete = this.postService.removePost(postId);
        if (isDelete) {
            res.status(200).send(JSON.stringify(isDelete));
            myLogger.log(`Post with id ${postId} was deleted`)
            myLogger.save(`Post with id ${postId} was deleted`)
        } else {
            res.status(200).send("Post not found");
            myLogger.log(`Conflict: post with id ${postId} not found`)
            myLogger.save(`Conflict: post with id ${postId} not found`)
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const posts = this.postService.getAllPosts();
         res.status(200).send(JSON.stringify(posts))
        myLogger.log("All posts fetched")
    }

    async getPostById(req: Request, res: Response) {
        const postId = parseInt(req.params.id);
        if (!postId) {
            throw new HttpError(400, "Invalid post ID");
        }
        res.status(200).json(this.postService.getPostById(postId));
        myLogger.log(`Post with id ${postId} fetched`);
    }

    async getPostsByUserName(req: Request, res: Response) {
        const {userName} = req.query
        if (!userName || typeof userName !== 'string')
            throw new HttpError(400, "userName parameter is required");
        const founded = this.postService.getPostsByUserName(userName);
        if (founded !== null) {
            res.status(200).send(JSON.stringify(founded))
            myLogger.save(`Fetched post with userName: ${userName}`)
        } else {
            res.status(200).send('Post not found')
            myLogger.log(`Post with userName: ${userName} not found`);
        }

    }
}