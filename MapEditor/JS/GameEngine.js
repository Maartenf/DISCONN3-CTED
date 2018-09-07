var GameEngine = {

	entities: [],

	currentTile: 0,

	loop: function() {
		if (mouseLeft) Map.changeTile(mouseX, mouseY, this.currentTile);

		Map.draw();

		GUI.update();

		window.requestAnimationFrame(this.loop.bind(this));

		mouseLeft = false;
	},

	init: function() {
		GUI.init();

		//start when atlass is loaded
		ImageLoader.init(this.loop.bind(this));
	},

	spanClicked: function(e) {
		var id = e.id;
		console.log(id);

		for (var key in Map.tileinfo) {
			if (Map.tileinfo[key].color === id) this.currentTile = key;
		}
	}

};