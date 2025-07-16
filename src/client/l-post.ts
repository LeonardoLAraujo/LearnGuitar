import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import "../components/l-card-post";

@customElement('l-post')
export default class LPost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .post{
                padding-top: 5rem;
            }

            .post h1{
                font-family: PoppinsBold;
                text-align: center;
            }

            .post__card{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 10px;
                padding-bottom: 10px;
            }

            @media (min-width: 764px){
                .post h1{
                    text-align: left;
                    margin-left: 2rem;
                }
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="post">
                <h1>Postagens</h1>
                <div class="post__card">
                    <l-card-post></l-card-post>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-post': LPost
   }
}