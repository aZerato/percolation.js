var Tree = (function() {
	
	var Tree = function(
		posX, 
		posY,
		state,
		ctx)
	{
		this.posX = posX;

		this.posY = posY;
		
		// state level : 0 : good / 1 : burn / burned
		this.state = 0;

		// canvas context
		this.ctx = ctx;

		ctx.fillStyle = "green";
		ctx.fillRect(posX, posY, 1, 1);
	};

	Tree.prototype.changeState = function(state, forest, percolation) {
		if(state == 1)
		{
			self.state = 1;
			self.ctx.fillStyle = "red";
			self.ctx.fillRect(self.posX, self.posY, 1, 1);
		}
	};

	var SpreadFires = function(main, fireX, fireY)
	{
		if (fireX + 1 < main.sizeX &&
			main.forest[fireX + 1][fireY] != undefined)
		{
			if(AttemptToBurn(main.percolation))
			{
				main.forest[fireX + 1][fireY].changeState(1);
			}
		}

		if (fireX - 1 >= 0 &&
			main.forest[fireX - 1][fireY] != undefined)
		{
			if(AttemptToBurn(main.percolation))
			{
				main.forest[fireX - 1][fireY].changeState(1);
			}
		}

		if (fireY + 1 < main.sizeY &&
			main.forest[fireX][fireY + 1] != undefined)
		{
			if(AttemptToBurn(main.percolation))
			{
				main.forest[fireX][fireY + 1].changeState(1);
			}
		}

		if (fireY - 1 >= 0 &&
			main.forest[fireX][fireY - 1] != undefined)
		{
			if(AttemptToBurn(main.percolation))
			{
				main.forest[fireX][fireY - 1].changeState(1);
			}
		}
	};
	
	var AttemptToBurn = function(percolation)
	{
		var random = Math.floor((Math.random() * 100) + 0);
		result = false;

		if(random > percolation)
		{
			result = true;
		}

		return result;
	};
	
	return Tree;

})();