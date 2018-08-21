var Map = {

	tilemap: [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

	tilesize: 50,

	draw: function() {
		for (var y = 0; y < this.tilemap.length; y++) {
			for (var x = 0; x < this.tilemap[0].length; x++) {
				var color = "";

				switch(this.tilemap[y][x]) {
					case 0:
						color = "#444";
					break;
					case 1:
						color = "black";
					break;
					default:
						color = "#444";
				}

				ctx.fillStyle = color;
				ctx.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize);
			}
		}
	},

	getTileNumber: function(x, y) {
		xTile = Math.floor(x / this.tilesize);
		yTile = Math.floor(y / this.tilesize);

		return this.tilemap[yTile][xTile];
	},

	isWalkable: function(x, y) {
		var tile = this.geTileNumber(x, y);
		return tile == 0 ? true : false;
	}
	
};