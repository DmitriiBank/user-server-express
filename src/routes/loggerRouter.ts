import express from "express";
import {userController} from "../server.js";

export const loggerRouter = express.Router()

loggerRouter.get('/', async (req, res) => {
    await userController.getLogArray(req, res)
})