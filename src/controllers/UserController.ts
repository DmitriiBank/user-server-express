import {UserService} from "../services/UserService.js";
import {User} from "../model/userTypes.js";
import {myLogger} from "../utils/logger.js";
import {baseUrl} from "../config/userServerConfig.js";
import {Request,Response} from "express";
import {parseBody} from "../utils/tools.js";

export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: Request, res: Response) {
        const body = req.body as User
        const isSuccess = this.userService.addUser(body);
        if (isSuccess) {
            res.status(200).send('User was added')
            myLogger.log(`User created with id ${body.id}`)
            myLogger.save(`User created with id ${body.id}`)
        } else {
            res.status(409).send('User already exists')
            myLogger.save(`Conflict: user with id ${body.id} already exists`)
            myLogger.save(`Conflict: user with id ${body.id} already exists`)
        }
    }

    async updateUser(req: Request, res: Response) {
        const body = await parseBody(req) as User;
        if (!body || !body.id) {
            res.status(400).send("Invalid user data");
            myLogger.log("Invalid user data")
            return;
        }
        const isUpdated = this.userService.updateUser(body);
        if (isUpdated) {
            res.status(200).send("User was updated");
            myLogger.save(`User with id ${body.id} was updated`)
        } else {
            res.status(404).send("User not found");
            myLogger.save(`Conflict: user with id ${body.id} not found`)
        }
    }

    async removeUser(req: Request, res: Response) {
        const body = req.body as User
        const isDelete = this.userService.removeUser(body.id);
        if (isDelete) {
            res.status(200).send(JSON.stringify(isDelete));
            // emitter.emit('user_removed')
            myLogger.log(`User with id ${body.id} was deleted`)
            myLogger.save(`User with id ${body.id} was deleted`)
        } else {
            res.status(404).send("User not found");
            myLogger.log(`Conflict: user with id ${body.id} not found`)
            myLogger.save(`Conflict: user with id ${body.id} not found`)
        }
    }

    async getAllUsers(req: Request, res: Response) {
        const users = this.userService.getAllUsers();
        res.status(200).send(JSON.stringify(users))
        myLogger.log("All users fetched")
    }

    async getUser(req: Request, res: Response) {
        const url = new URL (req.url!, baseUrl)
        const id = url.searchParams.get('id')
        if (!id) {
            res.status(404).send("User not found");
            myLogger.log("User not found")
            return
        }

        const founded = this.userService.getUser(+id);
        if (founded !== null) {
            res.status(200).send(JSON.stringify(founded))
            myLogger.log(`Fetched user with id: ${id}`)
        } else {
            res.status(404).send('User not found')
            myLogger.log(`User with id ${id} not found`);
        }

    }

    async getLogArray(req: Request, res: Response) {
        const allLogs = myLogger.getLogArray()
        res.status(200).send(JSON.stringify(allLogs))
    }
}