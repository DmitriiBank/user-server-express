import {PostService} from "./PostService.js";
import {PostType} from "../model/postTypes.js";
import {users} from "./UserServiceEmbeddedImpl.js";


export class PostServiceEmbeddedImpl implements PostService {
    private posts: PostType[] = [{
        id: "1",
        userId: "1",
        title: "Title",
        text: "Some text"
    }]

    addPost(post: PostType): boolean {
        if (this.posts.findIndex((p: PostType) => p.id === post.id) === -1) {
            this.posts.push(post)
            return true
        }
        return false
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

    getPostsByUserName(userName: string): PostType | null {
        const user = users.find(user => user.userName === userName);
        if (user)
            return this.posts.find(post => post.userId === user.id.toString()) || null;
        return null
    }
};

