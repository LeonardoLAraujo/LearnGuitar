import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import "../components/l-login";

@customElement('l-enter-account')
export default class LEnterAccount extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .enter{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="enter">
                <l-login></l-login>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-enter-account': LEnterAccount
   }
}