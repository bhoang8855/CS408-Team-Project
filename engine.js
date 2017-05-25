/* Engine.js
 * Updates the entities and renders the game
 */

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
    canvas.width = 1000;
    canvas.height = 1000;
    doc.body.appendChild(canvas);

    function main() {
        // Get time delta infomration for smooth animation
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /* Call update/render functions and pass along the time delta to
         * the update function for smooth animation.
         */
        update(dt);
        render();
        /* Set lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;
        /* Use browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    function init() {
        lastTime = Date.now();
        main();
    }

    // Calls functions to update entity's data.
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    // Calls all enemies update() methods and player's update method.
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        if ( Math.round(player.y / 80) === 0 ) {
            player.update();
        }
        doc.getElementById('score').innerHTML = player.score;
    }
    // Checks for collisions between player and enemies
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if ( Math.round(enemy.x / 100) === Math.round(player.x / 100) &&
                 Math.round(enemy.y / 100) === Math.round(player.y / 100) ) {
                    player.reset();
            }
        });
    }

    // Renders the initial game setup
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'Images/goalBlock.png',   // Top row is water
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg',
                'Images/blockBlock.png',
                'Images/groundBlock.jpg'
            ],
            numRows = 9,
            numCols = 8,
            row, col;
        /* Loop through the number of rows and columns defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the grid
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 100, row * 100);
            }
        }
        renderEntities();
    }

    // calls the render functions of enemies and players on each game tick
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    // Load all images for the game.
    // Once images are loaded game will start.
    Resources.load([
        'Images/groundBlock.jpg',
        'Images/goalBlock.png',
        'Images/blockBlock.png',
        'Images/mario.png',
        'Images/koopa.png',
        'Images/goomba.png'

    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
