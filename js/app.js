// random number function
function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// set score variable
let score = 0;
// Character class object
class Character{
    constructor(horizontal, vertical, speed){
        this.x = horizontal;
        this.y = vertical;
    }
}

// Enemy class object, extended from Character class object
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

// These are the new bug Objects
let firstBug = new Enemy(88, 54, randomNum(600, 150));
let secondBug = new Enemy(88, 137, randomNum(600, 150));
let thirdBug = new Enemy(88, 220, randomNum(600, 150));

// Player class object, extended from Character class object
class Player extends Character {
    constructor() {
        super();
        this.sprite = 'images/char-boy.png';
        // default position for sprite
        this.x = 202;
        this.y = 386;
    }
    update() {
        // handle collisions loop
        for(let i = 0; i < 3; i++) {
            // checks to see if the sprite is in the same place as the enemy
            if (Math.abs(player.x - allEnemies[i].x) <= 70 && (player.y === allEnemies[i].y)) {
                // This is where the player resets to if collision condition happens
                this.x = 202;
                this.y = 386;
                // set score at 0
                score = 0;
                // have innerHTML update to 0 when collision happens
                document.getElementById('score').innerHTML = "Score: " + 0;
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(arrowKeys) {
        switch(arrowKeys) {
            case 'left':
            this.x -= 101;
            // sets boundry
            if (this.x < 0) {
                this.x = 0;
            }
            break;
            case 'up':
            this.y -= 83;
            // checks to see if player has hit the water
            if (this.y < -15) {
                // reset to default position
                this.y = 386;
                this.x = 202;
                // increments the score
                score += 1;
                // checks to see if player has won (score = 5)
                if (score === 5) {
                    alert('Your score is 5, you have won the game!');
                    score = 0;
                }
            }
            break;
            case 'right':
            this.x += 101
            // sets boundry;
            if (this.x > 404) {
                this.x = 404;
            }
            break;
            case 'down':
            this.y += 83;
            // sets boundry
            if (this.y > 400) {
                this.y = 386;
            }
            break;
        }
        // update scoreboard
        document.getElementById('score').innerHTML = "Score: " + score;
    }
}
// places the player object in player variable
let player = new Player();
// place enemies in allEnemies array
let allEnemies = [firstBug, secondBug, thirdBug];

// This listens for key presses and sends the keys
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});