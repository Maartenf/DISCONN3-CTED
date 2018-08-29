function Enemy(x, y) {

	Entity.call(this, x, y, 10, 10, "red");

	this.name = "Enemy";

	this.shootTimer = 0;
	this.ticksToShoot = 50;
	this.betweenShotTimer = 0;
	this.ticksBetweenShots = 20;

	this.maxVisibleDistance = 300;

	this.speed = 0.5;

	this.xD = 0;
	this.yD = 0;

	this.moveTimer = 0;
	this.ticksToMove = 0;

}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
	if (this.isPlayerVisible()) {
		this.shootTimer++;
		this.betweenShotTimer++;

		var player = GameEngine.getPlayer();
		//don't shoot if player too far away from enemy
		var distance = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

		if (this.shootTimer >= this.ticksToShoot && this.betweenShotTimer % this.ticksBetweenShots == 0 && distance <= this.maxVisibleDistance) {
			//shoot bullet
			var angle = 0;

			var dx = player.x - this.x;
			var dy = this.y - player.y;

			if (dx >= 0 && dy >= 0) angle = Math.atan(Math.abs(dy / dx));
			else if (dx <= 0 && dy >= 0) angle = Math.PI / 2 + Math.atan(Math.abs(dx / dy));
			else if (dx <= 0 && dy <= 0) angle = Math.PI + Math.atan(Math.abs(dy / dx));
			else if (dx >= 0 && dy <= 0) angle = Math.PI * (3 / 2) + Math.atan(Math.abs(dx / dy));

			var b = new Bullet(this.x, this.y, angle, this.name);
			GameEngine.entities.push(b);
		}
	} else {
		//reset shoot and between shot timer
		this.shootTimer = 0;
		this.betweenShotTimer = 0;
	}

	//bullet collision
	if (this.bulletCollision()) this.alive = false;

	//walking
	this.moveTimer++;

	//change movement
	if (this.moveTimer >= this.ticksToMove) {
		//reset timer
		this.moveTimer = 0;

		this.changeMove();

		this.ticksToMove = Math.round(Math.random() * 500 + 200);
	}

	//colision detection
	var xCheck = [this.x - this.width / 2, this.x + this.width / 2];
	var yCheck = [this.y - this.height / 2, this.y + this.height / 2];

	//down
	if (this.speed * this.yD > 0) {
		if (!Map.isWalkable(xCheck, this.y + this.height / 2 + this.speed)) {
			this.y += Map.tilesize - this.y % Map.tilesize - this.height / 2 - 1;
			this.changeMove();
		}
	}
	//up
	if (this.speed * this.yD < 0) {
		if (!Map.isWalkable(xCheck, this.y - this.height / 2 - this.speed)) {
			this.y -= this.y % Map.tilesize - this.height / 2;
			this.changeMove();
		}
	}
	//left
	if (this.speed * this.xD < 0) {
		if (!Map.isWalkable(this.x - this.width / 2 - this.speed, yCheck)) {
			this.x -= this.x % Map.tilesize - this.width / 2;
			this.changeMove();
		}
	}
	//right
	if (this.speed * this.xD > 0) {
		if (!Map.isWalkable(this.x + this.width / 2 + this.speed, yCheck)) {
			this.x += Map.tilesize - this.x % Map.tilesize - this.width / 2 - 1;
			this.changeMove();
		}
	}

	this.x += this.speed * this.xD;
	this.y += this.speed * this.yD;
};

//check if there are visible walls between enemy and player
Enemy.prototype.isPlayerVisible = function() {
	//search for player in list of entities
	var player = GameEngine.getPlayer();

	//player coordinates
	var pX = player.x;
	var pY = player.y;

	//=============TEMPORARY=============
	if (this.x == pX) return true;
	//=============/TEMPORARY=============

	//construct line equation between enemy and player and get y-coordinate for given x
	var getYLine = function(xLine, x0, y0) {
		return y0 + ((pY - y0) / (pX - x0)) * (xLine - x0);
	};

	//pixel distance between enemy and player
	var distance = Math.sqrt(Math.pow(pX - this.x, 2) + Math.pow(pY - this.y, 2));
	//determine how frequent visibility needs to be checked
	var step = distance / (Map.tilesize / 4);

	var dx = pX - this.x;
	var xStep = dx / step;

	if (dx >= 0) {
		for (var xLine = this.x; xLine <= pX; xLine += xStep) {
			var yLine = getYLine(xLine, this.x, this.y);
			if (!Map.isTransparent(xLine, yLine)) return false;
		}
	} else {
		for (var xLine = this.x; xLine >= pX; xLine += xStep) {
			var yLine = getYLine(xLine, this.x, this.y);
			if (!Map.isTransparent(xLine, yLine)) return false;
		}
	}

	return true;
};

Enemy.prototype.bulletCollision = function() {
	for (var i = 0; i < GameEngine.entities.length; i++) {
		var e = GameEngine.entities[i];

		if (e.name !== "Bullet" || e.shooterName == "Enemy") continue;

		var distance = Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2));
		if (distance <= 5) return true;
		else return false;
	}
};

Enemy.prototype.changeMove = function() {
	var xd = this.xD;
	var yd = this.yD;

	//make sure that the movement is different from last time
	while (this.xD == xd && this.yD == yd) {
		var rnd = Math.round(Math.random() * 3);

		switch (rnd) {
			case 0:
				xd = 1;
				yd = 0;
			break;
			case 1:
				xd = -1;
				yd = 0;
			break;
			case 2:
				xd = 0;
				yd = 1;
			break;
			case 3:
				xd = 0;
				yd = -1;
			break;
		}
	}

	this.xD = xd;
	this.yD = yd;
};