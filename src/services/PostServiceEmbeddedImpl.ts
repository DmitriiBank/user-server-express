import {PostService} from "./PostService.js";
import {PostType} from "../model/postTypes.js";
import {userService} from "../server.js";
import {HttpError} from "../errorHandler/HttpError.js";


export class PostServiceEmbeddedImpl implements PostService {
    private posts: PostType[] = [{
        id: 1,
        userId: 1,
        title: "Title",
        text: "Some text"
    }]

    addPost(post: PostType): boolean {
        const existingPost = this.posts.find(p => p.id === post.id);
        if (existingPost) {
            throw new HttpError(409, `Post with id ${post.id} already exists`);
        }

        if (!this.isUserExists(post.userId)) {
            throw new HttpError(404, `User with id ${post.userId} not found`);
        }
        this.posts.push(post)
        return true
    }

    getAllPosts(): PostType[] {
        return [...this.posts];
    }

    getPostById(postId: number): PostType {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index === -1) throw new HttpError(404, `Post with id ${postId} not found`);
        return this.posts[index]
    }

    removePost(id: number): PostType {
        const index = this.posts.findIndex(item => item.id === id);
        console.log(index);
        // if (index === -1) throw new Error(JSON.stringify({status: 404, message: "Post not found"}));
        if (index === -1) throw new HttpError(404, `Post with id ${id} not found`);
        return this.posts.splice(index, 1)[0]
    }

    updatePost(newPostData: PostType): boolean {
        if (!newPostData.id) {
            throw new HttpError(400, "Post ID is required for update");
        }

        const index = this.posts.findIndex(post => post.id === newPostData.id);
        if (index === -1) {
            throw new HttpError(404, `Post with id ${newPostData.id} not found`);
        }

        if (!this.isUserExists(newPostData.userId)) {
            throw new HttpError(404, `User with id ${newPostData.userId} not found`);
        }

        if (!newPostData.title || newPostData.title.trim().length === 0) {
            throw new HttpError(400, "Post title cannot be empty");
        }

        if (!newPostData.text || newPostData.text.trim().length === 0) {
            throw new HttpError(400, "Post text cannot be empty");
        }

        this.posts[index] = newPostData
        return true
    }

    getPostsByUserName(userName: string): PostType[] {
        if (!userName || userName.trim().length === 0) {
            throw new HttpError(400, "userName cannot be empty");
        }
        const users = userService.getAllUsers();
        const user = Object.values(users).find(user => user.userName === userName);
        if (!user) throw new HttpError(404, `User '${userName}' not found`);
        return this.posts.filter(post => post.userId == user.id.toString());
    }

    private isUserExists(userId: number): boolean {
        try {
            const users = userService.getAllUsers();
            return Object.values(users).some(user => user.id.toString() === userId.toString());
        } catch (error) {
            return true;
        }
    }
};

