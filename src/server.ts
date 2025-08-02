import express, {NextFunction, Request, Response} from 'express'
import {apiRouter} from "./routes/appRouter.js";
import {UserService} from "./services/UserService.js";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";
import {UserController} from "./controllers/UserController.js";
import {PostController} from "./controllers/PostController.js";
import {PostService} from "./services/PostService.js";
import {PostServiceEmbeddedImpl} from "./services/PostServiceEmbeddedImpl.js";
import {HttpError} from "./errorHandler/HttpError.js";

export const userService: UserService = new UserServiceEmbeddedImpl();
export const postService: PostService = new PostServiceEmbeddedImpl();
export const userController = new UserController(userService)
export const postController = new PostController(postService)

export const launchServer = () => {
    const app = express();
    app.listen(3023, () => {
        console.log("Server runs at http://localhost:3023")
    })
    //===============Middleware============
    app.use(express.json())

    //===============Router================
    app.use('/api', apiRouter)

    app.use((req, res) => {
        res.status(400).send("Bad request")
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        //const error: {status: number, message: string} = JSON.parse(err.message)
        if (err instanceof HttpError) res.status(err.status).send(err.message)
        else
            res.status(500).send("Unknown server error!")
    })
}