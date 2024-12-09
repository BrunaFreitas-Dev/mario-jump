const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let jumpCount = 0;
let gameOver = false;

const jump = () => {
    mario.classList.add('jump');
    jumpCount++;
    document.getElementById('jump-counter').textContent = jumpCount;

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const startGame = () => {
    const loop = setInterval(() => {
        if (gameOver) return;

        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOver = true;

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './Imagens/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            document.querySelector('.game-over-message').classList.remove('hidden');

            clearInterval(loop);
        }
    }, 10);
};

document.addEventListener('keydown', jump);

document.getElementById('restart-button').addEventListener('click', () => {
    jumpCount = 0;
    document.getElementById('jump-counter').textContent = jumpCount;
    gameOver = false;

    document.querySelector('.game-over-message').classList.add('hidden');

    pipe.style.animation = 'pipe-animation 1.2s infinite linear';
    pipe.style.left = '100%';

    mario.src = './Imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.animation = '';

    startGame();
});

// Pré-carregar imagem de game over
const gameOverImage = new Image();
gameOverImage.src = './Imagens/game-over.png';

// Iniciar o jogo
startGame();

