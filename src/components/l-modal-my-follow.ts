import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('l-modal-my-follow')
export default class LModalMyFollow extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .modal{
                background-color: #00000047;
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                z-index: 3;
                 display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal__content{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
               
            }

            .content__close{
                background-color: #fff;
                border-radius: 50%;
                align-self: flex-end;
                cursor: pointer;
            }

            .content__users{
                background-color: #fff;
                padding: 1rem;
            }

           
            .card,
            .card__user{
                display: flex;
            }

            .card{
                width: 600px;
                justify-content: space-around;
            }


            .card__user{
                width: fit-content;
                gap: 10px;
            }

            .user__image{
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 50%;
            }

            .card ecv-icon{
                cursor: pointer;
            }

        `;
    }

    private generateUserCard(){
        return html`
            <div class="card">
                <div class="card__user">
                    <img class="user__image" src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww">
                    <p>Leonardo</p>
                </div>
                <ecv-icon .icon=${IconTypes.Close} .iconStyle=${{color: "red"}}></ecv-icon>
            </div>
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="modal">
                <div class="modal__content">
                    <div class="content__close">
                        <ecv-icon .icon=${IconTypes.Close}></ecv-icon>
                    </div>
                    <div class="content__users">
                        ${this.generateUserCard()}
                    </div>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-modal-my-follow': LModalMyFollow
   }
}