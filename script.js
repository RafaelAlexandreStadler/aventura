const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');

// O estado do jogo
let currentState = 'start';
let inventory = [];

// O mapa da história (os diferentes estados e suas opções)
const storyMap = {
    start: {
        text: 'Você acorda em uma clareira escura. O som de um riacho próximo é a única coisa que quebra o silêncio da floresta.',
        choices: [
            { text: 'Seguir o som do riacho', nextState: 'riacho' },
            { text: 'Explorar a floresta escura', nextState: 'floresta' }
        ]
    },
    riacho: {
        text: 'Você encontra um riacho calmo. Um brilho estranho vindo da água chama sua atenção. Você decide...',
        choices: [
            { text: 'Pegar o objeto que brilha', nextState: 'objetoBrilhante' },
            { text: 'Atravessar o riacho', nextState: 'atravessarRiacho' }
        ]
    },
    floresta: {
        text: 'Você se aventura na floresta. A escuridão é densa e você ouve um farfalhar nas moitas.',
        choices: [
            { text: 'Ficar parado e esperar', nextState: 'ficarParado' },
            { text: 'Correr na direção oposta', nextState: 'correr' }
        ]
    },
    objetoBrilhante: {
        text: 'Você pega o objeto: é uma **pedra mágica** que ilumina levemente o caminho. Você a coloca no seu bolso e continua sua jornada.',
        item: 'pedra magica',
        choices: [
            { text: 'Caminhar para a direita (em direção à montanha)', nextState: 'montanha' },
            { text: 'Caminhar para a esquerda (em direção a um castelo distante)', nextState: 'castelo' }
        ]
    },
    atravessarRiacho: {
        text: 'Ao tentar atravessar o riacho, a correnteza é forte e te arrasta. Você perde a consciência e a aventura termina aqui. Fim de jogo.',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    ficarParado: {
        text: 'Um urso sai das moitas e te ataca. Você não tem tempo de reagir. Fim de jogo.',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    correr: {
        text: 'Você corre e consegue despistar o que quer que estivesse na moita. Eventualmente, você encontra uma estrada e é resgatado. Você Venceu!',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    montanha: {
        text: 'Você chega à base de uma montanha. Uma caverna escura parece promissora. Você entra. A escuridão é total.',
        choices: [
            { text: 'Tentar tatear no escuro', nextState: 'cavernaEscura' },
            { text: 'Usar a pedra mágica (se você a tiver)', nextState: 'cavernaIluminada' }
        ]
    },
    castelo: {
        text: 'Você caminha por horas até chegar aos portões de um castelo imponente. Guardas orcs bloqueiam a entrada.',
        choices: [
            { text: 'Atacar os guardas (arrisca a vida)', nextState: 'lutarComOrcs' },
            { text: 'Tentar se esgueirar pela parede', nextState: 'esgueirar' }
        ]
    },
    cavernaEscura: {
        text: 'Você se move no escuro, mas tropeça e cai em um buraco profundo. Fim de jogo.',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    cavernaIluminada: {
        text: 'Você usa a pedra mágica e a caverna se ilumina. No fundo, você encontra um baú de tesouros! Você se torna rico e vive feliz para sempre. Você Venceu!',
        requiredItem: 'pedra magica',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    lutarComOrcs: {
        text: 'Você tenta lutar, mas os orcs são muitos e te derrotam facilmente. Fim de jogo.',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
    esgueirar: {
        text: 'Você escala a parede do castelo e entra sem ser visto. Você encontra um prisioneiro que revela o segredo de uma passagem secreta para fora da floresta. Você Venceu!',
        choices: [
            { text: 'Começar de novo', nextState: 'start' }
        ]
    },
};

// Função para atualizar a tela com base no estado atual
function updateScreen() {
    const state = storyMap[currentState];
    storyText.textContent = state.text;

    // Adiciona o item ao inventário, se houver
    if (state.item) {
        inventory.push(state.item);
    }
    
    // Remove os botões antigos
    choicesContainer.innerHTML = '';
    
    // Cria novos botões para as escolhas
    state.choices.forEach(choice => {
        // Verifica se a escolha tem um item obrigatório
        if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
            // Se o jogador não tem o item, muda o texto da opção
            const button = document.createElement('button');
            button.textContent = 'Você não tem o item necessário para esta ação.';
            button.disabled = true; // Desabilita o botão
            choicesContainer.appendChild(button);
        } else {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                currentState = choice.nextState;
                updateScreen();
            });
            choicesContainer.appendChild(button);
        }
    });
}

// Inicia o jogo
updateScreen();