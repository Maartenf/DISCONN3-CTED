var GameEngine = {

	entities: [],

	loop: function() {
		Map.draw();

		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];

			if (!entity.alive) continue;

			entity.update();
			entity.draw();
		}

		//Reset mouse click at end of loop
		mouseClicked = false,

		window.requestAnimationFrame(this.loop.bind(this));
	},

	init: function() {
		var p = new Player(100, 100);
		this.entities.push(p);

		this.loop();
	}

};