function Player(x, y) {

	Entity.call(this, x, y, 10, 10, 0, "white");

	this.speed = 2;

}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	//Keyboard and collision detection
	if (keys[40]) {
		if (Map.isWalkable(this.x, this.y + this.height + this.speed)) this.y += this.speed;
		else this.y += Map.tilesize - this.y % Map.tilesize - this.height;
	}
	if (keys[38]) {
		if (Map.isWalkable(this.x, this.y - this.speed)) this.y -= this.speed;
		else this.y -= this.y % Map.tilesize;
	}
	if (keys[37]) {
		if (Map.isWalkable(this.x - this.speed, this.y)) this.x -= this.speed;
		else this.x -= this.x % Map.tilesize;
	}
	if (keys[39]) {
		if (Map.isWalkable(this.x + this.width + this.speed, this.y)) this.x += this.speed;
		else this.x += Map.tilesize - this.x % Map.tilesize - this.width;
	}

	if (mouseClicked) {
		var angle = 0;
		
		var cx = this.x + this.width / 2;
		var cy = this.y + this.height / 2;

		var dx = mouseX - cx;
		var dy = cy - mouseY;

		if (dx >= 0 && dy >= 0) angle = Math.atan(Math.abs(dy / dx));
		else if (dx <= 0 && dy >= 0) angle = Math.PI / 2 + Math.atan(Math.abs(dx / dy));
		else if (dx <= 0 && dy <= 0) angle = Math.PI + Math.atan(Math.abs(dy / dx));
		else if (dx >= 0 && dy <= 0) angle = Math.PI * (3 / 2) + Math.atan(Math.abs(dx / dy));
		
		var b = new Bullet(cx, cy, angle);
		GameEngine.entities.push(b);
	}
};