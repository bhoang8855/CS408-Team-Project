/**
 * Arian Cuellar & Brian Hoang
 * CS408 Group Project
 * Created a Frogger esque game in Javascript
 */

var enemyLevel = 1;
var allEnemies = [];
var player = new Player();
generateEnemies(enemyLevel);
// Enemy object
function Enemy(row, speed) {
    // x & y represent the initial position of enemies
    this.x = -100;
    this.y = 80 + (row - 1) * 100;
    this.speed = speed;

    // Update the enemy's position
    // delta - a time delta between ticks
    this.update=function(delta) {
        // Movement is multiplied by delta to ensure game runs
        // at same speed for all computers.
        this.x += (this.speed * delta);
        // if enemy reaches the end of the screen revert to beginning
        if (this.x > 700)
            this.reset();
        checkCollisions(this);
    }

    // Render the enemy on the screen
    this.render=function() {
        ctx.drawImage(getImage(this.sprite), this.x, this.y);
    }

    // Reset the horizontal position of enemies
    this.reset=function() {
        this.x = -100;
    }

}

// Player object
function Player() {
    this.x = 350;
    this.y = 750;
    this.score = 0;
    this.sprite = 'Images/mario.png';

    // Resets the player's position and updates the score
    this.update=function() {
        this.x = 350;
        this.y = 750;
        this.score += 1;
    }

    // Render the player on the screen
    this.render=function() {
        ctx.drawImage(getImage(this.sprite), this.x, this.y);
    }

    // Handles keyboard input for player movement
    this.handleInput =function(key) {
        if ( key === 'left'|| key=='left2' ) {
            if ( this.x > 0 ) {
                this.x -=100;
            }
        }
        else if ( key === 'right' ||key=='right2' ) {
            if ( this.x < 600) {
                this.x += 100;
            }
        }
        else if ( key === 'up'|| key=='up2' ) {
            if ( this.y > 0 ) {
                this.y -= 95;
            }
        }
        else if ( key === 'down' || key=='down2') {
            if ( this.y < 750 ) {
                this.y += 95;
            }
        }
    }

    // Resets the player's position and score
    this.reset=function() {
        this.x = 350;
        this.y = 750;
        this.score = 0;
    }

}

// Generates koopas and goombas as enemies
function generateEnemies(numEnemies) {
    for (var i = 0; i < numEnemies; i++) {
        if(i%2==0) {
            var random_speed = (Math.floor(Math.random() * 21) + 10) * 15;
            var random_row = (Math.floor(Math.random() * 7) + 1);
            koopa = new Enemy(random_row, random_speed);
            koopa.sprite = 'Images/koopa.png';
            allEnemies.push(koopa);
        }
        else{
            var random_speed = (Math.floor(Math.random() * 21) + 10) * 10;
            var random_row = (Math.floor(Math.random() * 7) + 1);
            goomba = new Enemy(random_row, random_speed);
            goomba.sprite = 'Images/goomba.png';
            allEnemies.push(goomba);
        }
    }
}

// Checks collisions with enemy and if player reaches the top
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if ( Math.round(enemy.x / 100) === Math.round(player.x / 100) &&
             Math.round(enemy.y / 100) === Math.round(player.y / 100) ) {
                player.reset();
                allEnemies.forEach(function(enemy) {
                  enemy.reset();
                });
                allEnemies.length = 0;
                enemyLevel = 1;
                // Back to level 1
                generateEnemies(enemyLevel);
        }
    });

    if(player.y < 80){
        enemyLevel += 1;
        increaseDifficulty(enemyLevel);
    }
}

// Increases the number of enemies
function increaseDifficulty(numEnemies) {
  // remove all previous enemies on screen
  allEnemies.length = 0;
  // Generate new set of enemies
  generateEnemies(numEnemies);
}

// Listens for key presses and sends the keys to the
// Player.handleInput() method.
//Key up because otherwise player could just hold keydown and zoom through the map
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
