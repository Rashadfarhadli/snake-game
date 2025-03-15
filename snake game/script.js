// Canvas elementini seç
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Yılanın başı, boyutları ve hareket hızını tanımla
let snake = [
    { x: 50, y: 50 },
    { x: 40, y: 50 },
    { x: 30, y: 50 }
];
let snakeDirection = 'RIGHT';  // Yılanın ilk yönü
let food = { x: 80, y: 80 };  // Yiyecek yerini başlat
let score = 0;  // Puan başlangıcı

// Oyun hızı
const gameSpeed = 100; // Yılanın hareket hızı (ms)
let gameInterval;

// Yılanın hareketini başlatan fonksiyon
function moveSnake() {
    let head = { ...snake[0] };

    if (snakeDirection === 'UP') head.y -= 10;
    if (snakeDirection === 'DOWN') head.y += 10;
    if (snakeDirection === 'LEFT') head.x -= 10;
    if (snakeDirection === 'RIGHT') head.x += 10;

    snake.unshift(head);  // Yılanın başını ekle
    if (head.x === food.x && head.y === food.y) {
        // Yılan yediği zaman yiyeceği yenile
        score++;
        document.getElementById("scoreText").textContent = score;
        generateFood(); // Yeni yiyecek oluştur
    } else {
        snake.pop();  // Yılanın kuyruk kısmını çıkar
    }
    
    // Yılanın kendisine çarpmasını kontrol et
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            resetGame(); // Yılan kendine çarptıysa oyunu sıfırla
        }
    }

    // Oyun alanından çıkmasını engelle
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame(); // Yılan duvara çarptıysa oyunu sıfırla
    }

    drawGame();  // Yılanı ve yemeği çiz
}

// Yılanı ve yiyeceği çizme fonksiyonu
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Ekranı temizle
    ctx.fillStyle = "#00FF00";  // Yılan rengi
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);  // Yılanın her parçasını çiz
    }

    ctx.fillStyle = "#FF0000";  // Yiyecek rengi
    ctx.fillRect(food.x, food.y, 10, 10);  // Yiyeceği çiz
}

// Yiyecek yerini rastgele belirleme
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Oyun sıfırlama fonksiyonu
function resetGame() {
    snake = [
        { x: 50, y: 50 },
        { x: 40, y: 50 },
        { x: 30, y: 50 }
    ];
    snakeDirection = 'RIGHT';
    score = 0;
    document.getElementById("scoreText").textContent = score;
    generateFood();  // Yeni yiyecek oluştur
}

// Oyun başlatma
function startGame() {
    gameInterval = setInterval(moveSnake, gameSpeed);
}

// Butonlar ile yön kontrolü
document.getElementById("up").addEventListener("click", () => {
    if (snakeDirection !== 'DOWN') {
        snakeDirection = 'UP';
    }
});

document.getElementById("down").addEventListener("click", () => {
    if (snakeDirection !== 'UP') {
        snakeDirection = 'DOWN';
    }
});

document.getElementById("left").addEventListener("click", () => {
    if (snakeDirection !== 'RIGHT') {
        snakeDirection = 'LEFT';
    }
});

document.getElementById("right").addEventListener("click", () => {
    if (snakeDirection !== 'LEFT') {
        snakeDirection = 'RIGHT';
    }
});

startGame();
