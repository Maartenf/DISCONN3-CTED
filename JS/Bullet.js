function Bullet(x, y, angle, type, target) {
	this.types = {
		Normal: {
			damage: 2,
			speed: 5,
			color: "black",
			size: 3
		},
		Military: {
			damage: 2,
			speed: 3,
			color: "black",
			size: 3
		},
		Heavy: {
			damage: 4,
			speed: 3,
			color: "red",
			size: 4
		},
		Sniper: {
			damage: 3,
			speed: 5,
			color: "red",
			size: 4
		}
	};

	this.damage = this.types[type].damage;

	this.angle = angle;

	this.size = this.types[type].size;
	this.color = this.types[type].color;

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Bullet";

	this.speed = this.types[type].speed;
	this.xSpeed = 0;
	this.ySpeed = 0;

	//name of entity
	this.target = target;

}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
	this.xSpeed = this.speed * Math.cos(this.angle);
	this.ySpeed = this.speed * Math.sin(this.angle);

	var newX = this.x + this.xSpeed;
	var newY = this.y + this.ySpeed;

	//walls stop bullets
	if (!Map.isWalkable(newX, newY, this.name) && Map.getTileNumber(newX, newY) != 15) {
		if (Map.isShootable(newX, newY)) Map.changeTile(newX, newY, 0);
		
		this.alive = false;
		return;
	}

	this.x += this.xSpeed;
	this.y -= this.ySpeed;
};

Bullet.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
};