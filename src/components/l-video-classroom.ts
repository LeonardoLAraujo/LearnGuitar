import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import "./l-button-classroom";
import "lit-player-youtube";
import { Matter } from '../type/matter';
import LButtonClassroom from './l-button-classroom';
import "./l-pdf";
import { LitPlayerYoutube } from 'lit-player-youtube';

@customElement('l-video-classroom')
export default class LVideoClassroom extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
            }

            .videoClassroom{
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .videoClassroom lit-player-youtube,
            .videoClassroom l-pdf{
                height: 600px;
            }

            .videoClassroom__button{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 5px;
                background-color: var(--light-gray);
                padding: 1rem;
                width: calc(100% - 32px);
            }

            .videoClassroom{
                margin-top: -9px;
            }

            @media (min-width: 1200px){
                .videoClassroom__button{
                    gap: 50px;
                }
            }
        `;
    }

    @state()
    private _isVideo: boolean = false;

    @query("lit-player-youtube")
    public litPlayerYoutube!: LitPlayerYoutube;

    @queryAll("l-button-classroom")
    private _containerAllButtonClassroom!: NodeListOf<LButtonClassroom>;

    @property({attribute: false})
    classroom!: Matter;

    protected override firstUpdated(): void {
        setTimeout(() => {
            this._containerAllButtonClassroom[0]?.currentButton();
        }, 1);
    }

    private resetButtonContainer(): void{
        this._containerAllButtonClassroom.forEach((button: LButtonClassroom) => {
            button.resetButton();
        });
    }

    private alterForVideo(): void{
        this.resetButtonContainer();
        this._isVideo = false;

        this._containerAllButtonClassroom[0].currentButton();
    }

    private alterForImage(): void{
        this.resetButtonContainer();
        this._isVideo = true;

        this._containerAllButtonClassroom[1].currentButton();
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .videoClassroom lit-player-youtube{
                    display: ${this._isVideo ? "none" : "flex"};
                }

                .videoClassroom l-pdf{
                    display: ${!this._isVideo ? "none" : "flex"};
                }
            </style>
            <div class="videoClassroom">
                <lit-player-youtube video=${this.classroom?.sourceVideo}></lit-player-youtube>
                <l-pdf sourcePdf="https://www.objetivas.com.br/arquivos/2017/09/Qh4yWkBpYm_anexo.pdf"></l-pdf>
                <div class="videoClassroom__button">
                    <l-button-classroom icon=${IconTypes.Youtube} text="Vídeo" @click=${this.alterForVideo}></l-button-classroom>
                    <l-button-classroom icon=${IconTypes.PictureAsPDF} text="PDF" @click=${this.alterForImage}></l-button-classroom>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-video-classroom': LVideoClassroom
   }
}