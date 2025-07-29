import { CommentObject } from "../type/comment";
import { PostObject } from "../type/post";

export class Service {

    public async allUsers(){
        const request = await fetch('/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const response = await request.json();

        return response;
    }

    public async createAccount(username: string, email: string ,password: string){
        const request = await fetch(`/createUser`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username, email: email, password: password})
        });

        const response = await request.json();

        return response;
    }

    public async loginUser(email: string, password: string){
         const request = await fetch('/loginUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });

        const response = await request.json();

        return response;
    }

    public async createPost(userId: number, text: string){  
        const request = await fetch("/createPost", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, text: text})
        });

        const response = await request.json();

        return response;
    }

    public async allPost(): Promise<PostObject[]>{
        const request = await fetch("/allPost", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const response = await request.json();

        return response;
    }

    public async createComment(postId: number, userId: number, responsePostUserId: number, comment: string){
        const request = await fetch("/createComment", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId, userId: userId, responsePostUserId: responsePostUserId, comment: comment})
        });

        const response = await request.json();

        return response;
    }

    public async allComment(postId: number): Promise<CommentObject[]>{
        const request = await fetch("/allComment", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId})
        });

        const response = await request.json();

        return response;
    }

    public async likePost(postId: number, userId: number){
        const request = await fetch("/likePost", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId, userId: userId})
        });

        const response = await request.json();

        return response;
    }

    public async likedPost(postId: number, userId: number){
        const request = await fetch("/likedPost", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId, userId: userId})
        });

        const response = await request.json();

        return response;
    }

    public async userLikePostCurrent(postId: number, userId: number){
        const request = await fetch("/userLikePostCurrent", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId, userId: userId})
        });
        const response = request.json();

        return response;
    }

    public async likeComment(commentId: number, userId: number){
        const request = await fetch("/likeComment", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId: commentId, userId: userId})
        });

        const response = await request.json();

        return response;
    }

     public async likedComment(commentId: number, userId: number){
        const request = await fetch("/likedComment", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId: commentId, userId})
        });

        const response = await request.json();

        return response;
    }

    public async userLikeCommentCurrent(commentId: number, userId: number){
        const request = await fetch("/userLikeCommentCurrent", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId: commentId, userId: userId})
        });
        const response = request.json();

        return response;
    }

    public async createClassroom(category: number, title: string, sourceVideo: string, description: string){
        const request = await fetch("/createClassroom", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({category: category, title: title, sourceVideo: sourceVideo, description: description})
        });

        const result = await request.json();

        return result;
    }   

    public async allClassroom(idCategory: number) {
        const request = await fetch("/allClassroom", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: idCategory})
        });

        const result = await request.json();

        return result;
    }

    public async registerVideo(title: string, description: string, sourceVideoYoutube: string, tumblr?: string){
        const request = await fetch("/registerVideo", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description, sourceVideoYoutube: sourceVideoYoutube, tumblr: tumblr})
        });

        const response = await request.json();

        return response;
    }

    public async allVideo(){
        const request = await fetch("/allVideo", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const response = await request.json();

        return response;
    }
}