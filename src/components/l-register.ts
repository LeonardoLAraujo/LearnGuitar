import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import LOGO from "../images/logo.png";
import { Service } from '../server/service';

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
                padding: 1rem;
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

            .form__errorCreateAccount,
            .form__successCreateAccount{
                display: none;
                margin: 0;
                font-family: PoppinsBold;
                text-align: center;
                font-size: 18px;
            }

        `;
    }

    @state()
    private _erroUsername: string = "";

    @query(".form__errorCreateAccount")
    private _containerErroCreateAccount!: HTMLParagraphElement;

    @query(".form__username")
    private _inputUsername!: HTMLInputElement;

    @query(".form__email")
    private _inputEmail!: HTMLInputElement;

    @query(".form__password")
    private _inputPassword!: HTMLInputElement;

    @property({attribute: false})
    onPressed: Function = () => {};

    private async createAccount(e: MouseEvent): Promise<void> {
        e.preventDefault();

        if(this._inputUsername.value == "" || this._inputEmail.value == "" || this._inputPassword.value == ""){
            return;
        }

        const service: Service = new Service;
        
        service.createAccount(this._inputUsername.value, this._inputEmail.value, this._inputPassword.value).then((result: any) => {
            if(!result.success){
                this._erroUsername = result.registerMessage;
                this._containerErroCreateAccount.style.display = "block";
            }else{
                this._containerErroCreateAccount.style.display = "block";
                this._erroUsername = result.registerMessage;  
            }
        });
        
    }

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
                    <input type="text" class="form__username" placeholder="Username" required>
                    <input type="email" class="form__email" placeholder="E-mail" required>
                    <input type="password" class="form__password" placeholder="Senha" required>
                    <div class="form__terms">
                        <input type="checkbox" required>
                        <label>Aceito os <a href="#">Termos</a></label>
                    </div>
                    <p class="form__errorCreateAccount">${this._erroUsername}</p>
                    <button type="submit" class="form__button" @click=${(e: MouseEvent) => {this.createAccount(e)}}>Registrar</button>
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