import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('l-loading')
export default class LLoading extends LitElement{
    static override get styles(): CSSResult{
        return css`
            .loading{
                position: fixed;
                top: 0;
                background-color: #fff;
                width: 100vw;
                height: 100vh;
                left: 0;
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            .loading p{
                font-family: PoppinsLight;
                font-size: 30px;
            }
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <div class="loading">
                <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGNmd2xlendnbG5scjJ1ZHdpYXRpMDdzZWh4MGFxNTUwOTFweWJtciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnnnWvRXTeXx3wc/giphy.gif">

                <p>Carregando ...</p>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-loading': LLoading
   }
}