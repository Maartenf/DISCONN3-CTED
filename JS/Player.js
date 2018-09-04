function Player(x, y) {

	Entity.call(this, x, y, 20, 20, "blue");

	this.name = "Player";

	this.maxHealth = 4;
	this.health = this.maxHealth;

	this.traps = 3;

	this.speed = 1.5;

	this.bullets = 20;
	this.carrying = null;

	this.reloadTimer = 0;
	this.ticksToReload = 25;

	this.bulletRadius = 16;

}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	//bullet collision
	if (this.bulletCollision()) this.carrying = null;

	var xCheck = [this.x - this.width / 2, this.x + this.width / 2];
	var yCheck = [this.y - this.height / 2, this.y + this.height / 2];

	//Keyboard and collision detection
	//key s
	if (keys[83]) {
		if (Map.isWalkable(xCheck, this.y + this.height / 2 + this.speed)) this.y += this.speed;
		else this.y += Map.tilesize - this.y % Map.tilesize - this.height / 2 - 1;
	}
	//key z
	if (keys[90]) {
		if (Map.isWalkable(xCheck, this.y - this.height / 2 - this.speed)) this.y -= this.speed;
		else this.y -= this.y % Map.tilesize - this.height / 2;
	}
	//key q
	if (keys[81]) {
		if (Map.isWalkable(this.x - this.width / 2 - this.speed, yCheck)) this.x -= this.speed;
		else this.x -= this.x % Map.tilesize - this.width / 2;
	}
	//key d
	if (keys[68]) {
		if (Map.isWalkable(this.x + this.width / 2 + this.speed, yCheck)) this.x += this.speed;
		else this.x += Map.tilesize - this.x % Map.tilesize - this.width / 2 - 1;
	}

	//left mouse click
	if (mouseLeft) {
		var angle = 0;

		var dx = mouseX - this.x;
		var dy = this.y - mouseY;

		if (dx >= 0 && dy >= 0) angle = Math.atan(Math.abs(dy / dx));
		else if (dx <= 0 && dy >= 0) angle = Math.PI / 2 + Math.atan(Math.abs(dx / dy));
		else if (dx <= 0 && dy <= 0) angle = Math.PI + Math.atan(Math.abs(dy / dx));
		else if (dx >= 0 && dy <= 0) angle = Math.PI * (3 / 2) + Math.atan(Math.abs(dx / dy));

		if (this.reloadTimer >= this.ticksToReload) {
			if (this.bullets > 0) {
				var b = new Bullet(this.x, this.y, angle, "Normal", "Enemy");
				GameEngine.entities.push(b);

				this.bullets--;
			} else {
				console.log("Out of bullets!");
			}

			this.reloadTimer = 0;
		}
	}

	//right mouse click
	if (mouseRight) {
		if (this.traps > 0) {
			var cx = this.x + this.width / 2;
			var cy = this.y + this.height / 2;

			//distance between click and player
			var distance = Math.sqrt(Math.pow(cx - mouseX, 2) + Math.pow(cy - mouseY, 2));
			if (distance >= Map.tilesize && distance < Map.tilesize * 4) {
				Map.changeTile(mouseX, mouseY, 3);
				this.traps--;
			}
		} else {
			console.log("Out of traps!");
		}
	}

	this.reloadTimer++;

	//item pickup
	if (this.carrying == null) this.itemCollision();

	//item drop space
	if (keys[32] && this.carrying !== null) {
		//respawn item
		var i = new Item(this.x, this.y + 15, this.carrying.type);
		GameEngine.entities.push(i);

		this.carrying = null;
	}
};

Player.prototype.itemCollision = function() {
	for (var i = 0; i < GameEngine.entities.length; i++) {
		var e = GameEngine.entities[i];

		if (e.name !== "Item") continue;

		if (this.isColliding(e)) {
			if (this.health < this.maxHealth) this.health += e.plusHealth;
			if (this.health > this.maxHealth) this.health = this.maxHealth;
			this.bullets += e.plusBullets;
			this.traps += e.plusTraps;

			if (e.carryable) this.carrying = e;

			e.alive = false;
		}
	}
};