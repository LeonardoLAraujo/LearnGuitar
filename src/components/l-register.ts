import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import LOGO from "../images/logo.png";

@customElement('l-register')
export default class LRegister extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .register,
            .form{
                display: flex;
                flex-direction: column;
            }

            .register{
                width: 300px;
                background-color: var(--dark-blue);
                padding: 2rem;
                border-top-right-radius: 30px;
                border-bottom-left-radius: 30px;
                color: #fff;
                gap: 10px;
            }

            .register__logo{
                background-position: center;
                height: 118px;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .form{
                gap: 5px;
            }

            .form a{
                color: #fff;
            }

            .form a:hover{
                color: var(--light-blue);
            }

            .form input{
                outline: none;
                font-size: 18px;
                font-family: PoppinsRegular;
                padding: 0.3rem;
                border-radius: 6px;
                border: none;
                margin-top: 0.2rem;
            }

            .form input::placeholder{
                font-family: PoppinsItalic;
            }

            .form__terms{
                display: flex;
                align-items: center;
                gap: 5px;
                margin-top: 0.3rem;
            }
            
            .form__terms input{
                cursor: pointer;
            }

            button{
                font-size: 18px;
                font-size: PoppinsLight;
                padding: 0.5rem;
                border: none;
                cursor: pointer;
                color: #fff;
            }
            
            .form__button{
                background-color: var(--orange);
                margin-top: 1rem;
            }

            .register__button{
                background-color: var(--navy-dark-blue);
            }

            .form__button:hover{
                background-color: var(--dark-orange);
            }

            .register__button:hover{
                background-color: var(--light-blue);
            }
        `;
    }

    @property({attribute: false})
    onPressed: Function = () => {};

    protected override render(): TemplateResult{
        return html`
            <style>
                .register__logo{
                    background-image: url(${LOGO});
                }
            </style>
            
            <div class="register">
                <div class="register__logo"></div>
                <form class="form">
                    <input type="text" placeholder="Usuário" required>
                    <input type="email" placeholder="E-mail" required>
                    <input type="password" placeholder="Senha" required>
                    <div class="form__terms">
                        <input type="checkbox" required>
                        <label>Aceito os Termos</label>
                    </div>
                    <button type="submit" class="form__button">Registrar</button>
                </form>

                <button class="register__button" @click=${this.onPressed}>Entrar</button>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-register': LRegister
   }
}