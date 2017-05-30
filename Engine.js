/**
 * Arian Cuellar & Brian Hoang
 * CS408 Group Project
 * Created a Frogger esque game in Javascript
 */

/* Engine.js
 * Updates the entities and renders the game
 */

(function(global) {
    var doc = global.document;
    var win = global.window;
    var canvas = doc.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var then;
    canvas.width = 1000;
    canvas.height = 1000;
    doc.body.appendChild(canvas);
    function main() {
        // Get time delta information for smooth animation
        var now = Date.now(),
            dt = (now - then) / 1000.0;
        /* Call update/render functions and pass along the time delta to
         * the update function for smooth animation.
         */
        updateAll(dt);
        checkCollisions();
        renderAll();
        /* Set then variable which is used to determine the time delta
         * for the next time this function is called.
         */
        then = now;
        /* Use browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };
    function start() {
        then = Date.now();
        main();
    }
    // Calls all enemies update() methods and player's update method.
    function updateAll(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        if ( Math.round(player.y / 95) === 0 ) {
            player.update();
        }
        doc.getElementById('score').innerHTML = player.score;
    }
    // Renders the initial game setup
    function renderAll() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = ['Images/goalBlock.png',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg'],
            numRows = 9,
            numCols = 8,
            row, col;
        /* Loop through the number of rows and columns defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the grid
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.getImage(rowImages[row]), col * 100, row * 100);
            }
        }
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }
    // Load all images for the game.
    // Once images are loaded game will start.
    Resources.loadStart(['Images/groundBlock.jpg', 'Images/goalBlock.png', 'Images/blockBlock.png', 'Images/mario.png', 'Images/koopa.png', 'Images/goomba.png'],start);
    global.ctx = ctx;
})(this);
