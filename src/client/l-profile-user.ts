import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PostObject } from '../type/post';
import { Service } from '../server/service';
import { Post } from '../model/post';
import { until } from 'lit/directives/until.js';
import "../components/l-loading";
import { VideoObject } from '../type/video';
import { Video } from '../model/video';
import "../components/l-card-video";
import "../components/l-card-post";
import { User, UserObject } from '../model/user';
import { ifDefined } from 'lit/directives/if-defined.js';
import "../components/l-modal-my-follow";
import { LearnGuitar } from '../learn-guitar';

@customElement('l-profile-user')
export default class LProfileUser extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .profile,
            .profile__user{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .profile{
                padding: 6rem 1rem 0rem 1rem;
            }

            .profile__user img{
                width: 50%;
                border-radius: 50%;
            }

            .user__information{
                display: flex;
                flex-direction: column;
                align-self: flex-start;
            }

            .information__user{
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            p{
                margin: 0;
            }

            .user__label{
                color: var(--light-gray);
                font-family: PoppinsBold;
            }

            .user__text{
                font-size: 18px;
                font-family: PoppinsLight;
            }

            .profile__posts,
            .profile__videos{
                width: 100%;
                margin-top: 2rem;
                height: 500px;
            }

            .profile__videos{
                margin-top: 6rem;
            }

            .profile__posts h1,
            .profile__videos h1{
                border-bottom: 1px solid var(--light-green);
                margin: 0;
                font-family: PoppinsBold;
                color: var(--light-gray);
            }

            .posts__card{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 8px;
                margin-top: 1rem;
                height: 100%;
                overflow-y: auto;
                margin-bottom: 1rem;
            }

            .posts__card::-webkit-scrollbar{
                background-color: #fff;
                color: #fff;
                width: 13px;
            }

            .posts__card::-webkit-scrollbar-thumb{
                background-color: var(--light-blue);
                border-radius: 0px;
            }

            .user__information button{
                margin-top: 1rem;
                cursor: pointer;
                font-size: 18px;
                font-family: PoppinsLight;
                width: 120px;
                border: none;
                color: #fff;
            }

            .information__edit{
                background-color: var(--orange);
            }

            .information__edit:hover{
                background-color: var(--dark-orange);
            }

            .information__add{
                background-color: var(--dark-green);
            }

            .information__add:hover{
                background-color: var(--light-green);
            }

            .information__follow{
                background-color: var(--light-gray);
            }

            .information__follow:hover{
                background-color: var(--light-gray-opacity);
            }

            @media (min-width: 764px){
                .profile__user img{
                    width: 40%;
                }
            }

            @media (min-width: 1024px){
                .profile{
                    padding-top: 7rem;
                }

                .profile__user{
                    width: 100%;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .profile__user img{
                    width: 400px;
                    cursor: pointer;
                }
            }
        `;
    }

    private _user = JSON.parse(localStorage.getItem("user") as string).user;
    private _username = sessionStorage.getItem("username") == undefined ? this._user._username : sessionStorage.getItem("username");
    private _service: Service = new Service;
    private _listVideo: Array<Video> = [];
    private _listPost: Array<Post> = [];

    @state()
    userCurrent!: User;

    @state()
    private _isMyFollowers: boolean = false;

    @state()
    private _myFollowers: Array<any> = []; 

    @state()
    private _myFollowing: Array<any> = []; 

    @state()
    private _countMyFollowing: number = 0;

    @property({attribute: false})
    referenceLearnGuitar!: LearnGuitar;

    override connectedCallback(): void {
        super.connectedCallback();

        this.referenceLearnGuitar.socket.on("following", async (result: any) => {
            this._myFollowing = result;

            console.log(this._myFollowing);

            this.requestUpdate();
        });
    }

    protected override async firstUpdated(): Promise<void> {
        this._service.userForUsername(this._username as string).then((result: UserObject) => {
           this.userCurrent = new User(result);
        });

        this._myFollowers = await this.getMyFollowers();
        this._myFollowing = await this.getFollowing();

        this._countMyFollowing = this._myFollowing.length;

        this._myFollowing.map((following: any) => {
            if(following.user_friend_id == this.userCurrent.getId()){
                this._isMyFollowers = true;
            }
        });
    }

    private async getMyFollowers(): Promise<Array<any>>{
        const myFollow = await this._service.getMyFollowers(this._user._id);

        return myFollow;
    }

    private async getFollowing(): Promise<Array<any>>{
        const myFollowing = await this._service.getMyFollowing(this._user._id);

        return myFollowing;
    }

    private generateInformationUser(label: string, value: string){
        return html`
            <div class="information__user">
                <p class="user__label">${label}</p>
                <p class="user__text">${value}</p>
            </div>
        `;
    }

    private async getMyPosts(): Promise<TemplateResult[]>{
        try{
            const listPostObject: Array<PostObject> = await this._service.myPost(this.userCurrent.getId()); 
            const listPosts: Array<Post> = [];

            listPostObject.map((post: PostObject) => {
                listPosts.push(new Post(post));
            });

            this._listPost = listPosts;
        }catch(error){
            console.log(`Error: ${error}`);
        }

        return this._listPost.map((post: Post) => html`<l-card-post .post=${post}></l-card-post>`);
    }   

    private async getMyVideos(): Promise<TemplateResult[]>{
        try{
            const listVideosObject: Array<VideoObject> = await this._service.myVideo(this.userCurrent.getId());
            const listVideos: Array<Video> = [];

            listVideosObject.map((video: VideoObject) => {
                listVideos.push(new Video(video));
            });

            this._listVideo = listVideos;
        }catch(error){
            console.log(`Error: ${error}`);
        }
    
        return this._listVideo.map((video: Video) => html`<l-card-video .video=${video}></l-card-video>`);
    }

    private addUser(): void{
        this._service.addUser(this._user._id, this.userCurrent?.getId());

        this._service.getMyFollowing(this._user._id).then((result) => {
            result.map((following: any) => {
                if(following.user_friend_id == this.userCurrent.getId()){
                    this._isMyFollowers = true;
                }
            });

            this._countMyFollowing = result.length;
            
            this.referenceLearnGuitar.socket.emit("following", result);
        });
    }

    private async unfollow(){
        this._service.unFollow(this._user._id).then((_result) => {

            this._isMyFollowers = false;

            this._service.getMyFollowing(this._user._id).then((result) => {
                this._countMyFollowing = result.length;
                this.referenceLearnGuitar.socket.emit("following", result);
            });

        });

        

        
    }   

    protected override render(): TemplateResult{
        return html`
           
            <div class="profile">
                <!-- <l-modal-my-follow></l-modal-my-follow> -->
                <div class="profile__user">
                    <img src=${ifDefined(this._user._photo == null ? "https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg" : this.userCurrent?.getPhotoUser())}>
                    <div class="user__information">
                        ${this.generateInformationUser("Nome", this.userCurrent?.getUsername())}
                        ${this.generateInformationUser("Seguindo", `${this._countMyFollowing}`)}
                        ${this.generateInformationUser("Seguidores", `${this._myFollowers?.length}`)}
                        ${this._user._id == this.userCurrent?.getId() ? 
                            html`<button class="information__edit">Editar</button>` 
                            : this._isMyFollowers == true ? html`<button class="information__follow" @click=${this.unfollow}>Seguindo</button>` 
                            : html`<button class="information__add" @click=${this.addUser}>Adiconar</button>`}
                    </div>
                </div>
                <div class="profile__posts">
                    <h1>Postagens</h1>
                    <div class="posts__card">
                        ${until(this.getMyPosts(), html`<l-loading></l-loading>`)}
                    </div>
                </div>
                <div class="profile__videos">
                    <h1>Vídeos</h1>
                    <div class="posts__card">
                        ${until(this.getMyVideos(), html`<l-loading></l-loading>`)}
                    </div>
                </div>
            </div>
             
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-profile-user': LProfileUser
   }
}