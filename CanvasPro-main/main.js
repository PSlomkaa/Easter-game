import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener('load', function() {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 1200;

    class Game {
        constructor(width,height) {
            this.width = width;
            this.height = height;
            this.Player = new Player(this);
            this.input = new InputHandler(this);
        }
        update() {
            this.Player.update(this.input.keys);
        }
        draw(context) {
            this.Player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})