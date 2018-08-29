"use strict";

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Character{
    constructor(horizontal, vertical, speed){
        this.x = horizontal;
        this.y = vertical;
    }
}

class Enemy extends Character {
    constructor(horizontal, vertical, speed) {
        super(horizontal, vertical, speed);
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 515) {
            this.x = -125;
            this.speed = randomNum(600, 150);
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let firstBug = new Enemy;
let secondBug = new Enemy;
let thirdBug = new Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor() {
        super();
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 386;
    }
    update() {
        for(let i = 0; i < 3; i++) {
            if (Math.abs(player.x - allEnemies[i].x) <= 81 && (player.y === allEnemies[i].y)) {
                this.x = 202;
                this.y = 386;
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [firstBug, secondBug, thirdBug];
// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
