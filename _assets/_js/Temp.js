
function thinking_moveFirst()
{
	status.ai_list = new Array();
	status.ai_count = 0;
	status.ai_stall = false;

	status.ai_list = thinking_random(thinking_arr);

	thinking_newRoute();
}

function thinking_newRoute()
{
	if(status.ai_stall)
	{
		thinking_flustered();
	}

	else
	{
		status.ai = status.ai_list[status.ai_count];

		thinking_apply();
	}
}

function thinking_move()
{
	var attack = true;

	// CHECK IF WIN POSSIBLE

	for(var i = 0; i < grid_set.length; i++)
  {
    var g = grid_set[i];

    for(var j in thinking_arr[status.ai].move_arr)
    {
	    if(g.num == thinking_arr[status.ai].move_arr[j])
	    {
	    	if(!g.populated)
	    	{
	    		attack = false;
	    	}
	    }
    }
  }

  if(attack)
  {
  	// PLANT MOVE
  	status.ai_turn = status.ai.move_arr[status.ai.move_num];
  	status.ai.move_num++;
  }

  else
  {
  	// FIND OTHER SEQUENCE
  	status.ai_count ++;

  	// EXHAUSTED LIST
  	if(status.ai_count == status.ai_list.length)
  	{
  		status.ai_stall = true;
  	}

  	thinking_newRoute();
  }
}

function thinking_apply()
{
  var moveSelect = 0;
  var box = grid_set[status.ai_turn];

  thinking_draw(box);
}

function thinking_flustered()
{
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