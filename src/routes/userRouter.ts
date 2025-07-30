import express from "express";
import {userController} from "../server.js";

export const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    if(req.query.id) userController.getUser(req,res)
    else userController.getAllUsers(req, res)
})

userRouter.post('/', async (req, res) => {
    await userController.addUser(req, res)
})

// userRouter.get('/user', (req, res) =>{
//     userController.getUser(req, res)
// })

userRouter.delete('/', (req, res) =>{
    userController.removeUser(req, res)
})

userRouter.put('/', async (req, res) => {
    await userController.updateUser(req, res)
})