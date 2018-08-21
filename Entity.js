function Entity(x, y, width, height, rotation, color) {

	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	this.rotation = rotation;

	this.color = color;

	this.alive = true;
	
}

Entity.prototype.update = function() {};

Entity.prototype.draw = function() {
	ctx.fillStyle = this.color;
	//ctx.rotate(this.rotation);
	ctx.fillRect(this.x, this.y, this.width, this.height);
};