function Server() {

	this.size = 30;
	this.color = "cyan";

	this.energy = 100000;

	Entity.call(this, width / 2, height / 2, this.size, this.size, this.color);

	this.name = "Server";

	this.health = 100;

	this.bulletRadius = this.size / 2;

}

Server.prototype = Object.create(Entity.prototype);

Server.prototype.update = function() {
	this.energy -= 2;
	this.copper--;

	var p = GameEngine.getEntity("Player");
	var distance = Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
	if (distance <= this.size / 1.2) {
		var carry = p.carrying == null ? "" : p.carrying.type;

		if (carry == "") return;

		if (carry == "Batteries") this.energy += 5000;

		p.carrying = null;
	}

	//bullet collision
	if (this.bulletCollision()) {
		this.health -= 5;

		if (this.health <= 0) {
			this.alive = false;

			//pause game
			GameEngine.pause = true;
		}
	}
};