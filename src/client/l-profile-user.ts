import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import { PostObject } from '../type/post';

@customElement('l-profile-user')
export default class LProfileUser extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .profile,
            .profile__user{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .profile{
                padding: 6rem 1rem 0rem 1rem;
            }

            .profile__user img{
                width: 50%;
                border-radius: 50%;
            }

            .user__information{
                display: flex;
                flex-direction: column;
                align-self: flex-start;
            }

            .information__user{
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            p{
                margin: 0;
            }

            .user__label{
                color: var(--light-gray);
                font-family: PoppinsBold;
            }

            .user__text{
                font-size: 18px;
                font-family: PoppinsLight;
            }

            .profile__posts,
            .profile__videos{
                width: 100%;
                margin-top: 1rem;
            }

            .profile__posts h1,
            .profile__videos h1{
                border-bottom: 1px solid var(--light-green);
                margin: 0;
                font-family: PoppinsBold;
                color: var(--light-gray);
            }

            @media (min-width: 764px){
                .profile__user img{
                    width: 40%;
                }
            }

            @media (min-width: 1024px){
                .profile{
                    padding-top: 7rem;
                }

                .profile__user{
                    width: 100%;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .profile__user img{
                    width: 400px;
                    cursor: pointer;
                }
            }
        `;
    }

    private _user = JSON.parse(localStorage.getItem("user") as string).user;

    private generateInformationUser(label: string, value: string){
        return html`
            <div class="information__user">
                <p class="user__label">${label}</p>
                <p class="user__text">${value}</p>
            </div>
        `;
    }

    // private async getMyPosts(): Promise<PostObject[]>{

    // }   

    protected override render(): TemplateResult{
        return html`
            <div class="profile">
                <div class="profile__user">
                    <img src=${this._user._photo == null ? "https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg" : this._user._photo}>
                    <div class="user__information">
                        ${this.generateInformationUser("Nome", this._user._username)}
                    </div>
                </div>
                <div class="profile__posts">
                    <h1>Postagens</h1>
                </div>
                <div class="profile__videos">
                    <h1>Vídeos</h1>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-profile-user': LProfileUser
   }
}