import express from 'express'
import {apiRouter} from "./routes/appRouter.js";
import {UserService} from "./services/UserService.js";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";
import {UserController} from "./controllers/UserController.js";
import {PostController} from "./controllers/PostController.js";
import {PostService} from "./services/PostService.js";
import {PostServiceEmbeddedImpl} from "./services/PostServiceEmbeddedImpl.js";

export const userService:UserService = new UserServiceEmbeddedImpl();
export const postService:PostService = new PostServiceEmbeddedImpl();
export const userController = new UserController(userService)
export const postController = new PostController(postService)

export const launchServer = () => {
    const app = express();
    app.listen(3023, () => {
        console.log("Server runs at http://localhost:3023")
    })
    app.use('/api', apiRouter)
}