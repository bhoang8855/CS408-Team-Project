/**
 * Arian Cuellar & Brian Hoang
 * CS408 Group Project
 * Created a Frogger esque game in Javascript
 */

/* Engine.js
 * Updates the entities,loads the images, and renders the game
 */

var imgCache = {};
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var then;
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
// Load all images for the game.
// Once images are loaded game will start.
loadStart(['Images/groundBlock.jpg', 'Images/goalBlock.png', 'Images/blockBlock.png', 'Images/mario.png', 'Images/koopa.png', 'Images/goomba.png'],start);

//Image Loader
//Takes the array containing strings pointing to image locations and loads them
function loadStart(arr,func) {
    arr.forEach(function(location) {
        if(imgCache[location])
            return imgCache[location];
        var image = new Image();
        image.onload = function() {
            imgCache[location] = image;
            var ready = true;
            for(var i in imgCache) {
                if(!imgCache[i]) {
                    ready = false;
                    break;
                }
            }
            //If all images are loaded, launches the parameter function
            if(ready) {
                func();
            }
        };
        imgCache[location] = false;
        image.src = location;
    });
}

//Grabs images that have already been cached
function getImage(location) {
    return imgCache[location];
}
// Game loop that will continually update and render the game.
function main() {
    // Get time delta information for smooth animation
    var now = Date.now(),
        delta = (now - then) / 1000.0;
    /* Call update/render functions and pass along the time delta to
       * the update function for smooth animation.
        */
    updateAll(delta);
    checkCollisions();
    renderAll();
    /* Set then variable which is used to determine the time delta
     * for the next time this function is called.
     */
    then = now;
    /* Use browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    window.requestAnimationFrame(main);
}
/**
 * Function that starts the actual game after all images have been loaded properly
 */
function start() {
    then = Date.now();
    main();
}

// Calls all enemies update() methods and player's update method.
function updateAll(delta) {
    allEnemies.forEach(function (enemy) {
        enemy.update(delta);
    });
    if (Math.round(player.y / 95) === 0) {
        player.update();
    }
    document.getElementById('score').innerHTML = player.score;
}
// Renders the initial game setup
function renderAll() {
    /* This array holds the relative URL to the image used
        * for that particular row of the game level.
       */
    var images = ['Images/goalBlock.png',
        'Images/blockBlock.png',
        'Images/groundBlock.jpg',
        'Images/blockBlock.png',
        'Images/groundBlock.jpg',
        'Images/blockBlock.png',
        'Images/groundBlock.jpg',
        'Images/blockBlock.png',
        'Images/groundBlock.jpg'];
    var row;
    var col;
    /* Loop through the number of rows and columns defined above
        * and, using the images array, draw the correct image for that
        * portion of the grid
        */
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 8; col++) {
            ctx.drawImage(getImage(images[row]), col * 100, row * 100);
        }
    }
    /**
     * Renders all enemies and the player
     */
    allEnemies.forEach(function(enemy) {
        enemy.render();
    });
    player.render();
}


