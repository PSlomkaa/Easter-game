export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 15;
    }
    update(input) {
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed //this.x++;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed //this.x--;
        else this.speed = 0;

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}