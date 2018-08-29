function Enemy(x, y) {

	Entity.call(this, x, y, 10, 10, "red");

	this.name = "Enemy";

	this.speed = 2;

	this.xSpeed = this.speed;
	this.ySpeed = this.speed;

	this.timer = 0;
	this.nextMove = 0;

	this.test = true;

}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
	console.log(this.isPlayerVisible());

	/*this.timer++;

	//change movement
	if (this.timer >= this.nextMove) {
		//reset timer
		this.timer = 0;

		this.changeMove();

		this.nextMove = Math.round(Math.random() * 100 + 10);
	}

	//colision detection
	var xCheck = [this.x - this.width / 2, this.x + this.width / 2];
	var yCheck = [this.y - this.height / 2, this.y + this.height / 2];

	//down
	if (this.ySpeed > 0) {
		if (Map.isWalkable(xCheck, this.y + this.height / 2 + this.speed)) this.y += this.speed;
		else this.y += Map.tilesize - this.y % Map.tilesize - this.height / 2 - 1;
	}
	//up
	if (this.yspeed < 0) {
		if (Map.isWalkable(xCheck, this.y - this.height / 2 - this.speed)) this.y -= this.speed;
		else this.y -= this.y % Map.tilesize - this.height / 2;
	}
	//left
	if (this.xSpeed < 0) {
		if (Map.isWalkable(this.x - this.width / 2 - this.speed, yCheck)) this.x -= this.speed;
		else this.x -= this.x % Map.tilesize - this.width / 2;
	}
	//right
	if (this.xSpeed > 0) {
		if (Map.isWalkable(this.x + this.width / 2 + this.speed, yCheck)) this.x += this.speed;
		else this.x += Map.tilesize - this.x % Map.tilesize - this.width / 2 - 1;
	}

	this.x += this.xSpeed;
	this.y += this.ySpeed;*/
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

/*Enemy.prototype.changeMove = function() {
	var rnd = Math.round(Math.random() * 3);
	var xd = 0;
	var yd = 0;

	switch (rnd) {
		case 0:
			yd = 1;
		break;
		case 1:
			xd = 1;
		break;
		case 2:
			yd = -1;
		break;
		case 3:
			xd = -1;
		break;
	}

	this.xSpeed *= this.speed * xd;
	this.ySpeed *= this.speed * yd;
};*/