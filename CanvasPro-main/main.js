import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 1000;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.eggs = [];
            this.bombs = [];
        }

        update() {
            this.player.update(this.input.keys);

            // Update egg and bomb positions
            this.eggs.forEach((egg) => egg.y += 2);
            this.bombs.forEach((bomb) => bomb.y += 2);

            // Remove off-screen eggs and bombs
            this.eggs = this.eggs.filter((egg) => egg.y < this.height);
            this.bombs = this.bombs.filter((bomb) => bomb.y < this.height);

            // Check for collisions
            this.checkCollisions();

            // Randomly spawn eggs and bombs
            if (Math.random() < 0.04) {
                const eggColor = getRandomColor();
                this.eggs.push({ x: Math.random() * this.width, y: 0, color: eggColor });
            }

            if (Math.random() < 0.005) {
                this.bombs.push({ x: Math.random() * this.width, y: 0 });
            }
        }

        checkCollisions() {
            // Check collision with eggs
            this.eggs.forEach((egg, index) => {
                if (
                    egg.x < this.player.x + this.player.width &&
                    egg.x + 32 > this.player.x &&
                    egg.y < this.player.y + this.player.height &&
                    egg.y + 45 > this.player.y
                ) {
                    // Collision with egg
                    this.eggs.splice(index, 1);
                    // Handle collision logic (e.g., increase score)
                }
            });

            // Check collision with bombs
            this.bombs.forEach((bomb, index) => {
                if (
                    bomb.x < this.player.x + this.player.width &&
                    bomb.x + 45 > this.player.x &&
                    bomb.y < this.player.y + this.player.height &&
                    bomb.y + 45 > this.player.y
                ) {
                    // Collision with bomb
                    this.bombs.splice(index, 1);
                    // Handle collision logic (e.g., decrease health)
                }
            });
        }

        draw(context) {
            this.player.draw(context);

            // Draw eggs
            this.eggs.forEach((egg) => this.drawEgg(egg.x, egg.y, egg.color));

            // Draw bombs
            this.bombs.forEach((bomb) => this.drawBomb(bomb.x, bomb.y));
        }

        drawEgg(x, y, color) {
            const radiusX = 32;
            const radiusY = 45;

            ctx.beginPath();
            ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        drawBomb(x, y) {
            ctx.beginPath();
            ctx.arc(x, y, 45, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.closePath();
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();

    function getRandomColor() {
        const colors = ['#f5bda1', '#a1cdf5', '#a1f5b4']; // Add more colors as needed
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
