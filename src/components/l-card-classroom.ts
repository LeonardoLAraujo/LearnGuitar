import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('l-card-classroom')
export default class LCardClassroom extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .card{
                width: calc(100% - 32px);
                color: #fff;
                cursor: pointer;
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                box-shadow: -1px -1px 208px -57px rgba(0,0,0,0.75);
            }   

            .card:hover{
                background-color: var(--light-purple);
            }

            p{
                margin: 0;
                padding: 0;
            }

            @media (min-width: 1024px){
                .card{
                    width: 200px;
                    height: 40px;
                    font-size: 18px;
                }
            }
        `;
    }

    @property({type: Number})
    index: number = 0;
    
    @property({type: Boolean})
    isCurrent: boolean = false;

    protected override render(): TemplateResult{
        return html`
            <style>
                .card{
                    background-color: ${this.isCurrent ? "var(--light-purple)" : "var(--dark-purple)"}
                }
            </style>

            <div class="card">
                <p>Aula ${this.index}</p>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-card-classroom': LCardClassroom
   }
}