import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';

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
                .description__image img{
                    width: 490px;
                }
            }
        `;
    }

    @state()
    private _isReadMore: boolean = false;

    protected override render(): TemplateResult{
        const a = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;

        return html`
            <style>
                .user__image{
                    background-image: url("https://igd-wp-uploads-pluginaws.s3.amazonaws.com/wp-content/uploads/2016/05/30105213/Qual-e%CC%81-o-Perfil-do-Empreendedor.jpg");
                }
            </style>
            <div class="cardPost">
                <div class="cardPost__user">
                    <div class="user__image"></div>
                    <div class="user__information">
                        <p class="information__name">Leonardo Leal Araújo</p>
                        <p class="information__date">16/07 - 10:00</p>
                    </div>
                </div>
                <div class="cardPost__description">
                    <p class="description__text">   
                        ${a.length <= 1300 ? 
                            html`${a}` : 
                            html`
                                ${this._isReadMore ? html`${a}` : html`${a.substring(0, 1300)}`}
                                <p class="text__more" @click=${() => {this._isReadMore = !this._isReadMore}}>
                                    ${this._isReadMore ? html`...Ler Menos` : html`Ler Mais...`}
                                </p>
                            `
                        }   
                    </p>
                    <div class="description__image">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
                        <img src="https://seuviolao.com.br/wp-content/uploads/2017/07/496599793.jpg">
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