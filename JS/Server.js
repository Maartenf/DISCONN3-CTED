function Server() {

	this.size = 50;
	this.color = "Server";

	this.energy = 0;

	Entity.call(this, width / 2, height / 2, this.size, this.size, this.color);

	this.name = "Server";

}

Server.prototype = Object.create(Entity.prototype);

Server.prototype.update = function() {
	var p = GameEngine.getEntity("Player");
	if (this.isColliding(p)) {
		var carry = p.carrying == null ? "" : p.carrying.type;

		if (carry == "Batteries") this.energy++;

		p.carrying = null;
	}
};