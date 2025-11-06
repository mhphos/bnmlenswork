const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');

let playerPos = 175;
let obstacles = [];
let score = 0;
let gameSpeed = 2;
let gameOver = false;

document.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){
        playerPos -= 20;
        if(playerPos < 0) playerPos = 0;
        player.style.left = playerPos + 'px';
    } else if(e.key === 'ArrowRight'){
        playerPos += 20;
        if(playerPos > gameArea.offsetWidth - 50) playerPos = gameArea.offsetWidth - 50;
        player.style.left = playerPos + 'px';
    }
});

function createObstacle() {
    const obs = document.createElement('div');
    obs.classList.add('obstacle');
    obs.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    obs.style.top = '0px';
    gameArea.appendChild(obs);
    obstacles.push(obs);
}

function moveObstacles() {
    obstacles.forEach((obs, index) => {
        let top = parseInt(obs.style.top);
        top += gameSpeed;
        obs.style.top = top + 'px';

        // Collision detection
        if(top + 50 >= gameArea.offsetHeight &&
           parseInt(obs.style.left) < playerPos + 50 &&
           parseInt(obs.style.left) + 50 > playerPos) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
            location.reload();
        }

        // Remove offscreen obstacles
        if(top > gameArea.offsetHeight){
            obs.remove();
            obstacles.splice(index,1);
            score++;
        }
    });
}

function gameLoop() {
    if(!gameOver){
        if(Math.random() < 0.02) createObstacle();
        moveObstacles();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
