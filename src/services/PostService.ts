
import {PostType} from "../model/postTypes.js";

export interface  PostService {
    addPost(post:PostType): boolean;
    updatePost(newPostData:PostType): boolean;
    removePost (postId:string): PostType|null;
    getAllPosts (): object;
    getPostById (postId:string): PostType|null;
    getPostsByUserName(userName:string): PostType[];
}