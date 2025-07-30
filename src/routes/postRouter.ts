import express from "express";
import {postController} from "../server.js";


export const postRouter = express.Router()

postRouter.get('/', (req, res) => {
    if(req.query.id) postController.getPostById(req,res)
    else postController.getAllPosts(req, res)
})

postRouter.post('/', async (req, res) => {
    await postController.addPost(req, res)
})


postRouter.delete('/', (req, res) =>{
    postController.removePost(req, res)
})

postRouter.put('/', async (req, res) => {
    await postController.updatePost(req, res)
})

postRouter.get('/user', (req, res) =>{
    postController.getPostsByUserName(req, res)
})

