// Game State
const gameState = {
    isRunning: false,
    gameOver: false,
    winner: null,
    finishLine: 800
};

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 400;

// Game Objects
let player = new Player(50, 150);
let enemy = new Enemy(50, 250);

// Game Loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw finish line
    drawFinishLine();
    
    if (!gameState.isRunning) {
        drawStartScreen();
    } else if (gameState.gameOver) {
        drawGameOverScreen();
    } else {
        // Update game
        player.update(keys);
        enemy.update();
        
        // Draw objects
        player.draw(ctx);
        enemy.draw(ctx);
        
        // Draw HUD
        drawHUD();
        
        // Check win condition
        checkWinCondition();
    }
    
    requestAnimationFrame(gameLoop);
}

function drawFinishLine() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(gameState.finishLine, 0);
    ctx.lineTo(gameState.finishLine, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('FINISH', gameState.finishLine - 30, 20);
}

function drawStartScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DRAGSTER RACE', canvas.width / 2, 100);
    
    ctx.font = '24px Arial';
    ctx.fillText('Pressione ESPAÇO para começar', canvas.width / 2, 200);
    ctx.fillText('Use SETA PARA CIMA ou W para acelerar', canvas.width / 2, 240);
}

function drawGameOverScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    
    if (gameState.winner === 'player') {
        ctx.fillStyle = '#00ff00';
        ctx.fillText('VOCÊ VENCEU! 🏆', canvas.width / 2, 150);
    } else {
        ctx.fillStyle = '#ff0000';
        ctx.fillText('VOCÊ PERDEU! 💔', canvas.width / 2, 150);
    }
    
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Pressione ESPAÇO para jogar novamente', canvas.width / 2, 250);
}

function drawHUD() {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Você: ${Math.floor(player.x)}m`, 20, 30);
    ctx.fillText(`Adversário: ${Math.floor(enemy.x)}m`, 20, 60);
    ctx.fillText(`Velocidade: ${Math.floor(player.velocity * 100)}%`, 20, 90);
}

function checkWinCondition() {
    if (player.x >= gameState.finishLine && !gameState.gameOver) {
        gameState.gameOver = true;
        gameState.winner = 'player';
    } else if (enemy.x >= gameState.finishLine && !gameState.gameOver) {
        gameState.gameOver = true;
        gameState.winner = 'enemy';
    }
}

// Start game with spacebar
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (!gameState.isRunning && !gameState.gameOver) {
            gameState.isRunning = true;
        } else if (gameState.gameOver) {
            // Reset game
            gameState.isRunning = false;
            gameState.gameOver = false;
            gameState.winner = null;
            player = new Player(50, 150);
            enemy = new Enemy(50, 250);
        }
    }
});

// Start the game loop
gameLoop();