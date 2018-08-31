function Item(x, y, type) {

	this.types = {
		Ammo: {
			bullets: 5,
			color: "#e6d520"
		},
		Blocks: {
			blocks: 4,
			color: "#2db370"
		},
		Health: {
			health: 10,
			color: "red"
		},
		Copper: {
			carry: true,
			weight: 1,
			color: "brown"
		},
		Batteries: {
			carry: true,
			weight: 1,
			color: "brown"
		}
	};

	this.size = 10;

	Entity.call(this, x, y, this.size, this.size, this.types[type].color);

	this.name = "Item";
	this.type = type;

	var t = this.types[type];

	this.plusHealth = t.health || 0;
	this.plusBullets = t.bullets || 0;
	this.plusBlocks = t.blocks || 0;
	this.carryable = t.carry || false;
	this.weight = t.weight || 0;

}

Item.prototype = Object.create(Entity.prototype);

Item.prototype.update = function() {
	//bullet collision
	if (this.bulletCollision()) this.alive = false;
}