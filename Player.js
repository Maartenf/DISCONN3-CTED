function Player() {

	Entity.call(this, 50, 51, 10, 10, "white");

}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	if (keys[40]) {
		if (Map.isWalkable(this.x, this.y + this.height + 2)) this.y += 2;
		else this.y += Map.tilesize - this.y % Map.tilesize - this.height;
	}
	if (keys[38]) {
		if (Map.isWalkable(this.x, this.y - 2)) this.y -= 2;
		else this.y -= this.y % Map.tilesize;
	}
	if (keys[37]) {
		if (Map.isWalkable(this.x - 2, this.y)) this.x -= 2;
		else this.x -= this.x % Map.tilesize;
	}
	if (keys[39]) {
		if (Map.isWalkable(this.x + this.width + 2, this.y)) this.x += 2;
		else this.x += Map.tilesize - this.x % Map.tilesize - this.width;
	}
};