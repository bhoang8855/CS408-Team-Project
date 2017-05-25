var gameScore = 1;
// Enemy object
var Enemy = function(row, speed) {
    // x & y represent the initial position of enemies
    this.x = -100;
    this.y = 80 + (row - 1) * 100;
    this.speed = speed;
}
// Update the enemy's position
// dt - a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Movement is multiplied by dt to ensure game runs
    // at same speed for all computers.
    this.x = this.x + this.speed * dt;
    // if enemy reaches the end of the screen revert to beginning
    if (this.x > 700) this.x = -100;
    checkCollisions(this);
}
// Render the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Reset the horizontal position of enemies
Enemy.prototype.reset = function() {
    this.x = -100;
}
// Player object
var Player = function() {
    this.x = 350;
    this.y = 750;
    this.score = 0;
    this.sprite = 'Images/mario.png';

}
// Resets the player's position and updates the score
Player.prototype.update = function() {
    this.x = 350;
    this.y = 750;
    this.score = this.score + 1;
}
// Render the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Handles keyboard input for player movement
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
// Resets the player's position and score
Player.prototype.reset = function() {
    this.x = 350;
    this.y = 750;
    this.score = 0;
}

// Generates koopas and goombas as enemies
var generateEnemies = function(numEnemies) {
    for (var i = 0; i < numEnemies; i++) {
        if(i%2==0) {
            var random_speed = getRandomNumber(10, 31) * 13;
            var random_row = getRandomNumber(1, 8);
            koopa = new Enemy(random_row, random_speed);
            koopa.sprite = 'Images/koopa.png';
            allEnemies.push(koopa);
        }
        else{
            var random_speed = getRandomNumber(10, 31) * 7;
            var random_row = getRandomNumber(1, 8);
            goomba = new Enemy(random_row, random_speed);
            goomba.sprite = 'Images/goomba.png';
            allEnemies.push(goomba);
        }
    }
}

// Checks collisions with enemy and if player reaches the top
var checkCollisions = function(anEnemy) {
    allEnemies.forEach(function(enemy) {
        if ( Math.round(enemy.x / 100) === Math.round(player.x / 100) &&
             Math.round(enemy.y / 100) === Math.round(player.y / 100) ) {
                player.reset();
                allEnemies.forEach(function(enemy) {
                  enemy.reset();
                });
                allEnemies.length = 0;
                gameScore = 1;
                // Back to level 1
                generateEnemies(gameScore);
                console.log("Number of enemies = " + gameScore);
        }
    });

    if(player.y < 80){
        console.log('You made it!');
        gameScore += 1;
        increaseDifficulty(gameScore);
    }
}

// Increases the number of enemies
var increaseDifficulty = function(numEnemies) {
  // remove all previous enemies on screen
  allEnemies.length = 0;

  // Generate new set of enemies
  generateEnemies(numEnemies);
  console.log("Game Score = " + gameScore);
}

var allEnemies = [];
var myScore = 0;
generateEnemies(gameScore);

var player = new Player();
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// Listens for key presses and sends the keys to the
// Player.handleInput() method.
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
