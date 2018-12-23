// 柯理化函数的通用实现

function currying(fn) {
    var slice = Array.prototype.slice,
    __args = slice.call(arguments, 1);
    return function () {
        var __inargs = slice.call(arguments);
        return fn.apply(null, __args.concat(__inargs));
    };
}

function fn(x) {
    return x+x;
}
console.log(currying(fn)(1));

// 提高适用性
// 【通用函数】解决了兼容性问题，但同时也会再来，使用的不便利性，不同的应用场景往，要传递很多参数，以达到解决特定问题的目的。有时候应用中，同一种规则可能会反复使用，这就可能会造成代码的重复性。

function square(i) {
    return i * i;
}

function dubble(i) {
    return i *= 2;
}

function map(handeler, list) {
    return list.map(handeler);
}

map(square, [1,2,3]);

// 延迟执行
// 不断的柯里化，累积传入的参数，最后执行
var add = function() {
    var _this = this,
    _args = arguments
    return function() {
        if (!arguments.length) {
            var sum = 0;
            for (var i = 0,
            c; c = _args[i++];) sum += c
            return sum
        } else {
            Array.prototype.push.apply(_args, arguments);
             return arguments.callee; // arguments.callee 调用自身
        }
    }
}
add(1)(2)(3)(4)()+''//10

// 通用写法
var curry = function(fn) {
    var _args = [];

    return function cb () {
        if(arguments.length === 0 ) {
            console.log(_args,'reduce');
            return fn.apply(null, _args);
        }
        Array.prototype.push.apply(_args, arguments);
        return cb;
    }
};

var fn2 = function() {
    return Array.prototype.reduce.call(arguments, (a,b)=> a+b);
}

console.log(curry(fn2)(1)(2)(3)());

// 固定易变因素
// 柯里化特性决定了它这应用场景。提前把易变因素，传参固定下来，生成一个更明确的应用函数。最典型的代表应用，是bind函数用以固定this这个易变对象。

function _bind (context) {
    var _this = this;
    var _args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return _this.apply(context, _args.concat(Array.prototype.slice.call(arguments)));
    }
}