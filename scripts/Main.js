var Main = (function() {
	
	var Main = function($canvas, sizeX, sizeY, percolation, waterPercolation)
	{
		this.$canvas = $canvas;

		this.sizeX = sizeX;

		this.sizeY = sizeY;

		this.percolation = percolation * 100;
		this.waterPercolation = waterPercolation * 100;

		this.forest = new Matrix(sizeX, sizeY, undefined);

		this.ctx = {};
	};

	Main.prototype.init = function() {
		var self = this;

		// canvas creation
		self.ctx = self.$canvas.getContext('2d');;
	};

	Main.prototype.initWater = function() {
		var self = this;

		var waterX = Math.floor((Math.random() * self.sizeX) + 1);
		var waterY = Math.floor((Math.random() * self.sizeY) + 1);

		self.forest[waterX][waterY] = new Water(waterX, waterY, self.ctx);
		self.forest[waterX][waterY].SpreadWater(self.forest, self.waterPercolation, self.sizeX, self.sizeY, waterX, waterY, self.ctx);
	};

	Main.prototype.initTrees = function() {
		var self = this;

		for (var x = self.sizeX - 1; x >= 0; x--) {
			for (var y = self.sizeY - 1; y >= 0; y--) {
				if(self.forest[x][y] == undefined ||
					(
						self.forest[x][y].attempted == undefined ||
						self.forest[x][y].attempted == false
					)
					&&
					(
						self.forest[x][y].typeOf == undefined ||
						self.forest[x][y].typeOf != 'Water'
					)
				)
				{
					// creation of new Tree on Canvas 
					var tree = new Tree(x, y, 0, self.ctx);

					self.forest[x][y] = tree;
				}
			}
		}
	};

	Main.prototype.LaunchFire = function()
	{
		var self = this;

		// starting fire position
		var fireX = Math.floor((Math.random() * self.sizeX) + 1);
		var fireY = Math.floor((Math.random() * self.sizeY) + 1);
		
		// immediatly the tree at this position was burned & after the fire spreading
		// Check before is not water
		if(self.forest[fireX][fireY] != undefined
			&& self.forest[fireX][fireY].typeOf != undefined)
		{
			if(self.forest[fireX][fireY].typeOf == undefined ||
				self.forest[fireX][fireY].typeOf == 'Water'
			)
			{
				self.launchFire();
			}
			else 
			{
				self.forest[fireX][fireY].changeState(1, self.forest, self.percolation, self.sizeX, self.sizeY);
			}
		}
		else
		{
			alert('Create before a forest ;)');
		}
	};

	return Main;

})();