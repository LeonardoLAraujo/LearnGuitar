import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import "../components/l-card-video";
import "../components/l-create-video";
import LCreateVideo from '../components/l-create-video';
import { Service } from '../server/service';
import { VideoObject } from '../type/video';
import { Video } from '../model/video';
import { LitPlayerYoutube } from 'lit-player-youtube';
import { until } from 'lit/directives/until.js';
import "../components/l-loading";

@customElement('l-video')
export default class LVideo extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .video{
                padding-top: 4rem;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .video__background{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 400px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                position: relative;
            }

            .background__shadow{
                position: absolute;
                background-color: #000000b5;
                width: 100%;
                height: 100%;
            }

            .backgrounnd__detail{
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 80%;
                position: relative;
                z-index: 1;
                color: #fff;
            }

            .backgrounnd__detail button{
                background-color: var(--orange);
                border: none;
                color: #fff;
                font-family: PoppinsLight;
                padding: 0.5rem;
                width: 30%;
                font-size: 18px;
                position: absolute;
                right: 0;
                cursor: pointer;
            }

            .backgrounnd__detail button:hover{
                background-color: var(--dark-orange);
            }

            .backgrounnd__detail p{
                margin: 0em;
                font-size: 16px;
                line-height: 1.3;
            }

            .background__search{
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
            }

            .background__search ecv-icon{
                position: absolute;
                background-color: var(--dark-blue);
                border-radius: 50%;
                padding: 0.5rem;
                left: 10px;
                cursor: pointer;
            }

            .background__search input{
                padding: 1rem;
                width: 100%;
                font-size: 18px;
                font-family: PoppinsRegular;
                padding-left: 60px;
                outline: none;
                border: none;
            }

            .background__search input::placeholder{
                font-family: PoppinsItalic;
                color: gray;
            }

            h1{
                margin: 0;
                padding: 0;
                font-size: 50px;
            }

            .video__card{
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }

            .modalVideo{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 14;
            }

            .modalVideo__shadow{
                width: 100%;
                background-color: #000000da;
                position: absolute;
                height: 100%;
            }

            .modalVideo__player{
                width: 97%;
                height: 52%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 1;
            }

            .player__close{
                background-color: #fff;
                padding: 0.3rem;
                border-radius: 50%;
                align-self: flex-end;
                cursor: pointer;
            }

            .player__close:hover{
                background-color: #c0c0c0;
            }

            @media (min-width: 765px){
                h1{
                    font-size: 70px;
                }

                .backgrounnd__detail p{
                    font-size: 18px;
                }

                .modalVideo__player{
                    width: 60%;
                    height: 60%;
                }
            }
        `;
    }

    private _body = document.querySelector("body");
    private _service: Service = new Service;

    private _listVideos: Array<Video> = [];

    @query(".modalVideo")
    private _containerModalVideo!: HTMLDivElement;

    @query(".video")
    private _containerVideo!: HTMLDivElement;

    @query("l-create-video")
    private _lCreateVideo!: LCreateVideo;

    @query(".player__video")
    private _litPlayerYoutube!: LitPlayerYoutube;

    private closeModalVideo(): void{
        this._containerModalVideo.style.display = "none";
        this._body!.style!.overflowY = "auto";
        this._litPlayerYoutube.pauseVideo();
    }

    private openVideo(sourceVideoYoutube: string): void{
        this._containerModalVideo.style.display = "flex";
        this._body!.style!.overflowY = "hidden";    

        this._litPlayerYoutube.video = sourceVideoYoutube;
        this._litPlayerYoutube.hiddenContainerPlayerVideoAndShowPauseVideo();

        this.requestUpdate();
    }

    private closeRegisterVideo(): void{
        this._containerVideo.style.display = "flex";
        this._lCreateVideo.hiddenModal();
    }

    private openRegisterVideo(): void{
        this._containerVideo.style.display = "none";
        this._lCreateVideo.showModal();
    }

    private async generateCardVideo(): Promise<Array<TemplateResult>>{
        const listVideoObject: Array<VideoObject> = await this._service.allVideo();
        const listVideo: Array<Video> = [];

        listVideoObject.map((video: VideoObject) => {
            listVideo.push(new Video(video));
        });

        this._listVideos = listVideo;

        return this._listVideos.map((video: Video) => html`<l-card-video .video=${video} @click=${() => {this.openVideo(video.getSourceVideoYoutube())}}></l-card-video>`)
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .video__background{
                    background-image: url("https://previews.123rf.com/images/romanzaiets/romanzaiets2006/romanzaiets200603439/148723299-man-s-hands-playing-acoustic-guitar-authentic-background.jpg");
                }
            </style>
            <l-create-video .onPressedCloseButton=${() => {this.closeRegisterVideo()}}></l-create-video>
            <div class="video">
                <div class="video__background">
                    <div class="background__shadow"></div>
                    <div class="backgrounnd__detail">
                        <button @click=${this.openRegisterVideo}>Enviar Vídeo</button>
                        <h1>Vídeos</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                             a type specimen book.</p>
                        <form class="background__search">
                            <ecv-icon .icon=${IconTypes.Search} .iconStyle=${{color: "#fff", size: "25px"}}></ecv-icon>
                            <input type="text" placeholder="Procure por um Vídeo">
                        </form>
                    </div>
                </div>
                <div class="video__card">
                    ${until(this.generateCardVideo(), html`<l-loading></l-loading>`)}
                </div>
            </div>
            <div class="modalVideo">
                <div class="modalVideo__shadow"></div>
                <div class="modalVideo__player">
                    <div class="player__close" @click=${this.closeModalVideo}>
                        <ecv-icon .icon=${IconTypes.Close} .iconStyle=${{color: "var(--dark-green)", size: "30px"}}></ecv-icon>
                    </div>
                    <lit-player-youtube class="player__video"></lit-player-youtube>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-video': LVideo
   }
}