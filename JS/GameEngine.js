var GameEngine = {

	entities: [],

	pause: false,

	loop: function() {
		Map.draw();

		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];

			//remove enemy
			if (!entity.alive) this.entities.splice(i, 1);

			//only update if entity is not too far from player and always update player
			var p = this.getEntity("Player");
			if (entity.name == "Player" || entity.name == "Server" || Math.sqrt(Math.pow(p.x - entity.x, 2) + Math.pow(p.y - entity.y, 2)) <= 450) entity.update();

			entity.draw();
		}

		//Reset mouse clicks at end of loop
		mouseLeft = false;
		mouseRight = false;

		GUI.update();

		if (!this.pause) window.requestAnimationFrame(this.loop.bind(this));
	},

	init: function() {
		var server = new Server(width / 2, height / 2);

		var player = new Player(width / 2, height / 2);

		var item1 = new Item(525, 605, "Health");
		var item2 = new Item(285, 505, "Ammo");
		var item3 = new Item(85, 65, "Health");
		var item4 = new Item(850, 410, "Trap");
		var item5 = new Item(635, 30, "Ammo");
		var item6 = new Item(1030, 50, "Health");
		var item7 = new Item(330, 1060, "Box");
		var item8 = new Item(1150, 1150, "Box");

		var enemy1 = new Enemy(320, 490, "Centry");
		var enemy2 = new Enemy(280, 130, "Trooper");
		var enemy3 = new Enemy(290, 1090, "Trooper");
		var enemy4 = new Enemy(580, 1120, "Trooper");
		var enemy5 = new Enemy(1050, 1050, "Tank");
		var enemy6 = new Enemy(960, 960, "Centry");
		var enemy7 = new Enemy(820, 240, "Trooper");
		var enemy8 = new Enemy(90, 160, "Tank");
		var enemy9 = new Enemy(1090, 130, "Centry");
		var enemy10 = new Enemy(870, 70, "Tank");
		var enemy11 = new Enemy(350, 1080, "Trooper");
		var enemy12 = new Enemy(610, 730, "Trooper");
		var enemy13 = new Enemy(60, 640, "Trooper");

		this.entities.push(server, item1, item2, item3, item4, item5, item6, item7, item8, player, enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13);

		GUI.init();

		//start when atlass is loaded
		ImageLoader.init(this.loop.bind(this));
	},

	getEntity: function(name) {
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			if (entity.name == name) return entity;
		}
	}

};