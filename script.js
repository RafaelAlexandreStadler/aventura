document.addEventListener('DOMContentLoaded', (event) => {
    // Seleciona o botão e o elemento de mensagem pelo ID
    const botaoSegredo = document.getElementById('botao-segredo');
    const mensagemSecreta = document.getElementById('mensagem-secreta');

    // Adiciona um "ouvinte de evento" (event listener) de clique ao botão
    botaoSegredo.addEventListener('click', () => {
        // Altera o estilo para mostrar a mensagem
        mensagemSecreta.style.display = 'block';
    });
});