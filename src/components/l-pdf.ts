import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('l-pdf')
export default class LPdf extends LitElement{

    static override get styles(): CSSResult{
        return css`
            .pdf{
                width: 100%;
                height: 100%;
                margin-top: 0rem;
                position: relative;
            }

            .iframe{
                width: 100%;
                height: 100%;
            }
            
        `;
    }

    @property({type: String})
    sourcePdf: string = "";

    public hiddenPdf(): void{
        this.style.display = "none";
    }

    public showPdf(): void{
        this.style.display = "block";
    }

    protected override render(): TemplateResult{
        return html`    
            <div class="pdf">
                <iframe class="iframe" src=${this.sourcePdf} type="application/pdf" frameborder=0></iframe>
            </div>
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
    'l-pdf': LPdf
   }
}