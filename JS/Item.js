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
		}
	}

	this.size = 10;

	Entity.call(this, x, y, this.size, this.size, this.types[type].color);

	this.name = "Item";

	this.plusHealth = this.types[type].health;
	this.plusBullets = this.types[type].bullets;
	this.plusBlocks = this.types[type].blocks;

}

Item.prototype = Object.create(Entity.prototype);