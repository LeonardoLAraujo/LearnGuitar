import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import "../components/l-card-post";
import "../components/l-button-create-post";
import "../components/l-create-post";
import LCreatePost from '../components/l-create-post';
import { Service } from '../server/service';
import { Post, PostObject } from '../model/post';

@customElement('l-post')
export default class LPost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .post{
                padding-top: 5rem;
                position: relative;
            }

            .post h1{
                font-family: PoppinsBold;
                text-align: center;
            }

            .post__card{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 10px;
                padding-bottom: 10px;
                gap: 10px;
            }

            l-button-create-post{
                position: fixed;
                right: 10px;
                bottom: 10px;
            }

            l-create-post{
                display: none;
            }

            @media (min-width: 764px){
                .post h1{
                    text-align: left;
                    margin-left: 2rem;
                }
            }
        `;
    }

    constructor(){
        super();
    }

    private body = document.querySelector("body");
    private service: Service = new Service;

    @state()
    private _listAllPost: Array<Post> = [];

    @state()
    private _isFinishGetAllPostObject: boolean = false;

    @query("l-create-post")
    private _lCreatePost!: LCreatePost;

    private async getAllPost(): Promise<void>{
        this.service.allPost().then((result: Array<PostObject>) => {
            console.log(result);
            result.map((post: PostObject) => {
                this._listAllPost.push(new Post(post));
            });

            console.log(this._listAllPost);

            this._isFinishGetAllPostObject = true;
        })
    }

    private generatePost(): Array<TemplateResult> {
        this.getAllPost();
        
        return this._listAllPost.map((post: Post) => html` <l-card-post .post=${post}></l-card-post>`);
    }

    private openCreatePost(): void{
        this.body!.style!.overflowY = "hidden";
        this._lCreatePost.style.display = "flex";
    }

    protected override render(): TemplateResult{
        return html`
            <div class="post">
                <h1>Postagens</h1>
                <div class="post__card">
                    ${this.generatePost()}
                </div>
                <l-create-post></l-create-post>
                <l-button-create-post @click=${this.openCreatePost}></l-button-create-post>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-post': LPost
   }
}