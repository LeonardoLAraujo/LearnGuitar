import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import "./l-card-classroom";
import LCardClassroom from './l-card-classroom';
import "./l-video-classroom";
import LVideoClassroom from './l-video-classroom';
import { Classroom } from '../model/classroom';
import { ClassroomObject } from '../type/classroom';

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
                padding-top: 1rem;
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

            .backButton{
                max-width: 200px;
                width: 100%;
                margin: 20px 30px;
                cursor: pointer;
                background-color: var(--orange);
                color: #fff;
                border: none;
                padding: 0.5rem;
                font-family: PoppinsLight;
                font-size: 18px;
            }

            .backButton:hover{
                background-color: var(--dark-orange);
            }

            @media (min-width: 1200px){
                .card__module{
                    display: none;
                }

                .classroom__classes{
                    width: auto;
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

    @state()
    private loading: boolean = false;

    @query("l-video-classroom")
    LVideoClassroom!: LVideoClassroom;

    @query(".classroom")
    containerClasroom!: HTMLDivElement;

    @queryAll(".card")
    private _containerAllCard!: NodeListOf<LCardClassroom>;

    @queryAll(".card__module")
    cardModule!: NodeListOf<HTMLDivElement>;

    @state()
    listClassroom: Array<Classroom> = [];

    @property({type: Number})
    indexClassroom: number = 0;

    protected override firstUpdated(): void {
        this.getClassroom();

        this._containerAllCard[0]?.click();
    }

    private backPage(): void{
        window.location.reload();
    }

    private getClassroom(){ 
        const list = JSON.parse(sessionStorage.getItem("classroom") as string) as Array<ClassroomObject>;

        list.map((classroom: ClassroomObject) => {
            this.listClassroom.push(new Classroom(classroom));
        });

        if(list.length == 0){
            this.containerClasroom.style.display = "none";
        }else{
            this.containerClasroom.style.display = "flex";
        }

        this.loading = true;

        this.LVideoClassroom.classroom = this.listClassroom[this._indexCard];

        this.LVideoClassroom.litPlayerYoutube?.setUrlVideo(this.listClassroom[this._indexCard]?.getSourceVideo());
        this.LVideoClassroom.litPlayerYoutube?.hiddenContainerPlayerVideoAndShowPauseVideo();
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

            this.cardModule[index].insertAdjacentHTML("afterbegin", `<l-video-classroom class="connectionModule" .classroom=${this.listClassroom[this._indexCard]}></l-video-classroom>`);

            this.connectionModule?.remove();
        }else{
            this.LVideoClassroom.classroom = this.listClassroom[this._indexCard];

            this.LVideoClassroom.litPlayerYoutube?.setUrlVideo(this.listClassroom[this._indexCard]?.getSourceVideo());
            this.LVideoClassroom.litPlayerYoutube?.hiddenContainerPlayerVideoAndShowPauseVideo();
        }
    }

    private generateCards(): Array<TemplateResult> {
        return this.listClassroom.map((_classroom: Classroom, index: number) => html`<l-card-classroom class="card" index=${index} @click=${(e: MouseEvent) => {this.alterCardCurrent(e, index)}}></l-card-classroom>
                                                                    <div class="card__module"></div>`);
    }

    protected override render(): TemplateResult{
        return html`
            <button class="backButton" @click=${this.backPage}>Voltar</button>
            <div class="classroom">
                <div class="classroom__classes">
                    <h1>Aulas</h1>
                    <div class="classes__cards">
                        ${this.generateCards()} 
                    </div>
                </div>
                <div class="classroom__information">
                    <h1>${this.listClassroom[this._indexCard]?.getTitle()}</h1>
                    <p>${this.listClassroom[this._indexCard]?.getDescription()}</p>
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