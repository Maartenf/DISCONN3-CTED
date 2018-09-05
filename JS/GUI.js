var GUI = {

	sHealth: null,
	sMaxHealth: null,
	sTraps: null,
	sBullets: null,
	sBatteries: null,
	sCarry: null,

	player: null,
	server: null,

	init: function() {
		this.sHealth = document.getElementById("health");
		this.sMaxHealth = document.getElementById("maxHealth");
		this.sTraps = document.getElementById("traps");
		this.sBullets = document.getElementById("bullets");
		this.sBatteries = document.getElementById("batteries");
		this.sCarry = document.getElementById("carry");

		this.player = GameEngine.getEntity("Player");
		this.server = GameEngine.getEntity("Server");
	},

	update: function() {
		this.sHealth.innerHTML = this.player.health;
		this.sMaxHealth.innerHTML = "/" + this.player.maxHealth;
		this.sTraps.innerHTML = this.player.traps;
		this.sBullets.innerHTML = this.player.bullets;
		this.sBatteries.innerHTML = this.server.energy;
		//this.sCarry.innerHTML = this.player.carrying == null ? "&#x2611;" : "&#9745;";
		this.sCarry.innerHTML = this.player.carrying == null ? "-" : "&#x2611;";
	}
	
};

document.getElementById("pause").onclick = function() {
	var paused = GameEngine.pause;

	GameEngine.pause = !paused;
	GameEngine.loop();

	document.getElementById("msg").innerHTML = paused ? "" : "Game paused.";
};