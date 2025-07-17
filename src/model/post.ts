import { PostObject } from "../type/post";

export class Post {

    private _id: number;
    private _user_id: number;
    private _text: string;
    private _username: string;
    private _photoUser?: string;
    private _date: string;

    constructor(post: PostObject){
        this._id = post.id;
        this._user_id = post.user_id;
        this._text = post.text;
        this._username = post.username;
        this._photoUser = post.photoUser;
        this._date = post.date;
    }

    public getId(): number{
        return this._id;
    }

    public getUserId(): number{
        return this._user_id;
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

}