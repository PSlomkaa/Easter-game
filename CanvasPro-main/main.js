import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
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
      this.score = 0;
      this.lives = 3; // Added lives attribute
      this.isGameOver = false;
      this.backgroundImage = document.getElementById("bg");
      this.gameSpeed = 2
    }

    update() {
      if (this.isGameOver) return;

      this.player.update(this.input.keys);

      // Update egg and bomb positions
      this.eggs.forEach((egg, index) => (egg.y += this.gameSpeed));
      this.bombs.forEach((bomb, index) => (bomb.y += this.gameSpeed));

      // Remove off-screen eggs and bombs
      this.eggs = this.eggs.filter((egg) => egg.y < this.height + 45);
      this.bombs = this.bombs.filter((bomb) => bomb.y < this.height +45);

      // Check for collisions
      this.checkCollisions();

      // Randomly spawn eggs and bombs
      if (Math.random() < 0.03) {
        const eggColor = getRandomColor();
        const x = Math.random() * this.width
        let collide = 0
        this.eggs.forEach((egg, index) => {
          if(egg.x < x + 64 && egg.x + 64 > x && egg.y <100 ){
            collide++
          }
        })
        this.bombs.forEach( (bomb, index) => {
          if(bomb.x < x + 78 && bomb.x + 78 > x && bomb.y < 100 ){
            collide++
          }
        } )
        if(!collide){
          this.eggs.push({
          x: x,
          y: 0,
          color: eggColor,
          })
        }
        collide = 0;
      }

      if (Math.random() < 0.008) {
        const x = Math.random() * this.width
        let collide = 0
        this.eggs.forEach((egg, index) => {
          if(egg.x < x + 78 && egg.x + 78 > x && egg.y <100 ){
            collide++
          }
        })
        this.bombs.forEach( (bomb, index) => {
          if(bomb.x < x + 91 && bomb.x + 91 > x && bomb.y < 100 ){
            collide++
          }
        } )
        if(!collide){
          this.bombs.push({ x: x, y: 0 });
        }
        collide =0;
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
          this.score++;
          this.gameSpeed+= 0.01 *this.gameSpeed
          this.player.maxSpeed += 0.1
        }
      });

      // Check collision with bombs
      this.bombs.forEach((bomb, index) => {
        if (
          bomb.x < this.player.x + this.player.width &&
          bomb.x + 20 > this.player.x &&
          bomb.y < this.player.y + this.player.height &&
          bomb.y + 20 > this.player.y
        ) {
          // Collision with bomb
          this.lives--;
          if (this.lives <= 0) {
            this.gameOver();
          } else {
            // Remove bomb after collision
            this.bombs.splice(index, 1);
          }
        }
      });
    }

    gameOver() {
      this.isGameOver = true;
      addLink();
      // You can add more game over logic here
      showEndScreen();
    }

    draw(context) {
      //Draw background
      this.drawBackground();

      // Draw eggs
      this.eggs.forEach((egg) => this.drawEgg(egg.x, egg.y, egg.color));

      // Draw bombs
      this.bombs.forEach((bomb) => this.drawBomb(bomb.x, bomb.y));

      this.player.draw(context);

      // Draw score, lives, and game over screen
      this.drawScore();
      this.drawLives();
      if (this.isGameOver) {
        showEndScreen();
      }
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
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
    }

    drawScore() {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Score: " + this.score, 10, 30);
    }

    drawBackground() {
      ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }

    drawLives() {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Lives: " + this.lives, this.width - 100, 30);
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
    const colors = ["#f5bda1", "#a1cdf5", "#a1f5b4"]; // Add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function showEndScreen() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 50);
    ctx.fillText(
      "Score: " + game.score,
      canvas.width / 2 - 70,
      canvas.height / 2
    );
  }

  function addLink() {
    let scoreLinkSpan = document.getElementById("score");
    scoreLinkSpan.innerHTML = `Your score: ${game.score}. <br> <a href="addScore/add.html">Click to add score to the Database</a>`;
    console.log(game.score);
    localStorage.setItem("score", game.score);
  }
});
