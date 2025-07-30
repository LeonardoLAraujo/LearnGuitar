import { ECVIcon, IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { Post } from '../model/post';
import { Service } from '../server/service';
import { CommentObject } from '../type/comment';
import { Comment } from '../model/comment';
import { LPost } from '../client/l-post';
import { PostObject } from '../type/post';
import { Util } from '../util/util';
import { until } from 'lit/directives/until.js';
import "./l-loading";

const IMAGE_DEFAULT = "https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg";

@customElement('l-card-post')
export default class LCardPost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            p{
                margin: 0;
            }

            .cardPost{
                display: flex;
                flex-direction: column;
                width: calc(100% - 32px);
                background-color: #fff;
                padding: 1rem;
                gap: 10px;
                max-width: 668px;
            }

            .cardPost__user{
                display: flex;
                gap: 15px;
            }

            .user__image{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
            }

            .information__name{
                font-family: PoppinsBold;
            }

            .information__date{
                color: var(--light-gray);
                font-size: 14px;
            }

            .cardPost__description{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .description__text{
                font-size: 15px;
                text-align: left;
            }

            .description__image{
                width: 100%;
                display: flex;
                overflow: auto;
                gap: 5px;
            }

            .description__image img{
                width: 100%;
            }

            .cardPost__button{
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-top: 1px solid #000;
                padding-top: 15px;
            }

            ecv-icon{
                cursor: pointer;
            }

            .text__more{
                color: var(--dark-blue);
                cursor: pointer;
                font-family: PoppinsBold;
            }

            .cardPost__response{
                display: flex;
                flex-direction: column;
                gap: 10px;
                background-color: #fff;
                border-top: 8px solid var(--white);
                padding-top: 1rem;
            }

            .response__form{
                display: flex;
                gap: 10px;
            }

            .response__form input{
                width: 100%;
                font-size: 17px;
                padding: 0.2rem;
                font-family: PoppinsRegular;
                outline: none;
                border: 1px solid var(--light-gray);
                border-radius: 5px;
                margin-bottom: 0.5rem;
          
            }

            .response__form button{
                font-size: 18px;
                font-family: PoppinsLight;
                cursor: pointer;
                background-color: var(--orange);
                color: #fff;
                border: none;
                border-radius: 3px;
                height: 33px;
            }

            .response__from button:hover{
                background-color: var(--dark-orange);
            }

            .response__comment{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .comment__detail,
            .detail__button{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: fit-content;
            }

            .detail__button{
                gap: 10px;
            }

            .button__chat,
            .button__favorite{
                position: relative;
                cursor: pointer;
                height: fit-content;
            }

            .button__chat div{
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                position: absolute;
                width: 5px;
                height: 5px;
                background-color: var(--dark-blue);
                padding: 0.5rem;
                border-radius: 50%;
                bottom: 10px;
                left: 15px;
                font-size: 12px;
            }

            .detail__user{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            @media (min-width: 1024px){
                .cardPost{
                    width: 700px;
                }

                .description__image img{
                    width: 490px;
                }

                .cardPost__description{
                    width: fit-content;
                }
            }
        `;
    }

    private service: Service = new Service;

    private _user = JSON.parse(localStorage.getItem("user") as string)?.user;

    @state()
    private _isReadMore: boolean = false;

    @state()
    private _isShowComment: boolean = false;

    private _allComment: Array<Comment> = [];

    @state()
    private _isLiked: boolean = false;

    @state()
    private _isLikedComment: boolean = false;

    @query(".form__input")
    private _formInput!: HTMLInputElement;

    @query(".button__like")
    private _buttonLike!: ECVIcon;

    @queryAll(".like__comment")
    private _buttonLikeComment!: NodeListOf<ECVIcon>;

    @property({attribute: false})
    referencePost!: LPost;

    @property({attribute: false})
    post!: Post;

    override connectedCallback(): void {
        super.connectedCallback();

        const comments: Array<Comment> = [];

        this.referencePost?.referenceLearnGuitar?.socket.on("comment", (result: Array<CommentObject>) => {
            result.map((comment: CommentObject) => {
                comments.push(new Comment(comment));
            });

            this._allComment = Util.alterPositionArrayComment(comments);

            this.requestUpdate();
        });
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        if(this._user != null){
             this.service.userLikePostCurrent(this.post.getId(), this._user?._id).then((result) => {
                if(result.length > 0){
                    this._buttonLike.filled = true;
                    this._isLiked = true;
                }
            });
        }
    }

    private createComment(e: MouseEvent){
        e.preventDefault();

        if(this._formInput.value.trim() == ""){
            return;
        }

        this.service.createComment(this.post.getId(), this._user._id, this.post.getUserId(), this._formInput.value).then((result) => {
            console.log(result);
        });

        this._formInput.value = "";

        this.service.allComment(this.post.getId()).then((result: Array<CommentObject>) => {
            this.referencePost.referenceLearnGuitar.socket.emit("comment", result);
        });
    }

    private openComment(){
        this._isShowComment = !this._isShowComment

        if(!this._isShowComment){
            this._allComment = [];
        }
    }

    private likedPost(){
        if(this._isLiked){
            this._buttonLike.filled = true;

            this.service.likePost(this.post.getId(), this._user._id).then((result) => {
                console.log(result);
            });
        }else{
            this._buttonLike.filled = false;

            this.service.likedPost(this.post.getId(), this._user._id).then((result) => {
                console.log(result);
            });
        }

        
        this.service.allPost().then((result: Array<PostObject>) => {
            this.referencePost.referenceLearnGuitar.socket.emit("posts", result);
        });
    }

    private likeComment(e: MouseEvent, index: number){
        e.preventDefault();

        if(this._isLikedComment){
            this._buttonLikeComment[index].filled = true;
            
            this.service.likeComment(this._allComment[index].getId(), this._user._id).then((result) => {
                console.log(result);
            });

        }else{
            this._buttonLikeComment[index].filled = false;

            this.service.likedComment(this._allComment[index].getId(), this._user._id).then((result) => {
                console.log(result);
            });
        }

        this.service.allComment(this.post.getId()).then((result: Array<CommentObject>) => {
            this.referencePost.referenceLearnGuitar.socket.emit("comment", result);
        });
    }

    private likeCommentCurrentIconFilled(index: number){
       if(this._user != null){
            this.service.userLikeCommentCurrent(this._allComment[index].getId(), this._user._id).then((result) => {
                if(result.length > 0){
                    this._buttonLikeComment[index].filled = true;
                }else{
                    this._buttonLikeComment[index].filled = false;
                }
            });
       }
    }

    private async generateCommentPost(): Promise<TemplateResult[]>{
        const comments: Array<Comment> = [];

        const listComment = await this.service.allComment(this.post.getId());

        listComment.map((comment: CommentObject) => {
            comments.push(new Comment(comment));
        });

        this._allComment = Util.alterPositionArrayComment(comments);

        return this._allComment.map((comment: Comment, index: number) => html`<div class="comment__detail">
                                                                    <div class="detail__user">
                                                                        <div class="cardPost__user">
                                                                            <div class="user__image" @click=${this.goToUserProfile}></div>
                                                                            <div class="user__information">
                                                                                <p class="information__name">${comment.getUsername()}</p>
                                                                                <p class="information__date">${comment.getDate()}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="cardPost__description">
                                                                            <p class="description__text">   
                                                                                ${comment.getText().length <= 1300 ? 
                                                                                    html`${comment.getText()}` : 
                                                                                    html`
                                                                                        ${this._isReadMore ? html`${comment.getText()}` : html`${comment.getText().substring(0, 1300)}`}
                                                                                        <p class="text__more" @click=${() => {this._isReadMore = !this._isReadMore}}>
                                                                                            ${this._isReadMore ? html`...Ler Menos` : html`Ler Mais...`}
                                                                                        </p>
                                                                                    `
                                                                                }   
                                                                            </p>
                                                                            <div class="description__image">
                                                                                <!-- <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                                                                                <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                                                                                <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                                                                                <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                                                                                <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                                                                                <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg"> -->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="detail__button">   
                                                                        ${this.likeCommentCurrentIconFilled(index)}
                                                                        <div class="button__favorite" @click=${(e: MouseEvent) => {this._isLikedComment = !this._isLikedComment; this.likeComment(e, index)}}>
                                                                            <ecv-icon class="button__like like__comment" .icon=${IconTypes.Favorite}></ecv-icon>
                                                                            <p>${comment.getCountLike()} like</p>
                                                                        </div>
                                                                       <div class="button__chat">
                                                                            <div>0</div>
                                                                            <ecv-icon .icon=${IconTypes.Chat} ></ecv-icon>
                                                                        </div>
                                                                    </div>
                                                                </div>`);
    }

    private goToUserProfile(){
        sessionStorage.setItem("username", this.post.getUsername());
        this.referencePost.referenceLearnGuitar.router.goto("/profile");
    }

    private generatePostUser(username: string, date: string | undefined, text: string,): TemplateResult {
        return html`<div class="cardPost__user">
                        <div class="user__image" @click=${this.goToUserProfile}></div>
                        <div class="user__information">
                            <p class="information__name">${username}</p>
                            <p class="information__date">${date}</p>
                        </div>
                    </div>
                    <div class="cardPost__description">
                        <p class="description__text">   
                            ${text.length <= 1300 ? 
                                html`${text}` : 
                                html`
                                    ${this._isReadMore ? html`${text}` : html`${text.substring(0, 1300)}`}
                                    <p class="text__more" @click=${() => {this._isReadMore = !this._isReadMore}}>
                                        ${this._isReadMore ? html`...Ler Menos` : html`Ler Mais...`}
                                    </p>
                                `
                            }   
                        </p>
                        <div class="description__image">
                            <!-- <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                            <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                            <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                            <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                            <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                            <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg"> -->
                        </div>
                    </div>`;
                    
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .user__image{
                    background-image: url(${this.post?.getPhotoUser() == null ? IMAGE_DEFAULT : this.post?.getPhotoUser()});
                }
            </style>
            <div class="cardPost">
                ${this.generatePostUser(this.post?.getUsername(), this.post?.getDate(), this.post?.getText())}
                <div class="cardPost__button">
                    <div class="button__favorite">
                        <ecv-icon class="button__like" .icon=${IconTypes.Favorite} @click=${() => {this._isLiked = !this._isLiked; this.likedPost()}}></ecv-icon>
                        <p>${this.post?.getCountLike()} like</p>
                    </div>
                    <div class="button__chat" @click=${this.openComment}>
                        <div>${this.post?.getCountComment()}</div>
                        <ecv-icon .icon=${IconTypes.Chat} ></ecv-icon>
                    </div>
                </div>
                ${this._isShowComment ? html`
                    <div class="cardPost__response">
                        <form class="response__form" @submit=${this.createComment}>
                            <input class="form__input" type="text" placeholder="Escreva seu comentário">
                            <button>Enviar</button>
                        </form>
                        <div class="response__comment">   
                            ${until(this.generateCommentPost(), html`<l-loading></l-loading>`)}
                        </div>
                    </div>` : html``}
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-card-post': LCardPost
   }
}