var GameEngine = {

	entities: [],

	loop: function() {
		Map.draw();

		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];

			entity.update();
			entity.draw();
		}

		window.requestAnimationFrame(this.loop.bind(this));
	},

	init: function() {
		var p = new Player();
		this.entities.push(p);

		this.loop();
	}

};