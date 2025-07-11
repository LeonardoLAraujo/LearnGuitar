import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import LOGO from "../images/logo.png";
import "./l-register";

@customElement('l-login')
export default class LLogin extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .login,
            .form{
                display: flex;
                flex-direction: column;
            }

            .login{
                width: 300px;
                background-color: var(--dark-blue);
                padding: 1rem;
                border-top-left-radius: 30px;
                border-bottom-right-radius: 30px;
                color: #fff;
                gap: 10px;
            }

            .login__logo{
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
                margin-top: 0.3rem;
            }

            .form a:hover{
                color: var(--light-blue);
            }

            .form input{
                outline: none;
                font-size: 18px;
                font-family: PoppinsRegular;
                padding: 0.3rem;
                margin-top: 0.2rem;
                border-radius: 6px;
                border: none;
            }

            .form input::placeholder{
                font-family: PoppinsItalic;
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

            .login__button{
                background-color: var(--navy-dark-blue);
            }

            .form__button:hover{
                background-color: var(--dark-orange);
            }

            .login__button:hover{
                background-color: var(--light-blue);
            }
        `;
    }

    @state()
    isRegister: boolean = false;

    private goToRegisterAccount(): void{
        this.isRegister = true;
    }

    private goToLoginAccount(): void{
        this.isRegister = false;
    }

    private generateLogin(): TemplateResult {
        return html`
            <style>
                .login__logo{
                    background-image: url(${LOGO});
                }
            </style>
            
            <div class="login">
                <div class="login__logo"></div>
                <form class="form">
                    <input type="email" placeholder="E-mail" required>
                    <input type="password" placeholder="Senha" required>
                    <a href="#">Esqueci a Senha</a>
                    <button type="submit" class="form__button">Entrar</button>
                </form>

                <button class="login__button" @click=${this.goToRegisterAccount}>Registrar-se</button>
            </div>
        `;
    }

    private generateRegister(): TemplateResult{
        return html`<l-register .onPressed=${() => {this.goToLoginAccount()}}></l-register>`;
    }

    protected override render(): TemplateResult{
        return html`
            ${this.isRegister ? this.generateRegister() : this.generateLogin()}
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-login': LLogin
   }
}