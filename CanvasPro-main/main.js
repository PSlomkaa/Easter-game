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
      this.eggImage1 = document.getElementById("jajko1");
      this.eggImage2 = document.getElementById("jajko2");
      this.eggImage3 = document.getElementById("jajko3");
      this.bombImage = document.getElementById("bomba");
    }
    update() {
      if (this.isGameOver) return;
      this.player.update(this.input.keys);
      
      this.eggs.forEach((egg, index) => (egg.y += this.gameSpeed));
      this.bombs.forEach((bomb, index) => (bomb.y += this.gameSpeed));

      this.eggs = this.eggs.filter((egg) => egg.y < this.height + 45);
      this.bombs = this.bombs.filter((bomb) => bomb.y < this.height + 45);

      this.checkCollisions();

      if (Math.random() < 0.03) {
        const eggNumber = getRandomNumber();
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
          color: eggNumber,
          })
        }
        collide = 0
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
        collide=0;
    }}
    checkCollisions() {
      // Check collision with eggs
      this.eggs.forEach((egg, index) => {
        if (
          egg.x < this.player.x + this.player.width &&
          egg.x + 32 > this.player.x &&
          egg.y < this.player.y + this.player.height &&
          egg.y + 55 > this.player.y
        ) {
          // Collision with egg
          this.eggs.splice(index, 1);
          this.score++;
          this.gameSpeed+= 0.01 *this.gameSpeed
          this.player.maxSpeed += 0.1
        }
      });

      this.bombs.forEach((bomb, index) => {
 if (
   bomb.x + 10< this.player.x + this.player.width &&
   bomb.x > this.player.x &&
   bomb.y < this.player.y + this.player.height &&
   bomb.y + 20> this.player.y
 ) {
   this.lives--;
   if (this.lives <= 0) {
     this.gameOver();
   } else {
     this.bombs.splice(index, 1);
   }
 }
      });
    }

    gameOver() {
      this.isGameOver = true;
      showEndScreen();
    }

    draw(context) {
      this.drawBackground();

      this.eggs.forEach((egg) => this.drawEgg(egg.x, egg.y, egg.color));

      this.bombs.forEach((bomb) => this.drawBomb(bomb.x, bomb.y));

      this.player.draw(context);

      this.drawScore();
      this.drawLives();
      if (this.isGameOver) {
 showEndScreen();
      }
    }

    drawEgg(x, y, color) {
      const width = 64;
      const height = 90;
      switch(color){
        case 1:
          ctx.drawImage(this.eggImage1,x,y,width,height)
          break
        case 2:
          ctx.drawImage(this.eggImage2,x,y,width,height)
          break
        case 3:
          ctx.drawImage(this.eggImage3,x,y,width,height)
          break
      }
      // ctx.beginPath();
      // ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      // ctx.fillStyle = color;
      // ctx.fill();
      // ctx.closePath();
    }

    drawBomb(x, y) {
      const r = 100
      
      ctx.drawImage(this.bombImage,x-50,y-50,r,r)
      // ctx.beginPath();
      // ctx.arc(x, y, 45, 0, Math.PI * 2);
      // ctx.fillStyle = "#000";
      // ctx.fill();
      // ctx.closePath();
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

  function getRandomNumber() {
    const numbers = [1, 2, 3];
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  function showEndScreen() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 70);
    ctx.fillText(
    "Score: " + game.score,
    canvas.width / 2 - 100,
    canvas.height / 2 - 30
     );

     ctx.fillStyle = "#4CAF50";
    ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2, 200, 40);
     ctx.font = "20px Arial";
     ctx.fillStyle = "#fff";
     ctx.fillText("Play Again", canvas.width / 2 - 50, canvas.height / 2 + 25);

     ctx.fillStyle = "#10D3E8";
     ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 45, 200, 40);
     ctx.font = "20px Arial";
     ctx.fillStyle = "#fff";
     ctx.fillText("Save Score", canvas.width / 2 - 50, canvas.height / 2 + 72);

     // Dodaj event listener dla przycisku "Save Score"
     canvas.addEventListener("click", handleCanvasClick);
 }

 function handleCanvasClick(event) {
     const x = event.clientX - canvas.getBoundingClientRect().left;
     const y = event.clientY - canvas.getBoundingClientRect().top;

     if (
  x > canvas.width / 2 - 100 &&
  x < canvas.width / 2 + 100 &&
  y > canvas.height / 2 &&
  y < canvas.height / 2 + 40
     ) {
  playAgain();
     } else if (
  x > canvas.width / 2 - 100 &&
  x < canvas.width / 2 + 100 &&
  y > canvas.height / 2 + 45 &&
  y < canvas.height / 2 + 85
     ) {
  goToSaveScorePage();
     }
 }

 function goToSaveScorePage() {
     window.location.href = "addScore/add.html";
 }

 function playAgain() {
     window.location.reload();
 }

 showEndScreen();
});
