import {PostService} from "../services/PostService.js";
import {parseBody} from "../utils/tools.js";
import {PostType} from "../model/postTypes.js";
import {myLogger} from "../utils/logger.js";
import {baseUrl} from "../config/userServerConfig.js";
import {Request,Response} from "express";

export class PostController {
    constructor(private postService: PostService) {
    }

    async addPost(req: Request, res: Response) {
        const body = req.body as PostType
        const isSuccess = this.postService.addPost(body);
        if (isSuccess) {
            res.status(201).send('Post was added')
            myLogger.save(`Post created with id ${body.id}`)
        } else {
            res.status(409).send('Post already exists')
            myLogger.save(`Conflict: post with id ${body.id} already exists`)
        }
    }

    async updatePost(req: Request, res: Response) {
        const body = req.body as PostType
        if (!body || !body.id) {
            res.status(400).send("Invalid post data");
            myLogger.log("Invalid post data")
            return;
        }
        const isUpdated = this.postService.updatePost(body);
        if (isUpdated) {
            res.status(200).send("Post was updated");
            myLogger.save(`Post with id ${body.id} was updated`)
        } else {
            res.status(404).send("Post not found");
            myLogger.save(`Conflict: post with id ${body.id} not found`)
        }
    }

    async removePost(req: Request, res: Response) {
        const postId = parseInt(req.params.id);
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
        const users = this.postService.getAllPosts();
        res.status(200).send(JSON.stringify(users))
        myLogger.log("All posts fetched")
    }

    async getPostById(req: Request, res: Response) {
        const postId = parseInt(req.params.id);
        if (!postId)
            res.status(404).send("Post not found");
       res.json(this.postService.getPostById(postId));
    }

    async getPostsByUserName(req: Request, res: Response) {
        const url = new URL (req.url!, baseUrl)
        const userName = url.searchParams.get('userName')
        if (!userName) {
            res.status(404).send("Post not found");
            myLogger.log("Post not found")
            return
        }

        const founded = this.postService.getPostsByUserName(userName);
        if (founded !== null) {
            res.status(200).send(JSON.stringify(founded))
            myLogger.save(`Fetched post with userName: ${userName}`)
        } else {
            res.status(200).send('Post not found')
            myLogger.log(`Post with userName: ${userName} not found`);
        }

    }

    async getLogArray(req: Request, res: Response) {
        const allLogs = myLogger.getLogArray()
        res.status(200).send(JSON.stringify(allLogs))
    }
}