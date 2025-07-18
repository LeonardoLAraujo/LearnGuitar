import { PostObject } from "../type/post";

export class Post {

    private _id: number;
    private _userId: number;
    private _text: string;
    private _username: string;
    private _photoUser?: string;
    private _date: string;
    private _countComment: number;
    private _countLike: number;

    constructor(post: PostObject){
        this._id = post.id;
        this._userId = post.userId;
        this._text = post.text;
        this._username = post.username;
        this._photoUser = post.photoUser;
        this._date = post.date;
        this._countComment = post.countComment;
        this._countLike = post.countLike;
    }

    public getId(): number{
        return this._id;
    }

    public getUserId(): number{
        return this._userId;
    }

    public getText(): string{
        return this._text;
    }

    public getUsername(): string{
        return this._username;
    }

    public getPhotoUser(): string| undefined{
        return this._photoUser;
    }

    public getDate(): string{
        return this._date;
    }

    public getCountComment(): number{
        return this._countComment;
    }

    public getCountLike(): number{
        return this._countLike;
    }
}   
