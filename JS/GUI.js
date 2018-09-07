var GUI = {

	sHealth: null,
	sMaxHealth: null,
	sTraps: null,
	sBullets: null,
	sBatteries: null,
	sCarry: null,

	player: null,
	server: null,

	top: 0,
	left: 0,

	init: function() {
		this.sHealth = document.getElementById("health");
		this.sMaxHealth = document.getElementById("maxHealth");
		this.sTraps = document.getElementById("traps");
		this.sBullets = document.getElementById("bullets");
		this.sBatteries = document.getElementById("batteries");
		this.sCarry = document.getElementById("carry");

		this.player = GameEngine.getEntity("Player");
		this.server = GameEngine.getEntity("Server");

		this.top = -height / 4;
		this.left = -width / 4;

		document.getElementById("start").style.display = "block";
		GameEngine.pause = true;
	},

	update: function() {
		this.sHealth.innerHTML = this.player.health;
		this.sMaxHealth.innerHTML = "/" + this.player.maxHealth;
		this.sTraps.innerHTML = this.player.traps;
		this.sBullets.innerHTML = this.player.bullets;
		this.sBatteries.innerHTML = this.server.energy;
		//this.sCarry.innerHTML = this.player.carrying == null ? "&#x2611;" : "&#9745;";
		this.sCarry.innerHTML = this.player.carrying == null ? "&#x2716;" : "&#10004;";

		canvas.style.top = this.top + "px";
		canvas.style.left = this.left + "px";
	},

	gameOver: function() {
		document.getElementById("gameOver").style.display = "block";
	},

	restart: function() {
		document.getElementById("start").style.display = "none";

		GameEngine.pause = false;
		GameEngine.loop();
	}
	
};

document.getElementById("start").onclick = GUI.restart;