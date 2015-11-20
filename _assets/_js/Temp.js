var gameBoard;

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
	}

	trace(gameBoard.ai_list);
}















// DYNAMIC FUNCTION WITH STRINGS
function timer_init_old(f_obj)
{
  var trigger_f;
  var trigger_p;

  trigger_f = window[f_obj.call_f];
  trigger_p = f_obj.call_p;

  trigger_f.apply(this, trigger_p);

}

function test(a, b)
{
  trace(a);
  trace(b);
}

// format
// timer_init({call_f:"test", call_p:["one", "two"]});

// timer_init({wait: 4, func: test, para:["one", "two"]});
// timer_init({wait: 4, func: test});