import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Classe } from '../type/classe';
import "../components/l-experience-card";
import "../components/l-classroom";

const CLASSES: Array<Classe> = [
    {title: "Iniciante", text: "Este é o modo ideal para quem nunca tocou violão e quer começar do zero, aprendendo passo a passo de forma simples e prática."},
    {title: "Intermediário", text: "Este modo é para quem já sabe o básico no violão e quer evoluir, aprendendo músicas completas e novas técnicas para aprimorar seu som."},
    {title: "Avançado", text: "Este modo é para quem já toca violão com confiança e quer se aprimorar ainda mais, aprendendo técnicas avançadas e expandindo suas habilidades musicais."},
];

@customElement('l-classes')
export default class LClasses extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .classes{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding-top: 4rem;
            }

            .classes h1{
                margin: 2rem 0rem 0rem 0rem;
            }

            .classes__card{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
            }

            @media (min-width: 1024px){
                .classes h1{
                    align-self: flex-start;
                    margin: 4rem 0rem 2rem 3rem;
                }
            }
        `;
    }

    @state()
    private _isClasseroom: boolean = false;

    private goToClassroom(): void{
        this._isClasseroom = true;
    }

    private generateCardClasses(): Array<TemplateResult> {
        return CLASSES.map((card: Classe) => html`<l-experience-card .card=${card} @click=${this.goToClassroom}></l-experience-card>`);
    }

    protected override render(): TemplateResult{
        return html`
            <div class="classes">
                ${this._isClasseroom ? html`<l-classroom></l-classroom>` : html`<h1>Escolha seu Nível:</h1>
                                                                                <div class="classes__card">
                                                                                    ${this.generateCardClasses()}
                                                                                </div>`}
            </div>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
    'l-classes': LClasses
   }
}