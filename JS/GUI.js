var GUI = {

	span: null,

	init: function() {
		this.span = document.getElementById("info");
	},

	update: function() {
		var player = GameEngine.getEntity("Player");
		var server = GameEngine.getEntity("Server");
		this.span.innerHTML = "Bullets=" + player.bullets + " | Blocks=" + player.blocks + " | Carrying=" + 
			(player.carrying == null ? "" : player.carrying.type) + " | Health=" + player.health + "/100 | Energy=" +
			server.energy + "/100000 | Copper=" + server.copper + "/5000" + "| ServerHealth=" + server.health + "/100";
	}
	
};