window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	keys = [];

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