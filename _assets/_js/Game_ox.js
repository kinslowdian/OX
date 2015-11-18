var trace = function(str){ console.log(str); };

var grid_set;

var game;

function game_init()
{
  game = {};
  game.player = {};
  game.player.char = "o";

  game.enemy = {};
  game.enemy.char = "x";

  grid_set = new Array();

  for(var i = 0; i < 9; i++)
  {
    var g = {};
    g.num = i;
    g.char = "";
    g.populated = false;
    g.display = document.querySelector('#board .grid [data-grid="' + i + '"]');
    grid_set.push(g);
  }

  grid_interact();
}

function grid_interact()
{
  for(var i = 0; i < grid_set.length; i++)
  {
    var g = grid_set[i];
    var box = g.display;

    if(!g.populated)
      {
      box.classList.add("ox-interact");
    box.addEventListener("click", grid_interact_event, false);
      }

  }
}

function grid_deinteract(all, box)
{
  if(all)
  {
    for(var i = 0; i < grid_set.length; i++)
    {
      var box = grid_set[i].display;

      box.classList.remove("ox-interact");
      box.removeEventListener("click", grid_interact_event, false);
    }
  }

  else
  {
    box.classList.remove("ox-interact");
    box.removeEventListener("click", grid_interact_event, false);
  }
}

function grid_interact_event(event)
{
  event.preventDefault();

  var box = event.target.parentNode;

  box.querySelector(".character").classList.add("character-" + game.player.char);

  grid_deinteract(false, box);

  grid_register(box, game.player);

  enemy_move();
}

function grid_register(box, userObject)
{
  var num_id = box.dataset.grid;
  var targetBox;

  for(var i = 0; i < grid_set.length; i++)
    {
      if(grid_set[i].num == num_id)
        {
          targetBox = grid_set[i];
        }
    }

  targetBox.char = userObject.char;
  targetBox.populated = true;

  trace(targetBox);
}

function grid_update()
{

}



function enemy_move()
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

  box.querySelector(".character").classList.add("character-" + game.enemy.char);

  grid_deinteract(false, box);

  grid_register(box, game.enemy);

}