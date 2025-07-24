import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import LUploadFile from './l-upload-file';
import { Service } from '../server/service';

@customElement('l-create-video')
export default class LCreateVideo extends LitElement{

     static override get styles(): CSSResult{
          return css`
            .createClassroom{
            padding-top: 4rem;
            display: none;
            flex-direction: column;
            align-items: center;
            height: 100%;
            }

            h1{
            font-family: PoppinsBold;
            color: var(--dark-blue);
            }

            .createClassroom__form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            width: 50%;
            height: auto;
            }

            input,
            textarea{
            width: 100%;
            border: 1px solid gray;
            outline: none;
            padding: 0.4rem;
            font-size: 18px;
            font-family: PoppinsRegular;
            border-radius: 3px;
            resize: none;
            }

            textarea{
            height: 120px;
            }

            .form__input{
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 6px;
            padding: 1rem;
            }

            button{
            width: 100%;
            font-size: 18px;
            padding: 0.4rem;
            cursor: pointer;
            background-color: var(--orange);
            cursor: pointer;
            border: none;
            color: #fff;
            font-family: PoppinsLight;
            }

            button:hover{
            background-color: var(--dark-orange);
            }

            .backButton{
            max-width: 200px;
            width: 100%;
            margin: 20px 30px;
            cursor: pointer;
            background-color: var(--orange);
            color: #fff;
            border: none;
            padding: 0.5rem;
            font-family: PoppinsLight;
            font-size: 18px;
            align-self: flex-start;
            }

            .backButton:hover{
            background-color: var(--dark-orange);
            }
          `;
       }

        @query(".createClassroom")
        containerCreate!: HTMLDivElement;
    
        @query(".input__title")
        inputTitle!: HTMLInputElement;
    
        @query(".input__source")
        inputSourceVideoYoutube!: HTMLInputElement;
    
        @query(".input__description")
        inputDescription!: HTMLInputElement;
    
        @query("l-upload-file")
        lUploadFile!: LUploadFile;

        @queryAll("input")
        allInput!: NodeListOf<HTMLInputElement>;

        @property({attribute: false})
        onPressedCloseButton: Function = () => {};

        private resetInput(): void{
            this.allInput.forEach((input: HTMLInputElement) => {
                input.value = "";
            });

            this.inputDescription.value = "";
        }

        public hiddenModal(): void{
            this.containerCreate.style.display = "none";
        }

        public showModal(): void{
            this.containerCreate.style.display = "flex";
        }

        private async createClassroom(e: MouseEvent): Promise<void>{
            e.preventDefault();  
    
            if(this.inputTitle.value.trim() == "" || this.inputSourceVideoYoutube.value.trim() == ""){;
                return;
            }
    
            const service: Service = new Service;
            
            service.registerVideo(this.inputTitle.value, this.inputDescription.value, this.inputSourceVideoYoutube.value).then((result) => {
                console.log(result);
            });

            this.resetInput();
        }
    
        protected override render(): TemplateResult{
          return html`
             <div class="createClassroom">
                <button class="backButton" @click=${this.onPressedCloseButton}>Voltar</button>
                <h1>Cadastrar Vídeo</h1>
                <form class="createClassroom__form" @submit=${this.createClassroom}>
                   <div class="form__input">
                      <input class="input__title" type="text" placeholder="Título da Lição" required>
                      <input class="input__source" type="text" placeholder="Link do Vídeo" required>
                      <textarea class="input__description" placeholder="Descrição da Aula"></textarea>
                      <l-upload-file placeholder="Arraste a imagem da sua Capa (Tumblr)"></l-upload-file>
                   </div>
                   <button type="submit">Cadastrar Vídeo</button>
                </form>
             </div>
          `;
       }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-create-video': LCreateVideo
   }
}