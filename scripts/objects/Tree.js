var Tree = (function() {
	
	var Tree = function(
		posX, 
		posY,
		state,
		ctx)
	{
		this.typeOf = 'Tree';

		this.posX = posX;

		this.posY = posY;
		
		// state level : 0 : good / 1 : burn / burned
		this.state = 0;

		// check if fire was passed
		this.attempted = false;

		// canvas context
		this.ctx = ctx;

		this.ctx.fillStyle = "green";
		this.ctx.fillRect(posX, posY, 1, 1);
	};

	Tree.prototype.changeState = function(state, forest, percolation, sizeX, sizeY) {
		var self = this;

		if(state == 1)
		{
			self.state = state;
			self.attempted = true;
			self.ctx.fillStyle = "red";
			self.ctx.fillRect(self.posX, self.posY, 1, 1);

			SpreadFires(forest, percolation, sizeX, sizeY, self.posX, self.posY);
		}
	};

	var SpreadFires = function(forest, percolation, sizeX, sizeY, fireX, fireY)
	{
		if (fireX + 1 < sizeX &&
			forest[fireX + 1][fireY] != undefined &&
				(
					forest[fireX + 1][fireY].attempted == undefined ||
					forest[fireX + 1][fireY].attempted == false
				)
				&&
				(
					forest[fireX + 1][fireY].typeOf == undefined ||
					forest[fireX + 1][fireY].typeOf != 'Water'
				)
			)
		{
			if(AttemptToBurn(percolation))
			{
				forest[fireX + 1][fireY].changeState(1, forest, percolation, sizeX, sizeY);
			}
		}

		if (fireX - 1 >= 0 &&
			forest[fireX - 1][fireY] != undefined &&
				(
					forest[fireX - 1][fireY].attempted == undefined ||
					forest[fireX - 1][fireY].attempted == false
				)
				&&
				(
					forest[fireX - 1][fireY].typeOf == undefined ||
					forest[fireX - 1][fireY].typeOf != 'Water'
				)
			)
		{
			if(AttemptToBurn(percolation))
			{
				forest[fireX - 1][fireY].changeState(1, forest, percolation, sizeX, sizeY);
			}
		}

		if (fireY + 1 < sizeY &&
			forest[fireX][fireY + 1] != undefined &&
				(
					forest[fireX][fireY + 1].attempted == undefined ||
					forest[fireX][fireY + 1].attempted == false
				)
				&&
				(
					forest[fireX][fireY + 1].typeOf == undefined ||
					forest[fireX][fireY + 1].typeOf != 'Water'
				)
			)
		{
			if(AttemptToBurn(percolation))
			{
				forest[fireX][fireY + 1].changeState(1, forest, percolation, sizeX, sizeY);
			}
		}

		if (fireY - 1 >= 0 &&
			forest[fireX][fireY - 1] != undefined &&
				(
					forest[fireX][fireY - 1].attempted == undefined ||
					forest[fireX][fireY - 1].attempted == false
				)
				&&
				(
					forest[fireX][fireY - 1].typeOf == undefined ||
					forest[fireX][fireY - 1].typeOf != 'Water'
				)
			)
		{
			if(AttemptToBurn(percolation))
			{
				forest[fireX][fireY - 1].changeState(1, forest, percolation, sizeX, sizeY);
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