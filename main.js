window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	keys = [];

	mouseClicked = false;
	mouseX = 0;
	mouseY = 0;

	GameEngine.init();
}

window.onkeydown = function(e) {
	keys[e.keyCode] = true;
	e.preventDefault();
};
window.onkeyup = function(e) {
	keys[e.keyCode] = false;
	e.preventDefault();
};

canvas.onclick = function(e) {
	mouseClicked = true;

	mouseX = e.offsetX;
	mouseY = e.offsetY;
};