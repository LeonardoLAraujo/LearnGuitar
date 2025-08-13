import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import "./client/l-home";
import "./client/l-menu";
import "./client/l-classes";
import "./client/l-post";
import "./client/l-video";
import "./components/l-login";
import "./client/l-profile-user";
import { Router } from '@lit-labs/router';
import LMenu from './client/l-menu';
import { ISocket } from './interfaces/isocket';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';


@customElement('learn-guitar')
export class LearnGuitar extends LitElement implements ISocket{

    static override get styles(): CSSResult{
        return css`
            :host{
                width: 100%;
                height: 100%;
            }
        `;
    }

    @state()
    public socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

    @query("l-menu")
    lMenu!: LMenu;
    
    public router  = new Router(this, [
        {path: '/',             render: () => html`<l-home></l-home>`},
        {path: '/aulas',        render: () => html`<l-classes></l-classes>`},
        {path: '/postagens',    render: () => html`<l-post .referenceLearnGuitar=${this}></l-post>`},
        {path: '/videos',       render: () => html`<l-video></l-video>`},
        {path: '/entrar',       render: () => html`<l-login .referenceLearnGuitar=${this}></l-login>`},
        {path: '/profile',      render: () => html`<l-profile-user .referenceLearnGuitar=${this}></l-profile-user>`}
    ]);

    override connectedCallback(): void {
        super.connectedCallback();

        this.socket = io();
    }

    protected override firstUpdated(): void {
        if(JSON.parse(localStorage.getItem("user") as string) != null){
            this.lMenu.isLogged = true;
        }
    }

    public goToPage(source: string){
        this.router.goto(source);
    }

    protected override render(): TemplateResult{
        return html`
            <l-menu .referenceLearnGuitar=${this}></l-menu>
            ${this.router.outlet()}
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'learn-guitar': LearnGuitar
   }
}