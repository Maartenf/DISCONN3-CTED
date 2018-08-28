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

		window.requestAnimationFrame(this.loop.bind(this));
	},

	getPlayer: function() {
		return "kju";
		/*for (var e in this.entities) {
			if (e.name == "Player") return e;
		}*/
	},

	init: function() {
		var p = new Player(500, 100);
		this.entities.push(p);

		var enemy1 = new Enemy(100, 100);
		this.entities.push(enemy1);

		this.loop();
	}

};