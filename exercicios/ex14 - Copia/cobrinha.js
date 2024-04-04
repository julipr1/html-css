const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Tamanho do quadrado da cobrinha
const squareSize = 20;

// Posição inicial da cobrinha
let snake = [
  { x: 150, y: 150 },
  { x: 130, y: 150 },
  { x: 110, y: 150 },
  { x: 90, y: 150 },
  { x: 70, y: 150 },
];

// Direção atual da cobrinha
let direction = 'right';

// Posição atual da maçã
let apple = { x: 300, y: 300 };

// Desenha a cobrinha
function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = 'green';
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(snakePart.x, snakePart.y, squareSize, squareSize);
  ctx.strokeRect(snakePart.x, snakePart.y, squareSize, squareSize);
}

// Desenha a maçã
function drawApple() {
  ctx.fillStyle = 'red';
  ctx.strokestyle = 'darkred';
  ctx.fillRect(apple.x, apple.y, squareSize, squareSize);
  ctx.strokeRect(apple.x, apple.y, squareSize, squareSize);
}

// Atualiza a posição da cobrinha
function advanceSnake() {
  // Adiciona um novo quadrado na direção atual da cobrinha
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case 'left':
      head.x -= squareSize;
      break;
    case 'right':
      head.x += squareSize;
      break;
    case 'up':
      head.y -= squareSize;
      break;
    case 'down':
      head.y += squareSize;
      break;
  }
  snake.unshift(head);

  // Verifica se a cobrinha comeu a maçã
  const didEatApple = snake[0].x === apple.x && snake[0].y === apple.y;
  if (didEatApple) {
    // Faz a maçã aparecer em uma nova posição aleatória
    apple.x = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
    apple.y = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
  } else {
    // Caso contrário, remove o último quadrado da cobrinha
    snake.pop();
  }
}

// Verifica se a cobrinha colidiu com a borda do canvas
function didCollide() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - squareSize;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - squareSize;
  return hitLeftWall = hitRightWall;  hitToptWall || hitBottomWall;
}

// Desenha tudo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
}

// Atualiza o jogo
function update() {
  if (didCollide()) {
    // Game over!
    return;
  }
  advanceSnake();
  draw();
  setTimeout(update, 100);
}

// Captura as teclas pressionadas pelo usuário
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
  }
});

update();