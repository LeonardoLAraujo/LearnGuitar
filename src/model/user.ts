export type UserObject = {
    id: number,
    username: string,
    email: string,
    photo?: string
}

export class User {
    
    private _id: number;
    private _username: string = "";
    private _email: string = "";
    private _photo: string | undefined = "";

    constructor(user: UserObject){
        this._id = user.id;
        this._username = user.username;
        this._email = user.email;
        this._photo = user.photo;
    }

    public getId(){
        return this._id;
    }

    public setUsername(username: string){
        this._username = username;
    }
    public getUsername(){
        return this._username;
    }

    public getEmail(){
        return this._email;
    }

    public setPhotoUser(photoUser: string){
        this._photo = photoUser;
    }
    public getPhotoUser(){
        return this._photo;
    }

}