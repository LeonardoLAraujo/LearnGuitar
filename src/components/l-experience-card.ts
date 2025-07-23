import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Classe } from '../type/classe';

@customElement('l-experience-card')
export default class LExperienceCard extends LitElement{

    static override get styles(): CSSResult{
        return css`
            p{
                margin: 0;
                padding: 0;
            }

            .card{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                gap: 15px;
                background-color: var(--dark-blue);
                color: #fff;
                padding: 1rem;
            }

            .card:hover{
                background-color: var(--light-blue);
            }

            .card__title{
                font-size: 23px;
                text-align: center;
            }

            .card__description{
                width: 60%;
                text-align: center;
            }

            @media (min-width: 765px){
                .card{
                    width: 400px;
                    border-radius: 7px;
                    height: 190px;
                }

                .card__description{
                    width: 80%;
                }
            }
        `;
    }

    @property({attribute: false})
    card!: Classe;

    protected override render(): TemplateResult{
        return html`
            <div class="card">
                <p class="card__title">${this.card.title}</p>
                <p class="card__description">${this.card.text}</p>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-experience-card': LExperienceCard
   }
}