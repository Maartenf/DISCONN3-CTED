function Server(x, y) {

	this.size = 50;
	this.color = "Server";

	this.energy = 0;

	Entity.call(this, x, y, this.size, this.size, this.color);

	this.name = "Server";

}

Server.prototype = Object.create(Entity.prototype);

Server.prototype.update = function() {
	var p = GameEngine.getEntity("Player");
	if (this.isColliding(p)) {
		var carry = p.carrying == null ? "" : p.carrying.type;

		if (carry == "Batteries") this.energy++;

		if (this.energy == 13) alert("SERVER REBOOTING\nYou have brought all batteries back to the helipad.");

		p.carrying = null;
	}
};