var GameEngine = {

	entities: [],

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

		window.requestAnimationFrame(this.loop.bind(this));
	},

	init: function() {
		var p = new Player(500, 100);
		this.entities.push(p);

		var enemy1 = new Enemy(100, 100, "Centry");
		var enemy2 = new Enemy(100, 500, "Trooper");

		var item1 = new Item(500, 200, "Ammo");
		var item2 = new Item(500, 400, "Blocks");
		var item3 = new Item(500, 500, "Copper");
		var item4 = new Item(500, 550, "Batteries");

		this.entities.push(enemy1, enemy2, item1, item2, item3, item4);

		GUI.init();

		this.loop();
	},

	getPlayer: function() {
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			if (entity.name == "Player") return entity;
		}
	}

};