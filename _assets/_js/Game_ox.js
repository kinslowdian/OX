var trace = function(str){ console.log(str); };

var grid_set;

var game;

function game_init()
{
  game = {};
  game.player = {};
  game.player.char = "o";
  game.player.who = "PLAYER";
  game.enemy = {};
  game.enemy.char = "x";
  game.enemy.who = "ENEMY";
  game.user = "";
  game.targetBox = null;
  game.result = "";

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
  game.user = "PLAYER";

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
      var g = grid_set[i];
      var box = g.display;

      if(!g.populated)
      {
        box.classList.remove("ox-interact");
        box.removeEventListener("click", grid_interact_event, false);
      }

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

  grid_deinteract(true, null);

  game.targetBox = box.querySelector(".character");

  game.targetBox.addEventListener("animationend", grid_update, false);

  grid_register(box, game.player);
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

function grid_update(event)
{
  var status;

  game.targetBox.removeEventListener("animationend", grid_update, false);
  game.targetBox = null;

  game.user === "PLAYER" ? status = new Logic(game.player) : status = new Logic(game.enemy);
  status.result_check();
  status.result_translate();

  if(status.p_win)
  {
    if(game.result === "WIN")
    {
      alert("YOU WIN");
    }

    else if(game.result === "LOSE")
    {
      alert("YOU LOSE");
    }
  }

  else if(status.draw)
  {
    alert("DRAW");
  }

  else
  {
    if(game.result === "" || game.result !== undefined)
    {
      if(game.user === "PLAYER")
      {
        enemy_move();
      }

      else if(game.user === "ENEMY")
      {
        grid_interact();
      }
    }
  }
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

  game.user = "ENEMY";

  moveSelect = Math.floor(Math.random() * moveList.length);
  box = moveList[moveSelect].display;

  box.querySelector(".character").classList.add("character-" + game.enemy.char);

  grid_deinteract(false, box);

  game.targetBox = box.querySelector(".character");
  game.targetBox.addEventListener("animationend", grid_update, false);

  grid_register(box, game.enemy);

}