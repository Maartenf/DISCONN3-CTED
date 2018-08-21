var GameEngine = {

	init: function() {
		Map.draw();
	},


	loop: function() {
		

		window.requestAnimationFrame(GameEngine.loop);
	}

};