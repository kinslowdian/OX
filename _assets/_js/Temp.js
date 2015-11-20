







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