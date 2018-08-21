function Bullet(x, y, rotation) {

	this.size = 2;
	this.color = "white";

	Entity.call(this, x, y, this.size, this.size, rotation, this.color);

	this.speed = 5;

}

Bullet.prototype = Object.create(Entity.prototype);

Bullet.prototype.update = function() {
	this.x += this.speed * Math.cos(this.rotation);
	this.y -= this.speed * Math.sin(this.rotation);

	if (!Map.isWalkable(this.x, this.y)) {
		Map.changeTile(this.x, this.y, 0);
		this.alive = false;
	}
};