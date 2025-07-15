import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';
import "./client/l-enter-account";
import "./client/l-home";
import "./client/l-menu";
import "./client/l-classes";
import { Router } from '@lit-labs/router';

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

    private router  = new Router(this, [
        {path: '/',             render: () => html`<l-home></l-home>`},
        {path: '/aulas',        render: () => html`<l-classes></l-classes>`},
        {path: '/postagens',    render: () => html`<h1>About</h1>`},
        {path: '/videos',       render: () => html`<h1>About</h1>`},
        {path: '/entrar',       render: () => html`<l-enter-account></l-enter-account>`},
    ]);

    protected override render(): TemplateResult{
        return html`
            <l-menu></l-menu>
            ${this.router.outlet()}
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-main': LMain
   }
}