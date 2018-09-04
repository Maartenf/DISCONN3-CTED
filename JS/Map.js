var Map = {

	tilemap: [[2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [2, 6, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 6, 6, 10, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 5],
  			  [2, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
  			  [2, 8, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 8, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 6, 6, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 2, 0, 0, 5],
  			  [7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 2, 6, 10, 4, 0, 0, 0, 4, 0, 0, 0, 0, 15, 15, 16, 16, 15, 15, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 15, 15, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 4, 0, 0, 0, 0, 0, 5, 2, 2, 2, 2, 8, 12, 0, 4, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 15, 15, 0, 0, 4, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 11, 8, 8, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 9, 6, 10, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 5, 2, 2, 6, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 5, 2, 2, 2, 7, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 5, 2, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 11, 8, 8, 8, 12, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 5],
  			  [7, 0, 0, 14, 0, 0, 0, 9, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [7, 0, 13, 0, 0, 0, 0, 5, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  			  [2, 6, 6, 6, 6, 6, 6, 2, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2]],

  	tileinfo: {
  		0: {
  			walk: true,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "Ground"
  		},
  		1: {
  			walk: false,
  			shoot: true,
  			transp: false,
  			trap: false,
  			color: "ShootWall"
  		},
  		2: {
			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "Wall"
  		},
  		3: {
			walk: true,
  			shoot: true,
  			transp: true,
  			trap: true,
  			color: "Trap"
  		},
  		4: {
  			walk: true,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "Grass"
  		},
  		5: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallLeft"
  		},
  		6: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallTop"
  		},
  		7: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallRight"
  		},
  		8: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallBottom"
  		},
  		9: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallLeftTop"
  		},
  		10: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallRightTop"
  		},
  		11: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallLeftBottom"
  		},
  		12: {
  			walk: false,
  			shoot: false,
  			transp: false,
  			trap: false,
  			color: "WallRightBottom"
  		},
  		13: {
  			walk: true,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "YellowFlower"
  		},
  		14: {
  			walk: true,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "RedFlower"
  		},
  		15: {
  			walk: false,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "Water"
  		},
  		16: {
  			walk: true,
  			shoot: false,
  			transp: true,
  			trap: false,
  			color: "Bridge"
  		}
  	},

	tilesize: 20,

	draw: function() {
		for (var y = 0; y < this.tilemap.length; y++) {
			for (var x = 0; x < this.tilemap[0].length; x++) {
				ImageLoader.drawIMG(this.tileinfo[this.tilemap[y][x]].color, x * this.tilesize, y * this.tilesize);
			}
		}
	},

	getTileNumber: function(x, y) {
		xTile = Math.floor(x / this.tilesize);
		yTile = Math.floor(y / this.tilesize);

		return this.tilemap[yTile][xTile];
	},

	isWalkable: function(x, y) {
		if (Array.isArray(x)) {
			for (var i = 0; i < x.length; i++) {
				var tile = this.getTileNumber(x[i], y);
				if (!this.tileinfo[tile].walk) return false;
			}
			return true;
		} else if (Array.isArray(y)) {
			for (var i = 0; i < y.length; i++) {
				var tile = this.getTileNumber(x, y[i]);
				if (!this.tileinfo[tile].walk) return false;
			}
			return true;
		} else {
			var tile = this.getTileNumber(x, y);
			return this.tileinfo[tile].walk;
		}
	},

	isShootable: function(x, y) {
		var tile = this.getTileNumber(x, y);
		return this.tileinfo[tile].shoot;
	},

	isTransparent: function(x, y) {
		var tile = this.getTileNumber(x, y);
		return this.tileinfo[tile].transp;
	},

	isTrap: function(x, y) {
		var tile = this.getTileNumber(x, y);
		return this.tileinfo[tile].trap;
	},

	changeTile: function(x, y, newTileNumber) {
		xTile = Math.floor(x / this.tilesize);
		yTile = Math.floor(y / this.tilesize);

		this.tilemap[yTile][xTile] = newTileNumber;
	}
	
};