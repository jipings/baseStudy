/*
1,闭包
    闭包就是一个函数可以访问到另外一个函数的变量。这就是闭包。

 */
function getName() {
    var name="wenzi"
    setTimeout(function() {
        console.log(name);
    }, 500);
}
getName();
/*
这就其实已经是闭包了，setTimeout中的function是一个匿名函数，这个
匿名函数里的name是getName()作用域中的变量，匿名函数里只有一个
输出语句：console.log()
 */
function create() {
    var i =0;
    return function() {
        i++;
        console.log(i);
    }
}
var c = create();
c();
c();
c();
/*
在上面的例子中，create()返回的是一个函数，我们暂且称之为函数A吧。
在函数A中，有两条语句，一条是变量i自增（i++），一条是输出语句（console.log）
第一次执行c()时会产生什么样的结果？嗯，输出自增后的变量i，也就是输出1；那么第二次执行c()呢，对，会输出2；第三次执行c()时会输出3，依次累加。这个create()函数依然满足了我们在刚开始时的定义，函数A使用到了另一个函数create()中的变量i。

可是为什么会产生这样的输出呢，为什么i就能一直自增呢，create函数已经执行完并返回结果了呀，可是为什么还能接着使用i呢，而且i还能自增。这里就涉及到了三个比较重要的概念，讲解完这三个概念，我们对闭包就可以有一个比较好的理解了。
 */

