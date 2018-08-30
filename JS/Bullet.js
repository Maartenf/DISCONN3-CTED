function Bullet(x, y, angle, shooterName) {

	this.originX = x;
	this.originY = y;

	this.maxTravelDistance = 300;

	this.angle = angle;

	this.size = 3;
	this.color = "#e6d520";
	this.opacity = 1;
	this.fadePerTick = 0.005;

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Bullet";

	this.speed = 3;
	this.acceleration = -0.005;

	//name of entity
	this.shooterName = shooterName;

}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
	this.speed += this.acceleration;

	var xChange = this.speed * Math.cos(this.angle);
	var yChange = this.speed * Math.sin(this.angle);

	var newX = this.x + xChange;
	var newY = this.y + yChange;

	if (!Map.isWalkable(newX, newY)) {
		if (Map.isShootable(newX, newY)) Map.changeTile(newX, newY, 0);
		
		this.alive = false;
		return;
	}

	this.x += xChange;
	this.y -= yChange;

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