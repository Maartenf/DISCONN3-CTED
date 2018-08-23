function Entity(x, y, width, height, color) {

	//center coordinates
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	this.color = color;

	//delete entity when false
	this.alive = true;
	
}

Entity.prototype.update = function() {};

Entity.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
};