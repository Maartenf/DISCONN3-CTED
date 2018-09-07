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

	this.bulletRadius = 12;
}

//override
Entity.prototype.update = function() {};

Entity.prototype.draw = function() {
	ImageLoader.drawIMG(this.color, this.x - this.width / 2, this.y - this.height / 2);

	//health bar
	if (this.health !== undefined) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 10, 30, 4);
		ctx.fillStyle = "green";
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 10, 30 * (this.health / this.maxHealth), 4);
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
	var collision = false;

	for (var i = 0; i < GameEngine.entities.length; i++) {
		var e = GameEngine.entities[i];

		if (e.name !== "Bullet") continue;

		if (e.target === this.name && this.getDistance(e) <= this.bulletRadius) {
			e.alive = false;

			this.health -= e.damage;
			if (this.health <= 0) {
				this.health = 0;
				this.alive = false;

				var item = new Item(this.x, this.y, "Batteries");
				GameEngine.entities.push(item);

				if (this.name === "Player") {
					GameEngine.pause = true;
					GUI.gameOver();
				}
			}

			collision = true;
		}
	}

	return collision;
};