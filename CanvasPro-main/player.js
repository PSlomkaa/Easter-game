export class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 120;
        this.x = 0;
        this.x = (this.game.width-this.width)/2;
        this.y = this.game.height - this.height +20;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 15;
        this.jumpForce = 0;
        this.maxJumpForce = 50;
        this.maxSpeed = 10;
        this.gravity = 0;
        this.gravityForce = 10;
    }
    update(input) {
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed //this.x++;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed //this.x--;
        else this.speed = 0;
        if(this.jumpForce>0){

            this.jumpForce -= this.gravityForce
        }else if (this.jumpForce == 0){
            this.y += this.gravityForce;
        }
        this.x += this.speed;
        this.y -= this.jumpForce;
        this.speed = 0;
        if (input.includes('ArrowRight')) this.speed += this.maxSpeed //this.x++;
        if (input.includes("space")&&this.y >= this.game.height - this.height) this.jumpForce = this.maxJumpForce; console.log(this.jumpForce); 
        if (input.includes('ArrowLeft')) this.speed += -this.maxSpeed //this.x--;

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height +20    
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}