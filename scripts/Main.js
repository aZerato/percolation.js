var Main = (function() {
	
	var Main = function($canvas, sizeX, sizeY, percolation, torrent)
	{
		this.$canvas = $canvas;

		this.sizeX = sizeX;

		this.sizeY = sizeY;

		this.percolation = percolation * 100;
		this.waterPercolation = 0.5 * 100;

		this.torrent = torrent;

		this.forest = new Matrix(sizeX, sizeY, {});

		this.ctx = {};
	};

	Main.prototype.init = function() {
		var self = this;

		// canvas creation
		self.ctx = self.$canvas.getContext("2d");;

		// Add torrent
		if(self.torrent)
		{	
			//self.initWater();
		}

		// Add trees
		self.initTrees();
	};

	Main.prototype.initWater = function() {
		var self = this;

		var waterX = Math.floor((Math.random() * self.sizeX) + 1);
		var waterY = Math.floor((Math.random() * self.sizeY) + 1);

		var el = self.forest[waterX][waterY];
		el = new Water(waterX, waterY, self.ctx);
		el.spreadWater(self.forest, self.waterPercolation, 20, self.sizeX, self.sizeY, waterX, waterY, self.ctx);
	};

	Main.prototype.initTrees = function() {
		var self = this;

		for (var x = self.sizeX - 1; x >= 0; x--) {
			for (var y = self.sizeY - 1; y >= 0; y--) {
				if(self.forest[x][y].typeOf == undefined)
				{
					// creation of new Tree on Canvas 
					var tree = new Tree(x, y, 0, self.ctx);

					self.forest[x][y] = tree;
				}
			}
		}
	};

	Main.prototype.launch = function()
	{
		var self = this;

		// starting fire position
		var fireX = Math.floor((Math.random() * self.sizeX) + 1);
		var fireY = Math.floor((Math.random() * self.sizeY) + 1);
		
		// immediatly the tree at this position was burned & after the fire spreading
		var curEl = self.forest[fireX][fireY];
		if(curEl.typeOf != 'Tree')
		{
			self.launch();
		}
		else 
		{
			curEl.changeState(1, self.forest, self.percolation, self.sizeX, self.sizeY);
		}
	};

	return Main;

})();