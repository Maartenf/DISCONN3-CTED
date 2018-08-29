function Bullet(x, y, angle, shooterName) {

	this.originX = x;
	this.originY = y;

	this.maxTravelDistance = 200;

	this.angle = angle;

	this.size = 3;
	this.color = "white";

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Bullet";

	this.speed = 3;
	this.acceleration = -0.0005;

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
};