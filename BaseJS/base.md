
## 响应报文

常见的状态码

* 200 ok
* 301 Moved Permanently 请求永久重定向
* 302 Moved Temporarily 请求临时重定向
* 304 Not Modified 文件未修改，可以直接使用缓存文件
* 400 客户端请求错误
* 401 请求未经授权
* 403 服务器收到请求，但是拒绝提供服务
* 404 请求的资源不存在
* 500 服务器发生了不可预测的错误
* 504 服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常。


## 节流函数和防抖函数

## 写一个通用的事件侦听器函数。


## AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？

异步模块定义（AMD）是Asynchronous Module Definition的缩写，是 RequireJS 在推广过程中对模块定义的规范化产出。
通用模块定义（CMD）是Common Module Definition的缩写，是SeaJS 在推广过程中对模块定义的规范化产出。

AMD RequireJS 提前执行, 依赖前置

CMD SeaJS 延迟执行, 依赖就近

## React-router 路由的实现原理？
react-router 是基于 history 模块提供的 api 进行开发的


## 受控组件(Controlled Component)与非受控组件(Uncontrolled Component)的区别

## Redux是如何做到可预测呢？


## Redux将React组件划分为哪两种？

## Redux是如何将state注入到React组件上的？

## 请描述一次完整的 Redux 数据流

## React的批量更新机制 BatchUpdates？


## 是否了解Web注入攻击，说下原理，最常见的两种攻击（XSS 和 CSRF）了解到什么程度？

## JavaScript垃圾回收机制 v8垃圾回收
标记清除和引用计数
* 垃圾回收机制的原理：垃圾收集器会按照固定的时间间隔或代码执行中预定的收集时间，周期性地执行以下操作——找出不再继续使用的变量，然后释放其占用的内存。
* 1、标记清除法：
JavaScript最常用的垃圾收集方式。当变量进入环境时，这个变量标记为“进入环境”；而当变量离开环境时，则将其标记为“离开环境”。可以使用一个“进入环境”的变量列表及一个“离开环境”的变量列表来跟踪变量的变化，也可以翻转某个特殊的位来记录一个变量何时进入环境及离开环境。
* 2、引用计数法：
不太常见的垃圾收集策略。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则该值的引用次数就是1；如果同一个值又被赋给另一个变量，则该值的引用次数加1；如果包含对该值引用的变量又取得了另外一个值，则该值的引用次数减1。当该值的引用次数变为0时，则可以回收其占用的内存空间。当垃圾回收器下一次运行时，就会释放那些引用次数为0的值所占用的内存。

## babel转码JSX


## ReactDOM.render()实现原理

## setState实现原理和生命周期

## [还有differ算法 react diff](http://www.infoq.com/cn/articles/react-dom-diff)

## 进程与线程的区别。然后问进程间通信，问内存的管理方式，分页和分段。

## 随后是计算机网络部分，先问TCP和UDP的区别，优缺点，适用场景。

## 然后问TCP三次握手，四次挥手

## [怎样保证数据有序？怎样保证可靠性？](https://blog.csdn.net/u012495483/article/details/77345823)

## HTTP协议有哪些方法，get和post有什么区别

## ()=>{a:1}该箭头函数返回值是什么，理由。

## debounce,new,Object.create,promise,bind

## promise和setTimeout异步队列

## 设计模式，各种继承方法

## https，缓存，跨域，网络安全，状态码

## 访问页面的过程

## [性能优化](https://juejin.im/post/5a99f80cf265da238c3a1e16)

## 移动端自适应

## 各种排序，背包问题，二叉树

## pwa，小程序

## 项目部署

## 项目监控

## 错误处理

## nodejs

## css3 动画

## 实现一个Proxy

## web-component

## web worker

## server worker

## pwa

## 时间驱动模型

## 惰性求值

## 设计模式

## AOP编程

## 中间件设计模式

## 处理数组性能
```js
const arr = Object.freeze([1,2,3,-1,2,10,0]);
```
实现一个 sliceAdd(x,y) 方法，x,y为arr的某一个索引，y > x,实现 x 索引到 y 索引区间内的数据和
```js
const sliceAdd = (x, y) => {
   return arr.slice(x,y+1).reduce((a,b) => a+b);
}
``` 
如何进一步优化性能
```js
// 计算方式为 0 -> y 的和（运算出结果后记录到新数组内，提高下次计算命中） 减去 0 -> x 的和，为y -> x 的数据和
const arr = Object.freeze([1,2,3,-1,2,10,0]);
const newArr = [];
const sliceAdd = (x, y) => {
    let zeroToX, zeroToY;
    if(newArr[x]) {
        zeroToX = newArr[x];
    } else {
        zeroToX = arr.slice(0, x+1).reduce((a,b) => a+b);
        newArr[x] = zeroToX;
    }
    if(newArr[y]) {
        zeroToY = newArr[x];
    } else {
        zeroToY = arr.slice(0, y+1).reduce((a,b) => a+b);
    }
    return zeroToY-zeroToX;
}
```

## 数据深度clone, 比如原生 DOM/BOM 对象怎么处理，RegExp 怎么处理，函数怎么处理，原型链怎么处理?
https://www.zhihu.com/question/47746441?from=profile_question_card
https://github.com/yyx990803/circular-json-es6

## 事件队列，事件权重，同步异步处理
* 实现一个LazyMan，
```js
LazyMan('Hank').sleep(10).eat('apple').eat('dinner');
 // log
 hello Hank !
 // 10秒后
 Hank wake up!
 eat apple!
 eat dinner!

 LazyMan('Hank').firstSleep(10).eat('apple').sleep(10).eat('dinner')...;

// 10秒后
 Hank first wake up!
 hello Hank !
 eat apple!
 // 10秒后
 Hank wake up!
 eat dinner!
 ...
```
https://segmentfault.com/a/1190000009018654