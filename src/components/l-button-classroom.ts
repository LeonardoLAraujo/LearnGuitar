import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import "ecv-component";
import { IconTypes } from 'ecv-component';

@customElement('l-button-classroom')
export default class LButtonClassroom extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
            }

            .connectinModule{
                width: 100%;
                border: 3px solid transparent;
                cursor: pointer;
            }

            .connectinModule:hover{
                border: 3px solid var(--light-green) !important;
            }

            .connectinModule,
            .connectinModule__text,
            .connectinModule__icon{
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .connectinModule__icon{
                width: 27%;
                background-color: #000;
                height: 71px;
            }

            .connectinModule__text{
                background-color: #fff;
                width: 100%;
            }

            .connectinModule__text p{
                text-align: center;
                font-family: PoppinsBold;
                text-transform: uppercase;
                font-size: 20px;
                color: var(--preto);
            }

            @media (min-width: 1200px){
                
                .connectinModule{
                    width: 100%;
                }
                .connectinModule__icon{
                    width: 27%;
                }
            }

            @media (min-width: 1375px){
                :host{
                    width: fit-content;
                }

                .connectinModule{
                    width: 249px;
                }

                .connectinModule__icon{
                    width: 45%;
                }
            }
        `;
    }

    @property({type: String})
    icon: string = "";

    @property({type: String})
    text: string = "";

    @query(".connectinModule")
    connectionModule!: HTMLDivElement;

    public currentButton(): void{  
        this.connectionModule.style.border = "3px solid var(--light-green)";
    }

    public resetButton(): void{
        this.connectionModule.style.border = "3px solid transparent";
    }

    protected override render(): TemplateResult{
        return html`
            <div class="connectinModule" @click=${this.currentButton}>
                <div class="connectinModule__icon">
                    <ecv-icon .icon=${this.icon as IconTypes} .iconStyle=${{color: "#fff", size: "31px"}}></ecv-icon>
                </div>
                <div class="connectinModule__text">
                    <p>${this.text}</p>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
        'l-button-classroom': LButtonClassroom
   }
}