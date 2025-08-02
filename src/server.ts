import express, {NextFunction, Request, Response} from 'express'
import {apiRouter} from "./routes/appRouter.js";
import {UserService} from "./services/UserService.js";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";
import {UserController} from "./controllers/UserController.js";
import {PostController} from "./controllers/PostController.js";
import {PostService} from "./services/PostService.js";
import {PostServiceEmbeddedImpl} from "./services/PostServiceEmbeddedImpl.js";
import {ValidationError} from "express-validation";

export const userService: UserService = new UserServiceEmbeddedImpl();
export const postService: PostService = new PostServiceEmbeddedImpl();
export const userController = new UserController(userService)
export const postController = new PostController(postService)

export const launchServer = () => {
    const app = express();

    //===============Middleware============
    app.use(express.json());

    //===============Router================
    app.use('/api', apiRouter)

    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `Route ${req.method} ${req.url} not found`
        });
    })

    app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {

        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json({
                error: 'Validation Error',
                message: err.message,
                details: err.details,
                requestBody: req.body
            })
        }

        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        })
    })

    app.listen(3023, () => {
        console.log("Server runs at http://localhost:3023")
    })
}