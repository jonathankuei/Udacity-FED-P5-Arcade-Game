// Enemies the player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 5) + 2);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt * 100);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Resets the enemy to the left border if it travels past the right border
    if (this.x > 505) {
        this.reset();
    }
};

// Resets the enemy to a random location
Enemy.prototype.reset = function() {
    this.x = enemyX[(Math.floor(Math.random()*enemyX.length))];
    this.y = enemyY[(Math.floor(Math.random()*enemyY.length))];
    this.speed = Math.floor((Math.random() * 6) + 2);
};

// The player class
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    // Draws the player character on screen,
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Resets character to starting position if player reaches the water at the top edge of the screen,
    if (this.y < 0) {
        this.reset();
    }

    // Resets character to starting position if it comes into contact with an enemy
    for (var i = 0; i < allEnemies.length; i++){
        var enemy = allEnemies[i];
        if (this.x > enemy.x && this.x < enemy.x + 100 && this.y > enemy.y && this.y < enemy.y + 82) {
            this.reset();
        }
    }
};

// Resets the player to its original starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Maps player movement to arrow keys inputted by user
Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'left':
            if (this.x > 0){
                this.x -= 100;
            }
        break;

        case 'up':
            if (this.y > 0){
                this.y -= 82;
            }
        break;

        case 'right':
            if (this.x < 400){
                this.x += 100;
            }
        break;

        case 'down':
            if (this.y < 400){
                this.y += 82;
            }
        break;
    }
};

// Instantiates and populates an array with enemies at randomly generated locations
var allEnemies = [];
var enemyX = [-101, -202];
var enemyY = [60, 143, 226];

for (var i = 0; i < 3; i++){
    var randomX = enemyX[(Math.floor(Math.random()*enemyX.length))];
    var randomY = enemyY[(Math.floor(Math.random()*enemyY.length))];
    var enemy = new Enemy(randomX,randomY);
    allEnemies.push(enemy);
}

// Instantiates the player object
var player = new Player(200,400);

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
