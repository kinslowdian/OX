var thinking_arr;

var Logic = function(ob)
{
	trace(ob);
	this.p = ob;
	this.p_win = false;
	this.draw = false;

	this.ai = {};
	this.ai_list = new Array();
	this.ai_count = 0;
	this.ai_stall = false;

	this.ai_turn = 0;
}

Logic.prototype.result_check = function()
{
	var gridFull = true;

	//////////// ACROSS
	// 0 - 2
	if(grid_set[0].char === this.p.char && grid_set[1].char === this.p.char && grid_set[2].char === this.p.char)
	{
		trace("0-2 WIN");
		this.p_win = true;
	}

	// 3 - 5
	if(grid_set[3].char === this.p.char && grid_set[4].char === this.p.char && grid_set[5].char === this.p.char)
	{
		this.p_win = true;
	}

	// 6- 8
	if(grid_set[6].char === this.p.char && grid_set[7].char === this.p.char && grid_set[8].char === this.p.char)
	{
		this.p_win = true;
	}

	//////////// DOWN
	// 0 - 6
	if(grid_set[0].char === this.p.char && grid_set[3].char === this.p.char && grid_set[6].char === this.p.char)
	{
		this.p_win = true;
	}

	// 1 - 7
	if(grid_set[1].char === this.p.char && grid_set[4].char === this.p.char && grid_set[7].char === this.p.char)
	{
		this.p_win = true;
	}

	// 2 - 8
	if(grid_set[2].char === this.p.char && grid_set[5].char === this.p.char && grid_set[8].char === this.p.char)
	{
		this.p_win = true;
	}

	//////////// DIAGONAL
	// 0 - 8
	if(grid_set[0].char === this.p.char && grid_set[4].char === this.p.char && grid_set[8].char === this.p.char)
	{
		this.p_win = true;
	}

	//////////// DIAGONAL
	// 2 - 6
	if(grid_set[2].char === this.p.char && grid_set[4].char === this.p.char && grid_set[6].char === this.p.char)
	{
		this.p_win = true;
	}

	for(var i = 0; i < grid_set.length; i++)
	{
		if(!grid_set[i].populated)
		{
			gridFull = false;
		}
	}

	if(gridFull)
	{
		this.draw = true;
	}
}

Logic.prototype.result_translate = function()
{
	if(this.p.who === "PLAYER" && this.p_win)
	{
		game.result = "WIN";
	}

	else if(this.p.who === "ENEMY" && this.p_win)
	{
		game.result = "LOSE";
	}

	else if(this.draw)
	{
		game.result = "DRAW";
	}

	else
	{
		game.result = "";
	}
}


function thinking_init()
{
	thinking_arr = new Array();

	thinking_arr = rom.store.moveList.data;

	for(var i in thinking_arr)
	{
		thinking_arr[i].move_arr = thinking_random(thinking_arr[i].move_arr);
	}

	trace(thinking_arr);
}

function thinking_random(arr)
{
	arr.sort(function(){ return 0.5 - Math.random(); });

	return arr
}
