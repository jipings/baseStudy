/*
    Closures(闭包)是使用被作用域封闭的变量，函数，闭包等执行
    的一个函数的作用域。通常我们用和其相应的函数来指代这些作用域
    （可独立访问数据的函数）

    闭包是指这样的作用域，它包含有一个函数，这个函数可以调用被这个
    作用域所 封闭 的变量、函数或者闭包等内容。通常我们通过闭包所对应
    的函数来获得对闭包的访问。
 */
function init() {
    let name = "xxx";
    
    function displayName() {
        alert(name);
    }
    displayName();
}
init();
/*
    函数init() 创建了一个局部变量name和一个名为displayname()的函数。
    displayName() 是一个内部函数。定义init()之内且仅在该函数体内可用。
    dispalyName() 没有任何自己的局部变量，然而它可以访问到外部函数的变量，
    即可以使用父函数init()中声明的name变量。
*/
function makeFunc() {
    var name = 'xxx';
    function dispalyName() {
        alert(name);
    }
    return dispalyName;
}
var myFunc = makeFunc();
myFunc();
/*
    这个谜题的答案是 myFunc 变成一个 闭包 了。 闭包是一种特殊的对象。
    它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中
    的任何局部变量组成。在我们的例子中，myFunc 是一个闭包，由 displayName
     函数和闭包创建时存在的 "Mozilla" 字符串形成。

 */

 function makeAdder(x) {
     return function(y) {
         return x + y;
     };
 }
var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
// 在这个示例中，我们定义了 makeAdder(x) 函数：带有一个参数 x 并返回一个新的函数。返回的函数带有一个参数 y，并返回 x 和 y 的和。

// 从本质上讲，makeAdder 是一个函数工厂 — 创建将指定的值和它的参数求和的函数，在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。

// add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。


/*
 实用的闭包
    闭包允许将函数与其所操作的某些数据(环境)关联起来。这显然
    类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据
    (对象的属性)与一个或者多个方法相关联。

    因而，一般说来，可以使用只有一个方法的对象的地方，都可以使用闭包。

    在web中，大部分我们所写的web JavaScript代码都是事件驱动的
    定义某种行为，然后将其添加到用户触发的事件之上。我们的代码通常
    添加为回调：响应事件而执行的函数。

 */

 /*
    以下是一个实际的示例：假设我们想在页面上添加一些可以调整字号的按钮。一种方法是以像素为单位指定 body 元素的 font-size，然后通过相对的 em 单位设置页面中其它元素（例如页眉）的字号：

  */
//   body {
//   font-family: Helvetica, Arial, sans-serif;
//   font-size: 12px;
// }

// h1 {
//   font-size: 1.5em;
// }

// h2 {
//   font-size: 1.2em;
// }

/*
    我们的交互式的文本尺寸按钮可以修改body元素的font-size属性，
    而由于我们使用相对的单位，页面中的其他元素也会相应地调整。

 */
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    }
} 

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
// size12，size14 和 size16 为将 body 文本相应地调整为 12，14，16 像素的函数。我们可以将它们分别添加到按钮上（这里是链接）。如下所示：

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

// 使用闭包模拟私有方法
// java在内的一些语言支持将方法声明为私有的，即它们只能被同一个
// 类中的其它方法所调用。

// 对此, JavaScript 并不提供原生的支持，但是可以使用闭包模拟私有
// 方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名
// 空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。
// 下面的实例展示了如何使用闭包来定义公共函数，且其可以访问私有函数
// 和变量。 这个方式也称为 模块模式
var Counter = ~function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
}();
Counter.value();
Counter.increment();
Counter.increment();
Counter.decrement();
Counter.value();

/*
    这里有很多细节。在以往的实例中，每个闭包都有它自己的环境，
    为三个函数所共享： Counter.increment，Counter.decrement 和 Counter.value。

    
 */