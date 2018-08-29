function Bullet(x, y, angle) {

	this.angle = angle;

	this.size = 3;
	this.color = "white";

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Bullet";

	this.speed = 3;
	this.acceleration = -0.0005;

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
};