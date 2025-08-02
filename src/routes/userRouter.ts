import express, {NextFunction, Request, Response} from "express";
import {userController} from "../server.js";
import {myLogger} from "../utils/logger.js";
import asyncHandler from "express-async-handler";
import {HttpError} from "../errorHandler/HttpError.js";
import {UserDtoSchema} from "../joiSchemas/userSchemas.js";

export const userRouter = express.Router()

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/users${req.url}" was received`);
    next();
});

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/users${req.url}" was received`);
    next();
});

userRouter.get('/', asyncHandler(async (req, res) => {
    const userDto = req.body
    const {error} = UserDtoSchema.validate(userDto)
    if(error) throw new HttpError(400, error.message)
    if(req.query.id) await userController.getUser(req,res)
    else await userController.getAllUsers(req, res)
}))

userRouter.post('/',asyncHandler(async(req, res) => {
    const userDto = req.body
    const {error} = UserDtoSchema.validate(userDto)
    if(error) throw new HttpError(400, error.message)
    await userController.addUser(req, res)
}))

// userRouter.get('/user', (req, res) =>{
//     userController.getUser(req, res)
// })

userRouter.delete('/', asyncHandler(async (req, res) =>{
    const userDto = req.body
    const {error} = UserDtoSchema.validate(userDto)
    if(error) throw new HttpError(400, error.message)
    await userController.removeUser(req, res)
}))

userRouter.put('/', asyncHandler(async (req, res) => {
    const userDto = req.body
    const {error} = UserDtoSchema.validate(userDto)
    if(error) throw new HttpError(400, error.message)
    await userController.updateUser(req, res)
}))

userRouter.get('/logs', asyncHandler(async (req: Request, res: Response) => {
    await userController.getLogArray(req, res);
}));