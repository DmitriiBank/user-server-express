import express, {NextFunction, Request, Response} from "express";
import {userController} from "../server.js";
import {myLogger} from "../utils/logger.js";
import asyncHandler from "express-async-handler";
import {
    CreateUserSchema,
    UserIdQuerySchema,
    GetAllUsersSchema,
    UserUpdateSchema,
    DeleteUserSchema
} from "../joiSchemas/userSchemas.js";
import {validate} from "express-validation";

export const userRouter = express.Router()

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/users${req.url}" was received`);
    next();
});

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/users${req.url}" was received`);
    next();
});

userRouter.get('/', validate(GetAllUsersSchema), asyncHandler(async (req, res) => {
    if(req.query.id) {
        validate(UserIdQuerySchema)(req, res, async () => {
            await userController.getUser(req, res);
        });
    } else {
        await userController.getAllUsers(req, res);
    }
}))

userRouter.post('/', validate(CreateUserSchema), asyncHandler(async(req, res) => {
    await userController.addUser(req, res)
}))

userRouter.delete('/', validate(DeleteUserSchema), asyncHandler(async (req, res) =>{
    await userController.removeUser(req, res)
}))

userRouter.put('/',  validate(UserUpdateSchema), asyncHandler(async (req, res) => {
    await userController.updateUser(req, res);
}))

userRouter.get('/logs', asyncHandler(async (req: Request, res: Response) => {
    await userController.getLogArray(req, res);
}));