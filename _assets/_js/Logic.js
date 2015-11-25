var thinking_arr;

var gameBoard;

var progress;

var Logic = function(ob)
{
	trace(ob);
	this.p = ob;
	this.p_win = false;
	this.draw = false;
};

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
};

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
};

var Board = function()
{

};

Board.prototype.init = function()
{
	this.ai = {};
	this.ai_list = new Array();
	this.ai_count = 0;
	this.ai_stall = false;

	this.ai_turn = 0;
};

var Score = function()
{

};

Score.prototype.init = function()
{
	this.counter_win 	= 0;
	this.counter_lose = 0;
	this.counter_draw	= 0;
};

Score.prototype.update = function(flag)
{
	switch(flag)
	{
		case "W":
		{
			this.counter_win ++;
			break;
		}

		case "L":
		{
			this.counter_lose ++;
			break;
		}

		case "D":
		{
			this.counter_draw ++;
			break;
		}

		default :
		{

		}
	}
};


function thinking_init()
{
	thinking_arr = new Array();

	thinking_arr = rom.store.moveList.data;

	for(var i in thinking_arr)
	{
		thinking_arr[i].move_arr = thinking_random(thinking_arr[i].move_arr);
	}

	thinking_moveFirst();

	trace(thinking_arr);
}

function thinking_moveFirst()
{
	gameBoard = new Board();

	thinking_refresh();
}

function thinking_newRoute()
{
	if(gameBoard.ai_stall)
	{
		thinking_flustered();
	}

	else
	{
		gameBoard.ai = gameBoard.ai_list[gameBoard.ai_count];

		thinking_move();
	}
}

function thinking_move()
{
	var attack = true;

	// CHECK IF WIN POSSIBLE

	for(var i = 0; i < grid_set.length; i++)
  {
    var g = grid_set[i];

    for(var j in gameBoard.ai.move_arr)
    {
	    if(g.num == gameBoard.ai.move_arr[j])
	    {
	    	if(g.populated)
	    	{
	    		attack = false;
	    	}
	    }
    }
  }

  if(attack)
  {
  	trace("GOOD");
  	// PLANT MOVE
  	gameBoard.ai_turn = gameBoard.ai.move_arr[gameBoard.ai.move_num];
  	gameBoard.ai.move_num++;

  	thinking_apply()
  }

  else
  {
  	trace("CHANGE");
  	gameBoard.ai_list[gameBoard.ai_count].move_end = true;
  	gameBoard.ai_count ++;

  	// EXHAUSTED LIST
  	if(gameBoard.ai_count == gameBoard.ai_list.length)
  	{
  		gameBoard.ai_stall = true;
  	}

  	else
  	{
  		gameBoard.ai = gameBoard.ai_list[gameBoard.ai_count];
  	}

  	thinking_newRoute();
  }
}

function thinking_apply()
{
  var moveSelect = gameBoard.ai.move_arr[gameBoard.ai.move_num];
	var box = grid_set[moveSelect].display;

  thinking_draw(box);
}

function thinking_flustered()
{
  trace("LOSING!!!");

  var moveList = new Array();
  var moveSelect = 0;
  var box;

  for(var i = 0; i < grid_set.length; i++)
  {
    var g = grid_set[i];

    if(!g.populated)
      {
        moveList.push(g);
      }
  }

  moveSelect = Math.floor(Math.random() * moveList.length);
  box = moveList[moveSelect].display;

  thinking_draw(box);
}

function thinking_draw(box)
{
  game.user = "ENEMY";

  box.querySelector(".character").classList.add("character-" + game.enemy.char);
  box.querySelector(".character").classList.add("tween-characterIn");

  grid_deinteract(false, box);

  game.targetBox = box.querySelector(".character");
  game.targetBox.addEventListener("animationend", grid_update, false);

  grid_register(box, game.enemy);
}

function thinking_refresh()
{
	gameBoard.init();
	gameBoard.ai_list = thinking_random(thinking_arr);

	for(var i in gameBoard.ai_list)
	{
		gameBoard.ai_list[i].move_num = 0;
		gameBoard.ai_list[i].move_end = false;
	}

	trace(gameBoard.ai_list);
}

function thinking_random(arr)
{
	arr.sort(function(){ return 0.5 - Math.random(); });

	return arr
}

function progress_init()
{
	progress = new Score();

	progress.init();
}
