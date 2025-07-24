import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('l-upload-file')
export default class LUploadFile extends LitElement{

    static override get styles(): CSSResult{
        return css`
             .upload{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;
                background-color: transparent;
                border-radius: 8px;
                position: relative;
                
            }

            .upload__information{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                width: 100%;
            }

            .upload__information .information__description{
                width: 86%;
            }

            .upload-box {
                border: 3px dashed var(--dark-blue);
                background-color: #fff;
                padding: 19px;
                width: 100%;
                max-width: 600px;
                text-align: center;
                border-radius: 10px;
                transition: border 0.3s;
                position: relative;
            }

            .upload-box.dragover {
                border-color: var(--dark-blue);
            }

            .upload-box svg {
                width: 60px;
                height: 60px;
                margin-bottom: 20px;
                fill: var(--dark-blue);
            }

            .upload-text {
                font-size: 20px;
                color: #888;
            }

            .upload-or {
                margin: 10px 0;
                color: #aaa;
                font-size: 16px;
            }

            .upload-button {
                display: inline-block;
                padding: 10px 20px;
                border: 2px solid var(--dark-blue);
                border-radius: 6px;
                color: var(--dark-blue);
                font-weight: bold;
                text-decoration: none;
                transition: background 0.3s, color 0.3s;
                cursor: pointer;
            }

            .upload-button:hover {
                background-color: var(--dark-blue);
                color: #fff;
            }

            input[type="file"] {
                display: none;
            }

            .preview {
                margin-top: 20px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
            }

            .preview-item {
                background: #f0f0f0;
                padding: 10px;
                border-radius: 8px;
                text-align: center;
                position: relative;
                font-size: 14px;
            }

            .preview-item img {
                max-width: 100%;
                border-radius: 4px;
                display: block;
                margin: auto;
            }
        `;
    }

    @query("#dropzone")
    private _dropzone!: HTMLDivElement;

    @query("#fileInput")
    private _fileInput!: HTMLInputElement;

    @query("#preview")
    private _preview!: HTMLDivElement;

    @property({type: String})
    placeholder: string = "Arraste o PDF aqui"

    private showPreview(files: any){
        this._preview.innerHTML = '';

        Array.from(files).forEach((file: any) => {
            const item = document.createElement("div");
            item.className = 'preview-item';

            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressContainer.appendChild(progressBar);

            if(file.type.startsWith('image/')){
                const reader = new FileReader();
                const img: any = document.createElement("img");
                item.appendChild(img);
                
                reader.onload = () => {
                    img.src = reader.result;
                }

                reader.readAsDataURL(file);
            }else if (file.type == 'application/pdf'){
                item.innerHTML = `<div class="pdf-icon">📄</div>
                                  <div>${file.name}</div>`;
            }

            item.appendChild(progressContainer);
            this._preview.appendChild(item);

            // Simular progresso
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = progress + '%';
                if (progress >= 100) clearInterval(interval);
            }, 80);
        });
   }

    private dragOver(e: MouseEvent){
        e.preventDefault();

        this._dropzone.classList.add('dragover');
    }

    private dragLeave(e: MouseEvent){
        e.preventDefault();

        this._dropzone.classList.remove('dragover');
    }

    private onDrop(e: any){
        e.preventDefault();

        this._dropzone.classList.remove('dragover');
        this.showPreview(e.dataTransfer.files);
    }

    private onChange(){
        this.showPreview(this._fileInput.files);
    }


    protected override render(): TemplateResult{
        return html`
            <div class="upload">
                <div class="upload-box" id="dropzone" @dragover=${(e: any) => {this.dragOver(e)}} @dragleave=${(e: any) => {this.dragLeave(e)}} @drop=${(e: any) => {this.onDrop(e)}}>
                    <svg viewBox="0 0 24 24">
                        <path d="M19.35 10.04a7.49 7.49 0 0 0-14-2A6 6 0 0 0 6 20h13a5 5 0 0 0 .35-9.96zM13 11v4h-2v-4H8l4-4 4 4h-3z"/>
                    </svg>

                    <div class="upload-text">${this.placeholder}</div>
                    <div class="upload-or">ou</div>

                    <label class="upload-button">
                        Selecionar Arquivos
                        <input type="file" id="fileInput" multiple accept="image/*,application/pdf" @change=${this.onChange}>
                    </label>

                    <div class="preview" id="preview"></div>
                </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-upload-file': LUploadFile
   }
}