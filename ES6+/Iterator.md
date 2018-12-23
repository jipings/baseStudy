## Iterator （遍历器）的概念

JavaScript 原有的表示 “集合”的数据结构，主要是数组 (Array) 和对象 (Object),
ES6 又添加了 Map 和 Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

下面是一个模拟next方法返回值的例子。

```js
var it = makeIterator(['a','b']);
it.next();
it.next();
it.next();

function makeIterator(arr) {
    var nextIndex = 0;
    return {
        next: function() {
            return nextIndex < arr.length ?
            {value: arr[nextIndex++],done: false}:
            {value: undefined, done: true};
        }
    }
}
```

## 默认 Iterator 接口

Iterator 接口的目的,就是为所有数据结构，提供一种统一的访问机制，即for...of 循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。

    一种数据结构只要部署了Iterator 接口，我们就称这种数据结构时“可遍历的”（Iterator）;

es6 规定，默认 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是 “可遍历”（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名 Symbol.iterator，它是一个表达式，返回 Symbol 对象的 Iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。

```js
const obj = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return {
                    value: 1,
                done: true,
                }
            }
        }
    }
}
```
对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象

原生具备 Iterator 接口的数据结构如下

    Array
    Map
    Set
    String
    TypedArray
    函数的 arguments 对象
    NodeList 对象

数组的 Symbol.iterator 属性

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next();
iter.next();
iter.next();
iter.next();
```
变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器对象。

对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

