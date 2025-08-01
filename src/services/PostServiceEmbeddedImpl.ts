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
        this.posts.push(post)
        return true
    }

    getAllPosts(): PostType[] {
        return [...this.posts];
    }

    getPostById(postId: number): PostType {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index === -1) throw new HttpError(404, "Post not found");
        return this.posts[index]
    }

    removePost(id: number): PostType {
        const index = this.posts.findIndex(item => item.id === id);
        console.log(index);
       // if (index === -1) throw new Error(JSON.stringify({status: 404, message: "Post not found"}));
        if (index === -1) throw new HttpError(404, "Post not found");
        return this.posts.splice(index, 1)[0]
    }

    updatePost(newPostData: PostType): boolean {
        const index = this.posts.findIndex(post => post.id === newPostData.id);
        if (index !== -1) {
            this.posts[index] = newPostData
            return true
        }
        return false
    }

    getPostsByUserName(userName: string): PostType[] {
        const users = userService.getAllUsers();
        const user = Object.values(users).find(user => user.userName === userName);
        if (!user)
            return []
        return this.posts.filter(post => post.userId == user.id.toString());
    }
};

