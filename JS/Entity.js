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

	//health bar
	if (this.health !== undefined) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 10, 30, 3);
		ctx.fillStyle = "white";
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 10, 30 * (this.health / this.maxHealth), 3);
	}
};

Entity.prototype.isColliding = function(entity) {
	if (entity.x - entity.width / 2 < this.x + this.width / 2 &&
   		entity.x + entity.width / 2 > this.x - this.width / 2 &&
   		entity.y - entity.height / 2 < this.y + this.height / 2 &&
   		entity.y + entity.height / 2 > this.y - this.height / 2) return true;
	return false;
};

Entity.prototype.getDistance = function(entity) {
	return Math.sqrt(Math.pow(entity.x - this.x, 2) + Math.pow(entity.y - this.y, 2));
};

Entity.prototype.bulletCollision = function() {
	for (var i = 0; i < GameEngine.entities.length; i++) {
		var e = GameEngine.entities[i];

		if (e.name !== "Bullet") continue;

		if (e.target === this.name && this.getDistance(e) <= this.bulletRadius) {
			e.alive = false;

			this.health -= e.damage;
			if (this.health <= 0) {
				this.health = 0;
				this.alive = false;
			}

			return true;
		} else return false;
	}
};