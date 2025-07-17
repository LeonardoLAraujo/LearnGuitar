import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('l-button-create-post')
export default class LButtonCreatePost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .createButton{
                width: 30px;
                height: 30px;
                padding: 1rem;
                background-color: var(--dark-purple);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .createButton:hover{
                background-color: var(--light-purple);
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="createButton">
                <ecv-icon .icon=${IconTypes.Chat} .iconStyle=${{color: "#fff", size: "30px"}}></ecv-icon>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-button-create-post': LButtonCreatePost
   }
}