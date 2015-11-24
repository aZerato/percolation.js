var Matrix = (function() {
	
	var Matrix = function(x, y, defaultValue) {
		var arr = [];

		for (var i = 0; i < x; i++)
		{
			arr.push([]);

			arr[i].push(new Array(y));

			for(var j = 0; j < y; j++)
			{
				arr[i][j] = defaultValue;
			}
		}
		return arr;
	};

	return Matrix;

})();