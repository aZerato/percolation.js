var Main = (function() {
	
	var Main = function($canvas, sizeX, sizeY, percolation)
	{
		this.$canvas = $canvas;

		this.sizeX = sizeX;

		this.sizeY = sizeY;

		this.percolation = percolation * 100;

		this.forest = new Matrix(sizeX, sizeY, {});

		this.ctx = {};
	};

	Main.prototype.init = function() {
		var self = this;

		// canvas creation
		self.ctx = self.$canvas.getContext("2d");;

		for (var x = self.sizeX - 1; x >= 0; x--) {
			for (var y = self.sizeY - 1; y >= 0; y--) {
				// creation of new Tree on Canvas 
				var tree = new Tree(x, y, 0, self.ctx);

				self.forest[x][y] = [tree];
			}
		}
	};

	Main.prototype.launch = function()
	{
		var self = this;

		// starting fire position
		var fireX = Math.floor((Math.random() * self.sizeX) + 1);
		var fireY = Math.floor((Math.random() * self.sizeY) + 1);
		
		// immediatly the tree at this position was burned
		self.forest[fireX][fireY].changeState(1);
	};

	return Main;

})();