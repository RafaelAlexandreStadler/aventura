const textoElemento = document.getElementById('texto');
const opcoesContainerElemento = document.getElementById('opcoes-container');
const tituloElemento = document.getElementById('titulo');

let estadoDoJogo = {};

const cenarios = [
    {
        titulo: "O Início da Jornada",
        texto: "Você acorda em uma clareira desconhecida. À sua frente, há uma trilha estreita que leva à floresta e, à sua esquerda, um rio de águas calmas. Para onde você vai?",
        opcoes: [
            {
                texto: "Seguir a trilha da floresta",
                proximoCenario: 1
            },
            {
                texto: "Caminhar ao lado do rio",
                proximoCenario: 2
            }
        ]
    },
    {
        titulo: "Floresta Misteriosa",
        texto: "Você se aventura pela trilha. O ar se torna pesado e as árvores parecem sussurrar. Você encontra uma antiga espada cravada no chão. O que você faz?",
        opcoes: [
            {
                texto: "Pegar a espada",
                proximoCenario: 3
            },
            {
                texto: "Ignorar a espada e continuar",
                proximoCenario: 4
            }
        ]
    },
    // Você pode adicionar mais cenários aqui
    {
        titulo: "O Fim da Trilha",
        texto: "Sua jornada chegou ao fim.",
        opcoes: [
            {
                texto: "Recomeçar",
                proximoCenario: 0
            }
        ]
    }
];

function iniciarJogo() {
    estadoDoJogo = {};
    mostrarCenario(0);
}

function mostrarCenario(idCenario) {
    const cenarioAtual = cenarios[idCenario];
    tituloElemento.innerText = cenarioAtual.titulo;
    textoElemento.innerText = cenarioAtual.texto;
    opcoesContainerElemento.innerHTML = '';

    cenarioAtual.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.innerText = opcao.texto;
        button.classList.add('opcao-btn');
        button.addEventListener('click', () => escolherOpcao(opcao));
        opcoesContainerElemento.appendChild(button);
    });
}

function escolherOpcao(opcao) {
    const proximoIdCenario = opcao.proximoCenario;
    if (proximoIdCenario < 0) {
        return iniciarJogo();
    }
    mostrarCenario(proximoIdCenario);
}

iniciarJogo();