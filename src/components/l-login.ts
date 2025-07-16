import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import LOGO from "../images/logo.png";
import "./l-register";
import "./l-forget-password";
import LForgetPassword from './l-forget-password';
import { Service } from '../server/service';
import { ObjectUser, User } from '../model/user';

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
                cursor: pointer;
                text-decoration: underline;
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
    private _isRegister: boolean = false;

    @query(".login")
    private _containerLogin!: HTMLDivElement;

    @query("l-forget-password")
    private _lForgetPassword!: LForgetPassword;

    @query(".form__email")
    private _inputEmailUser!: HTMLInputElement;

    @query(".form__password")
    private _inputPassword!: HTMLInputElement;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        this._lForgetPassword.hiddenForget();
    }

    private goToRegisterAccount(): void{
        this._isRegister = true;
    }

    private goToLoginAccount(): void{
        this._isRegister = false;
    }

    private forgetPassword(): void{
        this._containerLogin.style.display = "none";
        this._lForgetPassword.style.display = "flex";
    }

    private sendPassword(): void{
        this._lForgetPassword.style.display = "none";
        this._containerLogin.style.display = "flex";
    }

    private async logIn(e: MouseEvent){
        e.preventDefault();

        if(this._inputEmailUser.value == "" || this._inputPassword.value == ""){
            return;
        }

        const service: Service = new Service;

        service.loginUser(this._inputEmailUser.value, this._inputPassword.value).then((response: ObjectUser) => {
            const user: User = new User(response);

            localStorage.setItem("user", JSON.stringify({user}));

            window.location.href = "/";
        });

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
                    <input type="email" class="form__email"  placeholder="E-mail" required>
                    <input class="form__password" type="password" placeholder="Senha" required>
                    <a @click=${this.forgetPassword}>Esqueci a Senha</a>
                    <button type="submit" class="form__button" @click=${(e: MouseEvent) => {this.logIn(e)}}>Entrar</button>
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
            <l-forget-password .sendPassword=${() => {this.sendPassword()}}></l-forget-password>
            ${this._isRegister ? this.generateRegister() : this.generateLogin()}
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-login': LLogin
   }
}