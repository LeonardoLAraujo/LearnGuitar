import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Service } from '../server/service';
import { LPost } from '../client/l-post';
import { PostObject } from '../type/post';

@customElement('l-create-post')
export default class LCreatePost extends LitElement{

    static override get styles(): CSSResult{
        return css`
            :host{
                display: inline-block;
                height: 100vh;
            }

            .createPost{
                display: flex;
                flex-direction: column;
                position: fixed;
                align-items: center;
                top: 0;
                z-index: 5;
                background-color: var(--light-gray);
                width: 100%;
                height: 100%;
                padding-top: 2rem;
            }

            .createPost__post{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                width: 90%;
            }

            .post__close{
                padding: 1rem;
                background-color: var(--dark-purple);
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-self: flex-end;
                border-radius: 50%;
                cursor: pointer;
            }

            .post__close:hover{
                background-color: var(--light-purple);
            }

            .post__form{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;
                width: calc(100% - 32px);
                background-color: #fff;
                padding: 1rem;
                border-radius: 2px;
            }

            .post__form textarea{
                width: 100%;
                height: 300px;
                font-size: 18px;
                padding: 0.5rem;
                border-radius: 5px;
                font-family: PoppinsRegular;
                outline: none;
                border: 1px solid var(--light-gray);
                resize: none;
            }

            .post__form button{
                width: 100%;
                font-size: 20px;
                font-family: PoppinsLight;
                background-color: var(--light-blue);
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: #fff;
            }

            .post__form button:hover{
                background-color: var(--dark-blue);
            }

            @media (min-width: 1024px){
                .createPost{
                    background-color: var(--light-gray-opacity);
                }

                .createPost__post{
                    width: 500px;
                }
            }
        `;
    }

    private body = document.querySelector("body");
    private _user = JSON.parse(localStorage.getItem("user") as string)?.user;

    @query(".form__textarea")
    private _inputTextArea!: HTMLTextAreaElement;

    @property({attribute: false})
    referencePost!: LPost;

    private close(): void{
        this.style.display = "none";
        this.body!.style!.overflowY = "scroll";
    }

    private async createPost(e: MouseEvent): Promise<void> {
        e.preventDefault();

        if(this._inputTextArea.value == ""){
            return;
        }

        const service: Service = new Service;

        service.createPost(this._user._id, this._inputTextArea.value).then((result) => {
            console.log(result);
        });

        service.allPost().then((result: Array<PostObject>) => {
            this.referencePost.referenceLearnGuitar.socket.emit("posts", result);
        });

        this.close();
    }

    protected override render(): TemplateResult{
        return html`
            <div class="createPost">
               <div class="createPost__post">
                    <div class="post__close" @click=${this.close}>
                        <ecv-icon .icon=${IconTypes.Close} .iconStyle=${{color: "#fff", size: "30px"}}></ecv-icon>
                    </div>
                    <form class="post__form" @submit=${this.createPost}>
                        <textarea class="form__textarea" placeholder="Escreva seu Texto"></textarea>
                        <button>Postar</button>
                    </form>
               </div>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-create-post': LCreatePost
   }
}