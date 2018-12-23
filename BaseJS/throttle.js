/*函数防抖*/
/*
        函数节流的原理挺简单的，估计大家都想到了，那就是定时器。当我触发一个时间时，先setTimout让这个事件延迟一会再执行，如果在这个时间间隔内又触发了事件，那我们就clear掉原来的定时器，再setTimeout一个新的定时器延迟一会执行，就这样。
        */
var throttle = function(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.call(context);
    }, delay);
  };
};

/*函数分流*/

var throttleV2 = function(fn, delay, mastTime) {
  var timer = null,
    t_start;
  return function() {
    var context = this,
      args = arguments,
      t_curr = +new Date();
    clearTimeout(timer);
    if (!t_start) {
      t_start = t_curr;
    }
    if (t_curr - t_start > mastTime) {
      console.log(t_curr - t_start, t_curr, t_start);
      fn.apply(context, args);
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  };
};
