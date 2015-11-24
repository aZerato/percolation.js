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

	Water.prototype.spreadWater = function(forest, waterPercolation, limit, sizeX, sizeY, waterX, waterY, ctx)
	{	
		if(limit > 0)
		{
			limit--;

			if (waterX + 1 < sizeX &&
				forest[waterX + 1][waterY] != undefined &&
				forest[waterX + 1][waterY].typeOf == undefined)
			{
				if(CanBeWater(waterPercolation))
				{
					var el = forest[waterX + 1][waterY];
					el = new Water(waterX + 1, waterY, ctx);
					el.spreadWater(forest, waterPercolation, limit, sizeX, sizeY, waterX + 1, waterY, ctx);
				}
			}
			
			if (waterX - 1 >= 0 &&
				forest[waterX - 1][waterY] != undefined &&
				forest[waterX - 1][waterY].typeOf == undefined)
			{
				if(CanBeWater(waterPercolation))
				{
					var el = forest[waterX - 1][waterY];
					el = new Water(waterX - 1, waterY, ctx);
					el.spreadWater(forest, waterPercolation, limit, sizeX, sizeY, waterX - 1, waterY, ctx);
				}
			}

			if (waterY + 1 < sizeY &&
				forest[waterX][waterY + 1] != undefined &&
				forest[waterX][waterY + 1].typeOf == undefined)
			{
				if(CanBeWater(waterPercolation))
				{
					var el = forest[waterX][waterY + 1];
					el = new Water(waterX, waterY + 1, ctx);
					el.spreadWater(forest, waterPercolation, limit, sizeX, sizeY, waterX, waterY + 1, ctx);
				}
			}

			if (waterY - 1 >= 0 &&
				forest[waterX][waterY - 1] != undefined &&
				forest[waterX][waterY - 1].typeOf == undefined)
			{
				if(CanBeWater(waterPercolation))
				{
					var el = forest[waterX][waterY - 1];
					el = new Water(waterX, waterY - 1, ctx);
					el.spreadWater(forest, waterPercolation, limit, sizeX, sizeY, waterX, waterY + 1, ctx);
				}
			}
		}
	};
	
	var CanBeWater = function(waterPercolation)
	{
		var random = Math.floor((Math.random() * 100) + 0);
		result = false;

		if(random > waterPercolation)
		{
			result = true;
		}

		return result;
	};
	
	
	return Water;

})();