var GameEngine = {

	entities: [],

	pause: false,

	loop: function() {
		Map.draw();

		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];

			//remove enemy
			if (!entity.alive) this.entities.splice(i, 1);

			entity.update();
			entity.draw();
		}

		//Reset mouse clicks at end of loop
		mouseLeft = false;
		mouseRight = false;

		GUI.update();

		if (!this.pause) window.requestAnimationFrame(this.loop.bind(this));
	},

	init: function() {
		var server = new Server();

		var player = new Player(500, 400);

		var enemy1 = new Enemy(100, 100, "Centry");
		var enemy2 = new Enemy(100, 500, "Tank");
		var enemy3 = new Enemy(700, 450, "Trooper");
		var enemy4 = new Enemy(700, 400, "Zombie");

		var item1 = new Item(500, 200, "Ammo");
		var item2 = new Item(500, 550, "Batteries");
		var item3 = new Item(600, 550, "Health");
		var item4 = new Item(600, 570, "Trap");

		this.entities.push(server, player, enemy1, enemy2, enemy3, enemy4, item1, item2, item3, item4);

		GUI.init();

		this.loop();
	},

	getEntity: function(name) {
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			if (entity.name == name) return entity;
		}
	}

};