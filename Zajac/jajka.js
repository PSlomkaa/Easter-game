const canvas = document.getElementById('eggCanvas');
const ctx = canvas.getContext('2d');
let eggY = 50;
let bombY = 75;
        
let readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initGame();
    }
}, 10);
        
function initGame() {
     setInterval(update, 1000 / 60);
}
        
function update() {
    clearCanvas();
    drawEgg();
    drawBomb();

    eggY += 2;
    bombY += 2;
}
        
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
        
function drawEgg() {
    const centerX = 500;
    const radiusX = 32;
    const radiusY = 45;
        
    ctx.beginPath();
    ctx.ellipse(centerX, eggY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#f5bda1';
    ctx.fill();
    ctx.closePath();
}
        
function drawBomb() {
    ctx.beginPath();
    ctx.arc(100, bombY, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}