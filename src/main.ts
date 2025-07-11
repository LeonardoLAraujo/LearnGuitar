import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import "./client/l-enter-account";

@customElement('l-main')
export default class LMain extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
                height: 100%;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <l-enter-account></l-enter-account>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-main': LMain
   }
}