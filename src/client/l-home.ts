import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query } from 'lit/decorators.js';
import TEACHER from "../images/teacher.png";
import { IconTypes } from 'ecv-component';


@customElement('l-home')
export default class LHome extends LitElement{ 

    static override get styles(): CSSResult{
        return css`
            :host{
                position: relative;
            }

            .home{
                display: flex;
                flex-direction: column;
                padding-top: 4rem;
            }

            p, h1{
                margin: 0;
            }

            .home__background{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 881px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                position: relative;
                color: #fff;
            }

            .background__shadow{
                position: absolute;
                background-color: #000000d6;
                width: 100%;
                height: 100%;
                opacity: 0.9;
            }

            .background__description{
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 2rem;
            }

            .background__description h1{
                font-family: PoppinsBlack;
                text-align: center;
            }

            .background__description p{
                text-align: center;
            }    

            .background__description button{
                border: none;
                padding: 0.9rem;
                border-radius: 5px;
                font-size: 18px;
                font-family: PoppinsLight;
                background-color: var(--orange);
                color: #fff;
                cursor: pointer;
            }

            .home__start{
                display: flex;
                flex-direction: column;
                gap: 30px;
                padding: 2rem;
            }

            .home__start h1,
            .home__post h1{
                font-family: PoppinsBold;
                text-align: center;
                font-size: 30px;
            }

            .start__description{
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .start__description ul,
            .post__description ul{
                font-family: PoppinsLight;
            }

            .home__post{
                padding: 2rem;
                background-color: var(--dark-blue);
                color: #fff;
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .post__effet{
                display: none;
            }

            .post__description{
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .button__top{
                display: none;
            }

            @media (min-width: 1024px){
                .background__description{
                    padding: 4rem;
                }

                .background__description h1,
                .home__post h1{
                    text-align: center;
                    font-size: 40px;
                    margin-bottom: 2rem;
                }

                .background__description p{
                    width: 800px;
                    text-align: left;
                    font-size: 18px;
                }    

                .background__description button{
                    transition: transform 600ms;
                    margin-top: 2rem;
                }

                .background__description button:hover{
                    transform: scale(1.05);
                }

                .home__start,
                .home__post{
                    padding: 5rem;
                }

                .home__start h1{
                    font-size: 40px;
                }

                .start__description p{
                    width: 80%;
                    font-size: 17px;
                }

                .home__post{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .post__effet{
                    display: block;
                    width: 110px;
                    height: 100px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    clip-path: polygon(50% 100%, 0 0, 100% 0);
                    background-color: #D9D9D9;
                }

                .home__post h1{
                    width: 900px;
                }

                .post__description p{
                    width: 80%;
                    font-size: 18px;
                }

                .button__top{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    background-color: var(--orange);
                    position: fixed;
                    right: 10px;
                    bottom: 10px;
                    cursor: pointer;
                    transform: rotateX(180deg);
                }
            }
        `;
    }

    @query(".home__start")
    homeStartJourney!: HTMLHeadingElement;

    private goToStartJourney(): void{
        this.homeStartJourney.scrollIntoView({ behavior: 'smooth' })
    }

    private goToTopPage(): void{
        this.scrollIntoView({ behavior: 'smooth' });
    }

    private generateParallax(): TemplateResult{
        return html`
            <div class="home__background">
                <div class="background__shadow"></div>
                <div class="background__description">
                    <h1>🎸 Bem-vindo ao LearnGuitar!</h1>
                    <p>Aqui na nossa página inicial você encontrará tudo o que precisa para começar sua jornada no violão. 
                        Navegue pelo menu acima para acessar cada aula de forma prática e organizada.
                    </p>
                    <p>
                        Explore as lições, veja como acompanhar seu progresso e descubra os conteúdos disponíveis para aprender no seu ritmo. 
                        <strong>Tudo isso é 100% gratuito e sem nenhuma propaganda</strong>, para que você foque apenas no que 
                        importa: tocar violão.
                    </p>
                    <p> Estamos aqui para facilitar seu acesso ao aprendizado de guitarra, do básico ao avançado.</p>
                    <button @click=${this.goToStartJourney}>Começar</button>
                </div>
            </div>
        `;
    }

    private generateStartJourney(): TemplateResult {
        return html`
            <div class="home__start">
                <h1>Começando a Jornada</h1>
                <div class="start__description">
                    <p>Aqui no LearnGuitar, cada acorde aprendido é um passo mais perto do seu sonho de tocar com confiança. 🌟</p>
                    <p>
                        👉 Para iniciar, vá até o menu e clique na opção “Aulas”. Lá você encontrará todas as lições organizadas por nível:
                    </p>
                    <ul>
                        <li>Iniciando – perfeito para quem nunca tocou violão na vida e quer começar do zero</li>
                        <li>Intermediário – para quem já sabe o básico e quer evoluir para tocar músicas completas</li>
                        <li>Avançado – ideal para quem quer se aprimorar, dominar técnicas e expandir suas habilidades</li>
                    </ul>
                    <p>
                        É só escolher sua primeira aula, preparar seu violão e dar o primeiro acorde dessa nova jornada. E lembre-se: 
                        <strong> todo o conteúdo é 100% gratuito e sem propaganda</strong>, feito para você focar no que realmente 
                        importa – aprender a tocar guitarra no seu ritmo.
                    </p>
                </div>
            </div>
        `;
    }

    private generateIntroductionPosts(): TemplateResult{
        return html`
            <div class="home__post">
                <div class="post__effet"></div>
                <h1>💬 Postagens – Compartilhe e aprenda com a comunidade</h1>
                <div class="post__description">
                    <p>Aqui no LearnGuitar, além de acessar suas aulas, você também pode tirar dúvidas, compartilhar conhecimento e interagir 
                        com outros guitarristas na seção de Postagens.
                    </p>
                    <p>Nesse espaço, você poderá:</p>
                    <ul>
                        <li>Fazer perguntas sempre que precisar de ajuda</li>
                        <li>Compartilhar dicas e técnicas que aprendeu</li>
                        <li>Mostrar seu progresso e motivar outras pessoas</li>
                        <li>Interagir e aprender com a experiência de toda a comunidade</li>
                    </ul>
                    <p>✨ Explore as postagens e participe! Juntos, crescemos ainda mais rápido na jornada musical.</p>
                </div>
            </div>
        `;
    }

    private generateIntroductionVideo(): TemplateResult {
        return html`
            <div class="home__start">
                <h1>🎥 Vídeos – Mostre seu talento para a comunidade</h1>
                <div class="start__description">
                    <p>Na página Vídeos, você pode enviar vídeos mostrando sua evolução no violão e compartilhar com todos o seu progresso.</p>
                    <p>
                        Aqui você pode:
                    </p>
                    <ul>
                        <li>Mandar um vídeo tocando a música que aprendeu</li>
                        <li>Mostrar sua performance cantando e tocando sua música favorita</li>
                        <li>Compartilhar vídeos da sua banda tocando juntos</li>
                    </ul>
                    <p>
                        ✨Essa é a sua oportunidade de inspirar outros alunos, receber feedbacks e celebrar cada conquista na sua jornada musical.
                    </p>
                    <p>
                        Não tenha vergonha de mostrar seu talento. Cada vídeo enviado fortalece ainda mais nossa comunidade LearnGuitar.
                    </p>
                </div>
            </div>
        `;
    }

    protected override render(): TemplateResult{
        return html`
            <style>
                .home__background{
                    background-image: url(${TEACHER});
                }
            </style>
            <div class="home">   
                ${this.generateParallax()}
                ${this.generateStartJourney()}
                ${this.generateIntroductionPosts()}
                ${this.generateIntroductionVideo()}
            </div>

            <div class="button__top" @click=${this.goToTopPage}>
                <ecv-icon .icon=${IconTypes.ArrowDropDown} .iconStyle=${{size: "40px", color: "#fff"}}></ecv-icon>
            </div>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
    'l-home': LHome
   }
}