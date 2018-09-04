var ImageLoader = {

	loc: "atlass.png",
	atlass: null,
	data: {
		Ground: {
			x: 0,
			y: 0,
			width: 5,
			height: 5,
			scale: 4
		},
		Water: {
			x: 15,
			y: 10,
			width: 5,
			height: 5,
			scale: 4
		},
		Bridge: {
			x: 20,
			y: 10,
			width: 5,
			height: 5,
			scale: 4
		},
		Grass: {
			x: 10,
			y: 15,
			width: 5,
			height: 5,
			scale: 4
		},
		YellowFlower: {
			x: 15,
			y: 15,
			width: 5,
			height: 5,
			scale: 4
		},
		RedFlower: {
			x: 20,
			y: 15,
			width: 5,
			height: 5,
			scale: 4
		},
		Wall: {
			x: 5,
			y: 0,
			width: 5,
			height: 5,
			scale: 4
		},
		WallLeft: {
			x: 0,
			y: 20,
			width: 5,
			height: 5,
			scale: 4
		},
		WallTop: {
			x: 5,
			y: 20,
			width: 5,
			height: 5,
			scale: 4
		},
		WallRight: {
			x: 10,
			y: 20,
			width: 5,
			height: 5,
			scale: 4
		},
		WallBottom: {
			x: 15,
			y: 20,
			width: 5,
			height: 5,
			scale: 4
		},
		WallLeftTop: {
			x: 0,
			y: 25,
			width: 5,
			height: 5,
			scale: 4
		},
		WallRightTop: {
			x: 5,
			y: 25,
			width: 5,
			height: 5,
			scale: 4
		},
		WallRightBottom: {
			x: 10,
			y: 25,
			width: 5,
			height: 5,
			scale: 4
		},
		WallLeftBottom: {
			x: 15,
			y: 25,
			width: 5,
			height: 5,
			scale: 4
		},
		ShootWall: {
			x: 0,
			y: 5,
			width: 5,
			height: 5,
			scale: 4
		},
		Trap: {
			x: 5,
			y: 5,
			width: 5,
			height: 5,
			scale: 4	
		},
		Player: {
			x: 10,
			y: 0,
			width: 10,
			height: 10,
			scale: 2	
		},
		Item: {
			x: 20,
			y: 0,
			width: 5,
			height: 5,
			scale: 4	
		},
		Health: {
			x: 20,
			y: 5,
			width: 5,
			height: 5,
			scale: 4	
		},
		Enemy: {
			x: 10,
			y: 10,
			width: 5,
			height: 5,
			scale: 4	
		},
		Server: {
			x: 0,
			y: 10,
			width: 10,
			height: 10,
			scale: 5	
		}
	},

	init: function(loaded) {
		this.atlass = new Image();
		this.atlass.onload = loaded;
		this.atlass.src = this.loc;
	},

	drawIMG: function(name, x, y) {
		//set image smoothing off
		ctx.mozImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		//retrieve data to crop image from atlass
		var d = this.data[name];

		//crop, scale and draw image to canvas
		ctx.drawImage(this.atlass, d.x, d.y, d.width, d.height, x, y, d.width * d.scale, d.height * d.scale);
	}

};