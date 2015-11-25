var Water = (function() {
	
	var Water = function(
		posX, 
		posY,
		ctx)
	{
		this.typeOf = 'Water';

		this.posX = posX;

		this.posY = posY;

		// check if fire was passed
		this.attempted = true;

		// canvas context
		this.ctx = ctx;

		this.ctx.fillStyle = "blue";
		this.ctx.fillRect(posX, posY, 1, 1);
	};

	Water.prototype.SpreadWater = function(forest, waterPercolation, sizeX, sizeY, waterX, waterY, ctx)
	{	
		if (waterX + 1 < sizeX &&
			forest[waterX + 1][waterY] != undefined &&
				(
					forest[waterX + 1][waterY].attempted == undefined ||
					forest[waterX + 1][waterY].attempted == false
				)
				&&
				(
					forest[waterX + 1][waterY].typeOf == undefined ||
					forest[waterX + 1][waterY].typeOf != 'Fire'
				)
			)
		{
			if(CanBeWater(waterPercolation))
			{
				var el = forest[waterX + 1][waterY];
				el = new Water(waterX + 1, waterY, ctx);
				forest = el.SpreadWater(forest, waterPercolation, sizeX, sizeY, waterX + 1, waterY, ctx);
			}
		}
		
		if (waterX - 1 >= 0 &&
			forest[waterX - 1][waterY] != undefined &&
				(
					forest[waterX - 1][waterY].attempted == undefined ||
					forest[waterX - 1][waterY].attempted == false
				)
				&&
				(
					forest[waterX - 1][waterY].typeOf == undefined ||
					forest[waterX - 1][waterY].typeOf != 'Fire'
				)
			)
		{
			if(CanBeWater(waterPercolation))
			{
				var el = forest[waterX - 1][waterY];
				el = new Water(waterX - 1, waterY, ctx);
				forest = el.SpreadWater(forest, waterPercolation, sizeX, sizeY, waterX - 1, waterY, ctx);
			}
		}

		if (waterY + 1 < sizeY &&
			forest[waterX][waterY + 1] != undefined &&
				(
					forest[waterX][waterY + 1].attempted == undefined ||
					forest[waterX][waterY + 1].attempted == false
				)
				&&
				(
					forest[waterX][waterY + 1].typeOf == undefined ||
					forest[waterX][waterY + 1].typeOf != 'Fire'
				)
			)
		{
			if(CanBeWater(waterPercolation))
			{
				var el = forest[waterX][waterY + 1];
				el = new Water(waterX, waterY + 1, ctx);
				forest = el.SpreadWater(forest, waterPercolation, sizeX, sizeY, waterX, waterY + 1, ctx);
			}
		}

		if (waterY - 1 >= 0 &&
			forest[waterX][waterY - 1] != undefined &&
				(
					forest[waterX][waterY - 1].attempted == undefined ||
					forest[waterX][waterY - 1].attempted == false
				)
				&&
				(
					forest[waterX][waterY - 1].typeOf == undefined ||
					forest[waterX][waterY - 1].typeOf != 'Fire'
				)
			)
		{
			if(CanBeWater(waterPercolation))
			{
				var el = forest[waterX][waterY - 1];
				el = new Water(waterX, waterY - 1, ctx);
				forest = el.SpreadWater(forest, waterPercolation, sizeX, sizeY, waterX, waterY - 1, ctx);
			}
		}

		return forest;
	};
	
	var CanBeWater = function(waterPercolation)
	{
		var random = Math.floor((Math.random() * 100) + 1);
		result = false;

		if(random > waterPercolation)
		{
			result = true;
		}

		return result;
	};
	
	
	return Water;

})();