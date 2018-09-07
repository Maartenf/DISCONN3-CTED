function Item(x, y, type) {

	this.types = {
		Ammo: {
			bullets: 40,
			color: "Item"
		},
		Health: {
			health: 10,
			color: "Health"
		},
		Batteries: {
			carry: true,
			color: "Batteries"
		},
		Trap: {
			traps: 2,
			color: "Item"
		},
		Box: {
			bullets: 30,
			health: 10,
			traps: 1,
			color: "Item"
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

Item.prototype.draw = function() {
	ImageLoader.drawIMG(this.color, this.x - this.width / 2, this.y - this.height / 2);

	/*ctx.fillStyle = "white";
	ctx.font="14px Arial";
	ctx.fillText(this.type.toUpperCase(), this.x + this.width / 2 + 10, this.y);*/
};