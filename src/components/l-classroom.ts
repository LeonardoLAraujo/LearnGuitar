import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import "./l-card-classroom";
import { Matter } from '../type/matter';
import LCardClassroom from './l-card-classroom';
import "./l-video-classroom";
import LVideoClassroom from './l-video-classroom';

const AULA: Array<Matter> = [
    {title: "acorde Do", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {title: "aula 2", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://lirp.cdn-website.com/bdff0937/dms3rep/multi/opt/2965433d3dd18ee0367bf5a164355485-1920w.jpg", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=rO_J7IfYvl4&ab_channel=TheNoitecomDaniloGentili", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
    {title: "aula", sourceVideo: "https://www.youtube.com/watch?v=iUc1dUG7YAA&ab_channel=ViaMusical", sourceImage: "https://www.viamusical.com.br/imagens/acordes/violao/C.png", description: "Aprenda o acorde de Do"},
]

@customElement('l-classroom')
export default class LClassroom extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
            }
            
            .classroom{
                width: 100%;
                display: flex;
                padding-top: 2rem;
                justify-content: space-around;
            }

            .classroom__classes{
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 94%;
            }

            .classroom__classes h1,
            .classroom__information h1{
                font-family: PoppinsBlack;
                color: var(--navy-dark-blue);
            }

            .classroom__classes h1{
                text-align: center;
            }

            .classes__cards{
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding-bottom: 10px;
                padding-right: 10px;
                width: 100%;
            }

            p, h1{
                margin: 0;
            }

            .classroom__information{
                display: none;
                flex-direction: column;
                gap: 20px;
                width: 70%;
                height: auto;
                padding-bottom: 10px;
            }

            @media (min-width: 1200px){
                .card__module{
                    display: none;
                }

                .classroom__classes{
                    width: 13%;
                }

                .classroom__information{
                    display: flex;
                }

                .classes__cards{
                    height: calc(915px - 76px);
                    overflow-y: auto;
                    gap: 10px;
                }

                .classes__cards::-webkit-scrollbar{
                    background-color: #fff;
                    color: #fff;
                    width: 13px;
                }

                .classes__cards::-webkit-scrollbar-thumb{
                    background-color: var(--light-blue);
                    border-radius: 0px;
                }
            }
        `;
    }

    private connectionModule!: LVideoClassroom;

    @state()
    private _indexCard: number = 0;

    @query("l-video-classroom")
    LVideoClassroom!: LVideoClassroom;

    @queryAll(".card")
    private _containerAllCard!: NodeListOf<LCardClassroom>;

    @queryAll(".card__module")
    cardModule!: NodeListOf<HTMLDivElement>;

    protected override firstUpdated(): void {
        this._containerAllCard[0]?.click();
    }

    private resetAllCardClassroom(): void{
        this._containerAllCard.forEach((card: LCardClassroom) => {
            card.isCurrent = false;
        });
    }

    private alterCardCurrent(e: MouseEvent, index: number): void{
        const element: LCardClassroom = e.target as LCardClassroom;

        this.resetAllCardClassroom();

        element.isCurrent = true;
        this._indexCard = index;

        
        if(window.getComputedStyle(this.cardModule[index]).getPropertyValue("display") != "none"){
            this.connectionModule = this.shadowRoot?.querySelector(".connectionModule") as LVideoClassroom;

            this.cardModule[index].insertAdjacentHTML("afterbegin", `<l-video-classroom class="connectionModule" .classroom=${AULA[this._indexCard]}></l-video-classroom>`);

            console.log(this.connectionModule);
            this.connectionModule?.remove();
        }else{
            this.LVideoClassroom.classroom = AULA[this._indexCard];

            this.LVideoClassroom.litPlayerYoutube?.setUrlVideo(AULA[this._indexCard]?.sourceVideo);
            this.LVideoClassroom.litPlayerYoutube?.hiddenContainerPlayerVideoAndShowPauseVideo();
        }
    }

    private generateCards(): Array<TemplateResult> {
        return AULA.map((_classroom: Matter, index: number) => html`<l-card-classroom class="card" index=${index} @click=${(e: MouseEvent) => {this.alterCardCurrent(e, index)}}></l-card-classroom>
                                                                    <div class="card__module"></div>`);
    }

    protected override render(): TemplateResult{
        return html`
            <div class="classroom">
                <div class="classroom__classes">
                    <h1>Aulas</h1>
                    <div class="classes__cards">
                        ${this.generateCards()} 
                    </div>
                </div>
                <div class="classroom__information">
                    <h1>${AULA[this._indexCard].title}</h1>
                    <p>${AULA[this._indexCard].description}</p>
                    <l-video-classroom></l-video-classroom>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-classroom': LClassroom
   }
}