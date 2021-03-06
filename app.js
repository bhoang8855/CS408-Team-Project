var gameScore = 0;
// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = 80 + (row - 1) * 100;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 700) this.x = -100;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Enemy.prototype.reset = function() {
    this.x = -100;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 350;
    this.y = 750;
    this.score = 0;
    this.sprite = 'Images/mario.png';

}
Player.prototype.update = function() {
    this.x = 350;
    this.y = 750;
    this.score = this.score + 1;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    if ( key === 'left'|| key=='left2' ) {
        if ( this.x > 0 ) {
            this.x = this.x - 100;
        }
    }
    else if ( key === 'right' ||key=='right2' ) {
        if ( this.x < 600) {
            this.x = this.x + 100;
        }
    }
    else if ( key === 'up'|| key=='up2' ) {
        if ( this.y > 0 ) {
            this.y = this.y - 80;
        }
    }
    else if ( key === 'down' || key=='down2') {
        if ( this.y < 750 ) {
            this.y = this.y + 80;
        }
    }
}
Player.prototype.reset = function() {
    this.x = 350;
    this.y = 750;
    this.score = 0;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var myScore = 0;
for (var i = 0; i < 6; i++) {
    if(i%2==0) {
        var random_speed = getRandomNumber(10, 31) * 13;
        var random_row = getRandomNumber(1, 7);
        allEnemies[i] = new Enemy(random_row, random_speed);
        allEnemies[i].sprite = 'Images/koopa.png';
    }
    else{
        var random_speed = getRandomNumber(10, 31) * 7;
        var random_row = getRandomNumber(1, 7);
        allEnemies[i] = new Enemy(random_row, random_speed);
        allEnemies[i].sprite = 'Images/goomba.png';
    }
}
var player = new Player();
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left2',
        87:'up2',
        68: 'right2',
        83:'down2'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
