// 目标函数指定作用域来简单实现bind()方法

Function.prototype._bind = function(context) {
    console.log(arguments);
    var args = Array.prototype.slice.call(arguments, 1);
    self = this;
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply(context, finalArgs);
    }
};

function a() {
    console.log(this.x);
}
var c = {x:'asd'};
setTimeout(function() {
    console.log(this.x)
}._bind(c),0)

