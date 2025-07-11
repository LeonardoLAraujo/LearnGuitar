import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('l-main')
export default class LMain extends LitElement{

    static override get styles(): CSSResult{
        return css``;
    }

    protected override render(): TemplateResult{
        return html`
            <h1>NDD</h1>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-main': LMain
   }
}