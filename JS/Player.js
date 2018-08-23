function Player(x, y) {

	Entity.call(this, x, y, 10, 10, "white");

	this.speed = 2;

	this.bullets = 100;
	this.blocks = 20;

}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	var xCheck = [this.x - this.width / 2, this.x + this.width / 2];
	var yCheck = [this.y - this.height / 2, this.y + this.height / 2];

	//Keyboard and collision detection
	//key s
	if (keys[83]) {
		if (Map.isWalkable(xCheck, this.y + this.height / 2 + this.speed)) this.y += this.speed;
		else this.y += Map.tilesize - this.y % Map.tilesize - this.height / 2 - 1;
	}
	//key z
	if (keys[90]) {
		if (Map.isWalkable(xCheck, this.y - this.height / 2 - this.speed)) this.y -= this.speed;
		else this.y -= this.y % Map.tilesize - this.height / 2;
	}
	//key q
	if (keys[81]) {
		if (Map.isWalkable(this.x - this.width / 2 - this.speed, yCheck)) this.x -= this.speed;
		else this.x -= this.x % Map.tilesize - this.width / 2;
	}
	//key d
	if (keys[68]) {
		if (Map.isWalkable(this.x + this.width / 2 + this.speed, yCheck)) this.x += this.speed;
		else this.x += Map.tilesize - this.x % Map.tilesize - this.width / 2 - 1;
	}

	//left mouse click
	if (mouseLeft) {
		var angle = 0;

		var dx = mouseX - this.x;
		var dy = this.y - mouseY;

		if (dx >= 0 && dy >= 0) angle = Math.atan(Math.abs(dy / dx));
		else if (dx <= 0 && dy >= 0) angle = Math.PI / 2 + Math.atan(Math.abs(dx / dy));
		else if (dx <= 0 && dy <= 0) angle = Math.PI + Math.atan(Math.abs(dy / dx));
		else if (dx >= 0 && dy <= 0) angle = Math.PI * (3 / 2) + Math.atan(Math.abs(dx / dy));

		if (this.bullets > 0) {
			var b = new Bullet(this.x, this.y, angle);
			GameEngine.entities.push(b);

			this.bullets--;
		} else {
			console.log("Out of bullets!");
		}
	}

	//right mouse click
	if (mouseRight) {
		if (this.blocks > 0) {
			var cx = this.x + this.width / 2;
			var cy = this.y + this.height / 2;

			//distance between click and player
			var distance = Math.sqrt(Math.pow(cx - mouseX, 2) + Math.pow(cy - mouseY, 2));
			if (distance > Map.tilesize && distance < Map.tilesize * 3) {
				Map.changeTile(mouseX, mouseY, 1);
				this.blocks--;
			}
		} else {
			console.log("Out of blocks!");
		}
	}
};