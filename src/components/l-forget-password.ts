import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('l-forget-password')
export default class LForgetPassword extends LitElement{


    static override get styles(): CSSResult{
        return css`
            .forget{
                width: 300px;
                background-color: var(--dark-blue);
                padding: 1rem;
                border-top-left-radius: 30px;
                border-bottom-right-radius: 30px;
                color: #fff;
                gap: 10px;
            }

            .forget p {
                margin: 0;
                text-align: left;
            }

            .forget__form{
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 2rem;
            }

            .forget__form input{
                outline: none;
                font-size: 18px;
                font-family: PoppinsRegular;
                padding: 0.3rem;
                margin-top: 0.2rem;
                border-radius: 6px;
                border: none;
            }

            .forget__form input::placeholder{
                font-family: PoppinsItalic;
            }

            button{
                font-size: 18px;
                font-size: PoppinsLight;
                padding: 0.5rem;
                border: none;
                cursor: pointer;
                background-color: var(--orange);
                color: #fff;
            }

            .form__button:hover{
                background-color: var(--dark-orange);
            }
        `;
    }

    @property({attribute: false})
    sendPassword: Function = () => {};

    public hiddenForget(): void{
        this.style.display = "none";
    }

    public showForget(): void{
        this.style.display = "flex";
    }

    protected override render(): TemplateResult{
        return html`
            <div class="forget">
                <h1>Esqueceu a Senha</h1>
                <p>Informe seu E-mail que mandaremos um código de confirmação</p>
                <form class="forget__form">
                    <input type="email" placeholder="Informe seu E-mail" required>
                    <button class="form__button">Enviar</button>
                </form>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-forget-password': LForgetPassword
   }
}