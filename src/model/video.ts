import { VideoObject } from "../type/video";

export class Video {

    private _id: number;
    private _title: string;
    private _sourceVideoYoutube: string;
    private _description?: string;
    private _tumblr?: string;

    constructor(video: VideoObject){
        this._id                    = video.id;
        this._title                 = video.title;
        this._sourceVideoYoutube    = video.sourceVideoYoutube;
        this._description           = video.description;
        this._tumblr                = video.tumblr;
    }

    public getId(): number{
        return this._id;
    }

    public getTitle(): string{
        return this._title;
    }

    public getSourceVideoYoutube(): string{
        return this._sourceVideoYoutube;
    }

    public getDescription(): string | undefined{
        return this._description;
    }

    public getTumblr(): string | undefined{
        return this._tumblr;
    }
}