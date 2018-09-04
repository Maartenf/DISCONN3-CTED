var GUI = {

	span: null,
	player: null,
	server: null,

	init: function() {
		this.span = document.getElementById("info");
		this.player = GameEngine.getEntity("Player");
		this.server = GameEngine.getEntity("Server");
	},

	update: function() {
		this.span.innerHTML = "Bullets=" + this.player.bullets + " | Carrying=" + 
			(this.player.carrying == null ? "" : this.player.carrying.type) + " | Health=" + this.player.health + "/" + 
			this.player.maxHealth + " | Energy=" + this.server.energy + "/100000";
	}
	
};