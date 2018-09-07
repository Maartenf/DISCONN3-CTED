function Player(x, y) {

	Entity.call(this, x, y, 20, 20, "Player");

	this.name = "Player";

	this.maxHealth = 10;
	this.health = this.maxHealth;

	this.traps = 1;

	this.speed = 1.2;

	this.bullets = 30;
	this.carrying = null;

	this.reloadTimer = 0;
	this.ticksToReload = 25;

}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
	//bullet collision, delete battery when shot
	if (this.bulletCollision()) this.carrying = null;

	var xCheck = [this.x - this.width / 2, this.x + this.width / 2];
	var yCheck = [this.y - this.height / 2, this.y + this.height / 2];

	//Keyboard movement and collision detection
	//key down
	if (keys[40] || keys[83]) {
		if (Map.isWalkable(xCheck, this.y + this.height / 2 + this.speed, this.name)) {
			this.y += this.speed;
			GUI.top -= this.speed;
		} else this.y += Map.tilesize - this.y % Map.tilesize - this.height / 2 - 1;
	}
	//key up
	if (keys[38] || keys[90]) {
		if (Map.isWalkable(xCheck, this.y - this.height / 2 - this.speed, this.name)) {
			this.y -= this.speed;
			GUI.top += this.speed;
		} else this.y -= this.y % Map.tilesize - this.height / 2;
	}
	//key left
	if (keys[37] || keys[81]) {
		if (Map.isWalkable(this.x - this.width / 2 - this.speed, yCheck, this.name)) {
			this.x -= this.speed;
			GUI.left += this.speed;
		} else this.x -= this.x % Map.tilesize - this.width / 2;
	}
	//key right
	if (keys[39] || keys[68]) {
		if (Map.isWalkable(this.x + this.width / 2 + this.speed, yCheck, this.name)) {
			this.x += this.speed;
			GUI.left -= this.speed;
		} else this.x += Map.tilesize - this.x % Map.tilesize - this.width / 2 - 1;
	}

	//left mouse click, fire bullet
	if (mouseLeft) {
		//calculate click angle relative to player
		var angle = 0;

		var dx = mouseX - this.x;
		var dy = this.y - mouseY;

		if (dx >= 0 && dy >= 0) angle = Math.atan(Math.abs(dy / dx));
		else if (dx <= 0 && dy >= 0) angle = Math.PI / 2 + Math.atan(Math.abs(dx / dy));
		else if (dx <= 0 && dy <= 0) angle = Math.PI + Math.atan(Math.abs(dy / dx));
		else if (dx >= 0 && dy <= 0) angle = Math.PI * (3 / 2) + Math.atan(Math.abs(dx / dy));

		//check if reloading
		if (this.reloadTimer >= this.ticksToReload) {
			//check if player has still bullets left
			if (this.bullets > 0) {
				//spawn new bullet
				var b = new Bullet(this.x, this.y, angle, "Military", "Enemy");
				GameEngine.entities.push(b);

				this.bullets--;
			} else {
				console.log("Out of bullets!");
			}

			this.reloadTimer = 0;
		}
	}

	//right mouse click, place a trap
	if (mouseRight) {
		if (this.traps > 0) {
			var cx = this.x + this.width / 2;
			var cy = this.y + this.height / 2;

			//distance between click and player, player can only place traps in proximity
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
	this.itemCollision();
};

//player picks up item on walkover
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