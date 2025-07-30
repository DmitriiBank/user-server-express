import {PostService} from "./PostService.js";
import {PostType} from "../model/postTypes.js";
import {userService} from "../server.js";
import {User} from "../model/userTypes.js";


export class PostServiceEmbeddedImpl implements PostService {
    private posts: PostType[] = [{
        id: "1",
        userId: "1",
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

    getPostById(postId: string): PostType | null {
        return this.posts.find(post => post.id === postId) || null;
    }

    removePost(postId: string): PostType | null {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            const res = this.posts.splice(index, 1)
            return res[0]
        }
        return null
    }

    updatePost(newPostData: PostType): boolean {
        const index = this.posts.findIndex(post => post.id === newPostData.id);
        if (index !== -1) {
            this.posts[index] = newPostData
            return true
        }
        return false
    }

    getPostsByUserName(userName: string): PostType[]{
        const users = userService.getAllUsers();
        const user = Object.values(users).find(user => user.userName === userName);
        if (!user)
            return []
        return this.posts.filter(post => post.userId == user.id.toString());
    }
};

