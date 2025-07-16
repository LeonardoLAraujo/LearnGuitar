import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import "./client/l-enter-account";
import "./client/l-home";
import "./client/l-menu";
import "./client/l-classes";
import "./client/l-post";
import "./client/l-video";
import { Router } from '@lit-labs/router';
import { ISocket } from './interfaces/isocket';
import { DefaultEventsMap } from 'socket.io';
import { io, Socket } from 'socket.io-client';

@customElement('l-main')
export default class LMain extends LitElement implements ISocket{

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
        {path: '/postagens',    render: () => html`<l-post></l-post>`},
        {path: '/videos',       render: () => html`<l-video></l-video>`},
        {path: '/entrar',       render: () => html`<l-enter-account></l-enter-account>`},
    ]);

    @state()
    socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
    
    override connectedCallback(): void {
        super.connectedCallback();

        this.socket = io();
    }

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