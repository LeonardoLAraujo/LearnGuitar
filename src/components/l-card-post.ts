import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Post } from '../model/post';

const IMAGE_DEFAULT = "https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg";

@customElement('l-card-post')
export default class LCardPost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            p{
                margin: 0;
            }

            .cardPost{
                display: flex;
                flex-direction: column;
                width: calc(100% - 32px);
                background-color: #fff;
                padding: 1rem;
                gap: 20px;
                max-width: 668px;
            }

            .cardPost__user{
                display: flex;
                gap: 15px;
            }

            .user__image{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
            }

            .information__name{
                font-family: PoppinsBold;
            }

            .information__date{
                color: var(--light-gray);
                font-size: 14px;
            }

            .cardPost__description{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .description__text{
                font-size: 15px;
                text-align: left;
            }

            .description__image{
                width: 100%;
                display: flex;
                overflow: auto;
                gap: 5px;
            }

            .description__image img{
                width: 100%;
            }

            .cardPost__button{
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-top: 1px solid #000;
                padding-top: 15px;
            }

            ecv-icon{
                cursor: pointer;
            }

            .text__more{
                color: var(--dark-blue);
                cursor: pointer;
                font-family: PoppinsBold;
            }

            @media (min-width: 1024px){
                .cardPost{
                    width: 700px;
                }

                .description__image img{
                    width: 490px;
                }

                .cardPost__description{
                    width: fit-content;
                }
            }
        `;
    }

    @state()
    private _isReadMore: boolean = false;

    @property({attribute: false})
    post!: Post;

    protected override render(): TemplateResult{
        return html`
            <style>
                .user__image{
                    background-image: url(${this.post.getPhotoUser() == null ? IMAGE_DEFAULT : this.post.getPhotoUser()});
                }
            </style>
            <div class="cardPost">
                <div class="cardPost__user">
                    <div class="user__image"></div>
                    <div class="user__information">
                        <p class="information__name">${this.post.getUsername()}</p>
                        <p class="information__date">${this.post.getDate()}</p>
                    </div>
                </div>
                <div class="cardPost__description">
                    <p class="description__text">   
                        ${this.post.getText().length <= 1300 ? 
                            html`${this.post.getText()}` : 
                            html`
                                ${this._isReadMore ? html`${this.post.getText()}` : html`${this.post.getText().substring(0, 1300)}`}
                                <p class="text__more" @click=${() => {this._isReadMore = !this._isReadMore}}>
                                    ${this._isReadMore ? html`...Ler Menos` : html`Ler Mais...`}
                                </p>
                            `
                        }   
                    </p>
                    <div class="description__image">
                        <!-- <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg"> -->
                    </div>
                </div>
                <div class="cardPost__button">
                    <ecv-icon .icon=${IconTypes.Favorite}></ecv-icon>
                    <ecv-icon .icon=${IconTypes.Chat}></ecv-icon>
                </div>
            </div>
            <div></div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-card-post': LCardPost
   }
}