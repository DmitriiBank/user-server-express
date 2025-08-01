
import {PostType} from "../model/postTypes.js";

export interface  PostService {
    addPost(post:PostType): boolean;
    updatePost(newPostData:PostType): boolean;
    removePost (postId:number): PostType;
    getAllPosts (): PostType[];
    getPostById (postId:number): PostType;
    getPostsByUserName(userName:string): PostType[];
}