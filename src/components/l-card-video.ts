import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "ecv-component";
import { IconTypes } from 'ecv-component';
import { Video } from '../model/video';

@customElement('l-card-video')
export default class LCardVideo extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .card{
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding-bottom: 10px;
            }

            .card:hover{
                background-color: gray;
            }

            .card__background{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .background__shadow{
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #000000a6;
                z-index: 1;
            }

            .background__image,
            .card__background{
                width: 100%;
                height: 150px;
            }

            .card__background ecv-icon{
                position: relative;
                z-index: 1;
                background-color: #fff;
                border-radius: 50%;
            }

            .background__image{
                background-size: cover;
                background-repeat: no-repeat;
                position: absolute;
                top: 0;
            }

            .card p{
                margin: 0;
                padding: 0;
                align-self: flex-start;
                font-size: 19px;
                font-family: PoppinsLight;
            }
        `;
    }

    @property({attribute: false})
    video!: Video;

    protected override render(): TemplateResult{
        return html`
            <style>
                .background__image{
                    background-image: url(${this.video.getTumblr() == undefined ? "https://static.vecteezy.com/ti/fotos-gratis/p1/7073820-mesa-de-madeira-e-borrao-da-beleza-por-do-sol-ceu-e-montanhas-como-fundo-gratis-foto.jpg" : ""});
                }
            </style>
            <div class="card">
                <div class="card__background">
                    <div class="background__shadow"></div>
                    <ecv-icon .icon=${IconTypes.PlayArrow} .iconStyle=${{color: "var(--dark-blue)", size: "70px"}} ?filled=${true}></ecv-icon>
                    <div class="background__image"></div>
                </div>
                <p>${this.video.getTitle()}</p>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-card-video': LCardVideo
   }
}