import {UserService} from "../services/UserService.js";
import {User} from "../model/userTypes.js";
import {myLogger} from "../utils/logger.js";
import {baseUrl} from "../config/userServerConfig.js";
import {Request, Response} from "express";
import {parseBody} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: Request, res: Response) {
        const body = req.body as User
        if (body.id) {
            const existingUser = this.userService.getUser(body.id);
            if (existingUser) {
                throw new HttpError(409, `User with id ${body.id} already exists`);
            }
        }
        const users = this.userService.getAllUsers() as User[];
        const existingUserByName = users.find(user => user.userName === body.userName);
        if (existingUserByName) {
            throw new HttpError(409, `User with userName '${body.userName}' already exists`);
        }
        const isSuccess = this.userService.addUser(body);
        if (!isSuccess) {
            throw new HttpError(500, 'Failed to create user');
        }
        res.status(200).json({
            message: 'User was added',
            user: {id: body.id, userName: body.userName}
        });
        myLogger.log(`User created with id ${body.id}`)
        myLogger.save(`User created with id ${body.id}`)
    }

    async updateUser(req: Request, res: Response) {
        const body = req.body as User;
        if (!body.id) {
            throw new HttpError(400, "User ID is required for update");
        }
        const existingUser = this.userService.getUser(body.id);
        if (!existingUser) {
            throw new HttpError(404, `User with id ${body.id} not found`);
        }
        const isUpdated = this.userService.updateUser(body);
        if (!isUpdated) {
            throw new HttpError(500, "Failed to update user");
        }

        res.status(200).json({
            message: "User was updated",
            user: {id: body.id, userName: body.userName}
        });
        myLogger.save(`User with id ${body.id} was updated`)

    }

    async removeUser(req: Request, res: Response) {
        const body = req.body as User
        if (!body.id) {
            throw new HttpError(400, "User ID is required for deletion");
        }
        const isDelete = this.userService.removeUser(body.id);
        if (!isDelete) {
            throw new HttpError(404, `User with id ${body.id} not found`);
        }

        res.status(200).json({
            message: "User was deleted",
            deletedUser: isDelete
        });
        myLogger.log(`User with id ${body.id} was deleted`);
        myLogger.save(`User with id ${body.id} was deleted`);
    }

    async getAllUsers(req: Request, res: Response) {
        const users = this.userService.getAllUsers();
        res.status(200).send(JSON.stringify(users))
        myLogger.log("All users fetched")
    }

    async getUser(req: Request, res: Response) {
        const id = req.query.id as string;
        if (!id) {
            throw new HttpError(400, "User ID is required");
        }

        const user = this.userService.getUser(+id);
        if (!user) {
            throw new HttpError(404, `User with id ${id} not found`);
        }

        res.status(200).json(user);
        myLogger.log(`Fetched user with id: ${id}`);
    }

    async getLogArray(req: Request, res: Response) {
        const allLogs = myLogger.getLogArray()
        res.status(200).send(JSON.stringify(allLogs))
    }
}