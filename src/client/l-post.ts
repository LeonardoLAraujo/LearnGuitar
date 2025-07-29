import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import "../components/l-card-post";
import "../components/l-button-create-post";
import "../components/l-create-post";
import LCreatePost from '../components/l-create-post';
import { Service } from '../server/service';
import { Post } from '../model/post';
import { PostObject } from '../type/post';
import {LearnGuitar} from '../learn-guitar';
import { Util } from '../util/util';
import { until } from 'lit/directives/until.js';
import "../components/l-loading";

@customElement('l-post')
export class LPost extends LitElement{

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

    private _listAllPost: Array<Post> = [];

    @query("l-create-post")
    private _lCreatePost!: LCreatePost;
    
    @property({attribute: false})
    referenceLearnGuitar!: LearnGuitar;

    override connectedCallback(): void {
        super.connectedCallback();

        const socketPost: Array<Post> = [];

        this._listAllPost = [];
        
        this.referenceLearnGuitar.socket.on("posts", async (result: Array<PostObject>) => {
            result.map((post: PostObject) => {
                socketPost.push(new Post(post));
            });

            this._listAllPost = Util.alterPositionArray(socketPost);

            this.requestUpdate();
        });
    }


    private async generatePost(): Promise<TemplateResult[]> {
        const listPost: Array<PostObject> = await this.service.allPost();
        const posts: Array<Post> = [];

        listPost.map((post: PostObject) => {
            posts.push(new Post(post));
        });

        this._listAllPost = Util.alterPositionArray(posts);

        return this._listAllPost.map((post: Post) => html`<l-card-post .post=${post} .referencePost=${this}></l-card-post>`);
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
                    ${until(this.generatePost(), html`<l-loading></l-loading>`)}
                </div>
                <l-create-post .referencePost=${this}></l-create-post>
                ${JSON.parse(localStorage.getItem("user") as string)?.user != null ? html`<l-button-create-post @click=${this.openCreatePost}></l-button-create-post>` : html``}
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-post': LPost
   }
}