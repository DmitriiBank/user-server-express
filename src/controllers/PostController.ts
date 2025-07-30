import {PostService} from "../services/PostService.js";
import {parseBody} from "../utils/tools.js";
import {PostType} from "../model/postTypes.js";
import {IncomingMessage, ServerResponse} from "node:http";
import {myLogger} from "../utils/logger.js";
import {baseUrl} from "../config/userServerConfig.js";

export class PostController {
    constructor(private postService: PostService) {
    }

    async addPost(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as PostType
        const isSuccess = this.postService.addPost(body);
        if (isSuccess) {
            res.writeHead(201, {"Content-Type": "text/plain"})
            res.end('Post was added')
            myLogger.save(`Post created with id ${body.id}`)
        } else {
            res.writeHead(409, {"Content-Type": "text/plain"})
            res.end('Post already exists')
            myLogger.save(`Conflict: post with id ${body.id} already exists`)
        }
    }

    async updatePost(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as PostType
        if (!body || !body.id) {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("Invalid post data");
            myLogger.log("Invalid post data")
            return;
        }
        const isUpdated = this.postService.updatePost(body);
        if (isUpdated) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Post was updated");
            myLogger.save(`Post with id ${body.id} was updated`)
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Post not found");
            myLogger.save(`Conflict: post with id ${body.id} not found`)
        }
    }

    async removePost(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as PostType
        const isDelete = this.postService.removePost(body.id!);
        if (isDelete) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(isDelete));
            myLogger.log(`Post with id ${body.id} was deleted`)
            myLogger.save(`Post with id ${body.id} was deleted`)
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Post not found");
            myLogger.log(`Conflict: post with id ${body.id} not found`)
            myLogger.save(`Conflict: post with id ${body.id} not found`)
        }
    }

    async getAllPosts(req: IncomingMessage, res: ServerResponse) {
        const users = this.postService.getAllPosts();
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(users))
        myLogger.log("All posts fetched")
    }

    async getPostById(req: IncomingMessage, res: ServerResponse) {
        const url = new URL (req.url!, baseUrl)
        const id = url.searchParams.get('id')
        if (!id) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Post not found");
            myLogger.log("Post not found")
            return
        }

        const founded = this.postService.getPostById(id);
        if (founded !== null) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(founded))
            myLogger.save(`Fetched post with id: ${id}`)
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('Post not found')
            myLogger.log(`Post with id ${id} not found`);
        }

    }

    async getPostsByUserName(req: IncomingMessage, res: ServerResponse) {
        const url = new URL (req.url!, baseUrl)
        const userName = url.searchParams.get('userName')
        if (!userName) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Post not found");
            myLogger.log("Post not found")
            return
        }

        const founded = this.postService.getPostsByUserName(userName);
        if (founded !== null) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(founded))
            myLogger.save(`Fetched post with userName: ${userName}`)
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('Post not found')
            myLogger.log(`Post with userName: ${userName} not found`);
        }

    }

    async getLogArray(req: IncomingMessage, res: ServerResponse) {
        const allLogs = myLogger.getLogArray()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(allLogs))
    }
}