import { CommentObject } from "../type/comment";

export class Comment{

    private _id: number;
    private _post_id: number;
    private _user_id: number;
    private response_post_user_id: number;
    private _text: string;
    private _username: string;
    private _photoUser?: string;
    private _date: string;
    private _likeComment: number;

    constructor(comment: CommentObject){
        this._id = comment.id;
        this._post_id = comment.post_id;
        this._user_id = comment.user_id;
        this.response_post_user_id = comment.response_post_user_id;
        this._text = comment.text;
        this._username = comment.username;
        this._photoUser = comment.photoUser;
        this._date = comment.date;
        this._likeComment = comment.countLike;
    }

    public getId(): number{
        return this._id;
    }

    public getPostId(): number{
        return this._post_id;
    }

    public getUserId(): number{
        return this._user_id;
    }

    public getResponsePostUserId(): number{
        return this.response_post_user_id;
    }

    public getText(): string{
        return this._text;
    }

    public getUsername(): string{
        return this._username;
    }

    public getPhotoUser(): string | undefined{
        return this._photoUser;
    }

    public getDate(): string{
        return this._date;
    }

    public getCountLike(): number{
        return this._likeComment;
    }

}