import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('l-video')
export default class LVideo extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .video{
                padding-top: 5rem;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="video">
                <h1>Vídeo</h1>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-video': LVideo
   }
}