function Item(x, y, type) {

	this.types = {
		Ammo: {
			bullets: 5,
			color: "#e6d520"
		},
		Health: {
			health: 2,
			color: "red"
		},
		Batteries: {
			carry: true,
			weight: 1,
			color: "brown"
		},
		Trap: {
			traps: 1,
			color: "red"
		}
	};

	this.size = 10;

	Entity.call(this, x, y, this.size, this.size, this.types[type].color);

	this.name = "Item";
	this.type = type;

	var t = this.types[type];

	this.plusHealth = t.health || 0;
	this.plusBullets = t.bullets || 0;
	this.plusTraps = t.traps || 0;
	this.carryable = t.carry || false;
	this.weight = t.weight || 0;

}

Item.prototype = Object.create(Entity.prototype);

Item.prototype.update = function() {
	//bullet collision
	if (this.bulletCollision()) this.alive = false;
}