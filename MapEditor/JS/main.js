window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;

	//initialize mouse variables
	mouseLeft = false;
	mouseRight = false;
	mouseX = 0;
	mouseY = 0;

	GameEngine.init();
};

document.getElementById("export").onclick = function() {
	console.log("test");
	document.getElementsByTagName("textarea")[0].innerHTML = JSON.stringify(Map.tilemap);
};

canvas.oncontextmenu = function(e) {
	e.preventDefault();
};

canvas.onclick = function(e) {
	var which = e.button;

	if (which == 0) mouseLeft = true;

	mouseX = e.offsetX;
	mouseY = e.offsetY;

	console.log("x=" + mouseX + " y=" + mouseY);
};