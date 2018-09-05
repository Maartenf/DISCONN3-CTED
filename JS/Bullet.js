function Bullet(x, y, angle, type, target) {

	this.originX = x;
	this.originY = y;

	this.types = {
		Normal: {
			damage: 0.5,
			dis: 300,
			color: "red",
			size: 3
		},
		Heavy: {
			damage: 2,
			dis: 200,
			color: "red",
			size: 3
		},
		Sniper: {
			damage: 0.25,
			dis: 800,
			color: "red",
			size: 2
		}
	};

	this.maxTravelDistance = this.types[type].dis;

	this.damage = this.types[type].damage;

	this.angle = angle;

	this.size = this.types[type].size;
	this.color = this.types[type].color;
	this.opacity = 1;
	this.fadePerTick = 0.002;

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Bullet";

	this.speed = 6;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.acceleration = -0.005;

	//name of entity
	this.target = target;

}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
	this.speed += this.acceleration;

	this.xSpeed = this.speed * Math.cos(this.angle);
	this.ySpeed = this.speed * Math.sin(this.angle);

	var newX = this.x + this.xSpeed;
	var newY = this.y + this.ySpeed;

	if (!Map.isWalkable(newX, newY) && Map.getTileNumber(newX, newY) != 15) {
		if (Map.isShootable(newX, newY)) Map.changeTile(newX, newY, 0);
		
		this.alive = false;
		return;
	}

	this.x += this.xSpeed;
	this.y -= this.ySpeed;

	//if bullet goes further than travel distance
	var distance = Math.sqrt(Math.pow(this.originX - this.x, 2) + Math.pow(this.originY - this.y, 2));
	if (distance >= this.maxTravelDistance) this.alive = false;

	this.opacity -= this.fadePerTick;
};

Bullet.prototype.draw = function() {
	ctx.globalAlpha = this.opacity;
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

	//reset opacity
	ctx.globalAlpha = 1;
};