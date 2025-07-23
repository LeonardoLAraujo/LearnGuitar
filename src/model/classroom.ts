import { ClassroomObject } from "../type/classroom";

export class Classroom {
    private _id: number;
    private _categoryId: number;
    private _title: string;
    private _sourceVideo: string;
    private _description: string;
    private _sourcePdf?: string;

    constructor(classroom: ClassroomObject){
        this._id = classroom.id;
        this._categoryId = classroom.category_id;
        this._title = classroom.title;
        this._sourceVideo = classroom.sourceVideo;
        this._description = classroom.description;
        this._sourcePdf = classroom.sourcePdf;
    }

    public getId(): number{
        return this._id;
    }

    public getCategoryId(): number{
        return this._categoryId;
    }

    public getTitle(): string{
        return this._title;
    }

    public getSourceVideo(): string{
        return this._sourceVideo;
    }

    public getDescription(): string{
        return this._description;
    }

    public getSourcePdf(): string | undefined{
        return this._sourcePdf;
    }

}