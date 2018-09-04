function Server() {

	this.size = 30;
	this.color = "cyan";

	this.energy = 100000;

	Entity.call(this, width / 2, height / 2, this.size, this.size, this.color);

	this.name = "Server";

	this.bulletRadius = this.size / 2;

}

Server.prototype = Object.create(Entity.prototype);

Server.prototype.update = function() {
	this.energy--;

	var p = GameEngine.getEntity("Player");
	if (this.isColliding(p)) {
		var carry = p.carrying == null ? "" : p.carrying.type;

		if (carry == "Batteries") this.energy += 5000;

		p.carrying = null;
	}
};