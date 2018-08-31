function Enemy(x, y, type) {

	this.types = {
		Trooper: {
			walk: true,
			color: "red",
			health: 2
		},
		Centry: {
			walk: false,
			color: "red",
			health: 5
		}
	};

	Entity.call(this, x, y, 10, 10, this.types[type].color);

	this.name = "Enemy";
	this.type = type;

	this.shootTimer = 0;
	this.ticksToShoot = 50;
	this.betweenShotTimer = 0;
	this.ticksBetweenShots = 20;

	this.maxVisibleDistance = 400;
	this.shootDistance = 200;

	this.health = this.types[type].health;

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

		//move towards player
		if (distance <= this.maxVisibleDistance) this.moveToPlayer();

		if (this.shootTimer >= this.ticksToShoot && this.betweenShotTimer % this.ticksBetweenShots == 0 && distance <= this.shootDistance) {
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
	if (this.bulletCollision()) {
		this.health--;
		if (this.health <= 0) this.alive = false;
	}

	//walking
	this.moveTimer++;

	//change movement
	if (this.moveTimer >= this.ticksToMove) {
		//reset timer
		this.moveTimer = 0;

		this.changeMove();

		this.ticksToMove = Math.round(Math.random() * 700 + 500);
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

	if (this.types[this.type].walk) {
		this.x += this.speed * this.xD;
		this.y += this.speed * this.yD;
	}
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

Enemy.prototype.changeMove = function() {
	var xd = this.xD;
	var yd = this.yD;

	//make sure that the movement is different from last time
	while (this.xD == xd && this.yD == yd) {
		xd = Math.random() * 2 - 1;
		yd = Math.random() * 2 - 1;
	}

	this.xD = xd;
	this.yD = yd;
};

Enemy.prototype.moveToPlayer = function() {
	//search for player in list of entities
	var player = GameEngine.getPlayer();

	//player coordinates
	var pX = player.x;
	var pY = player.y;

	var directions = {
		d1: {
			xd: 0,
			yd: -1
		},
		d2: {
			xd: 1,
			yd: -1
		},
		d3: {
			xd: 1,
			yd: 0
		},
		d4: {
			xd: 1,
			yd: 1
		},
		d5: {
			xd: 0,
			yd: 1
		},
		d6: {
			xd: -1,
			yd: 1
		},
		d7: {
			xd: -1,
			yd: 0
		},
		d8: {
			xd: -1,
			yd: -1
		}
	};


	var minDis = width;

	for (var dir in directions) {
		var xd = directions[dir].xd;
		var yd = directions[dir].yd;

		var distance = Math.sqrt(Math.pow(this.x - (pX - xd), 2) + Math.pow(this.y - (pY - yd), 2));
		if (distance < minDis) {
			minDis = distance;

			this.xD = xd;
			this.yD = yd;
		}
	}

	this.moveTimer = 0;
};