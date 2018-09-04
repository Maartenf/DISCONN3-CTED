window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;

	keys = [];

	//initialize mouse variables
	mouseLeft = false;
	mouseRight = false;
	mouseX = 0;
	mouseY = 0;

	GameEngine.init();
}

window.onkeydown = function(e) {
	var key = e.keyCode || e.which
	keys[key] = true;

	e.preventDefault();
};

window.onkeyup = function(e) {
	var key = e.keyCode || e.which
	keys[key] = false;

	e.preventDefault();
};

canvas.oncontextmenu = function(e) {
	e.preventDefault();
};

canvas.onmousedown = function(e) {
	var which = e.button;

	if (which == 0) mouseLeft = true;
	if (which == 2) mouseRight = true;

	mouseX = e.offsetX;
	mouseY = e.offsetY;
};

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function randomInt(lower, upper) {

}