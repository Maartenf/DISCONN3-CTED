function Entity(x, y, width, height, color) {

	this.name = "Entity";

	//center coordinates
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	this.color = color;

	//delete entity when false
	this.alive = true;

	this.bulletRadius = 8;
	
}

//override
Entity.prototype.update = function() {};

Entity.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
};

Entity.prototype.bulletCollision = function() {
	for (var i = 0; i < GameEngine.entities.length; i++) {
		var e = GameEngine.entities[i];

		if (e.name !== "Bullet" || e.shooterName == this.name) continue;

		var distance = Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2));
		if (distance <= this.bulletRadius) {
			e.alive = false;
			return true;
		}
		else return false;
	}
};