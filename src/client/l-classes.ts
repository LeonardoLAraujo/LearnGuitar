import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Classe } from '../type/classe';
import "../components/l-experience-card";
import "../components/l-classroom";
import "../components/l-create-classroom";
import LClassroom from '../components/l-classroom';
import { Service } from '../server/service';
import { ClassroomObject } from '../type/classroom';
import lCreateClassroom from '../components/l-create-classroom';

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

            .createButton{
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
                align-self: flex-start;
            }

            .createButton:hover{
                background-color: var(--dark-orange);
            }

            @media (min-width: 1024px){
                .classes h1{
                    align-self: flex-start;
                    margin: 1rem 0rem 2rem 3rem;
                }
            }
        `;
    }

    @state()
    private _isClasseroom: boolean = false;

    @state()
    private indexClassroom: number = 0;

    @query("l-classroom")
    lClassroom!: LClassroom;

    @query("l-create-classroom")
    lCreateClassroom!: lCreateClassroom;

    @query(".classes")
    containerClasses!: HTMLDivElement;

    private openCreateClassroom(): void{
        this.lCreateClassroom.showModal();
        this.containerClasses.style.display = "none";
    }

    private closeCreateClassroom(): void{
        this.lCreateClassroom.hiddenModal();
        this.containerClasses.style.display = "flex";
    }

    private goToClassroom(index: number): void{
        this.indexClassroom = index;

        const service: Service = new Service;

        let listClassroom: Array<ClassroomObject> = [];

        service.allClassroom(this.indexClassroom).then((result: Array<ClassroomObject>) => {
            console.log(result);
            result.map((classroom: ClassroomObject) => {
                listClassroom.push(classroom);
            });

            sessionStorage.setItem("classroom", JSON.stringify(listClassroom));

            this._isClasseroom = true;
        });

    }

    private generateCardClasses(): Array<TemplateResult> {
        return CLASSES.map((card: Classe, index: number) => html`<l-experience-card .card=${card} @click=${() => {this.goToClassroom(index+=1)}}></l-experience-card>`);
    }

    protected override render(): TemplateResult{
        return html`
           <l-create-classroom .onPressedCloseButton=${() => {this.closeCreateClassroom()}}></l-create-classroom>
            <div class="classes">
                ${this._isClasseroom ? html`` : html`<button class="createButton" @click=${this.openCreateClassroom}>Cadastrar Aula</button>`}
                ${this._isClasseroom ? html`<l-classroom .indexClassroom=${this.indexClassroom}></l-classroom>` : html`<h1>Escolha seu Nível:</h1>
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