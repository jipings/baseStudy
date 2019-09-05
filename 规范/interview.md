
## 基础
js基础通过 mdn 文档自己看几遍大部分都能够过

* var 变量提升

* 基本数据类型，引用数据类型，有哪些区别（基本数据类型，声明过后不可修改，引用数据类型声明过后可以修改里面的属性）

* js 垃圾回收机制

* 原型原型链基本都问，怎么理解，如何实现继承，实例上的属性查找

* es5 es6 Array常用的方法(map, forEach, fill, findIndex, reduce, filter) 需要看文档记清楚，有几个参数

* es6 的 class 通过 extend 继承，constructor， super关键字啥意思，es5 如何实现

* es6 箭头函数，es6 如何转成 es5 （ MDN 每个es6最下面都有兼容写法）

* Promise async await 

* js  event loop (setTimeout和promise同为异步，有什么区别)

* 正则问题，匹配邮箱什么的，如何实现一个简易模板引擎

* 观察者模式和订阅发布模式区别，如何用代码实现

* 函数防抖，函数节流

* 算法，排序，快速排序，时间复杂度和内存复杂度 （算法很少问，能答出来快速排序就不错了）

* 对象深copy，如何优化深 copy 性能

## DOM基础（浏览器）

* 标准盒模型和IE盒模型（很少人问）

* touch 事件和 click 事件有何不同

* target 和 currentTarget 有什么不同， 什么是DOM事件委托（冒泡，捕获）

* css 各种布局，居中，css3 动画，兼容性问题

* 跨域 jsonp 原理，cross ， window.postMessage

* cookie 安全问题 xss csrf

* 输入网址如何加载一个页面(强制缓存，协商缓存有什么区别)

* web worker

* canvas svg， canvas 如何优化

## React Redux Webpack

* react diff 算法的策略，会让详细说，你如果用过diff算法，那很装逼了（tree diff, component diff, element diff）

* React 执行声明周期顺序（新增的声明周期），对 Hooks 的理解

* HOC 组件如何封装，有什么好处，（antd form input 通过hoc封装的，问你有没有看过源码）

* 父子组件传递数据

* context 如何使用

* setState 之后会发生什么，为什么 setState 不做成同步的 （react 数据潜合并， vue 脏数据检测，会问脏数据检测如何实现）

* 在项目中如何拆分组件

* Redux 怎么使用的，源码看过没有（redux 源码没有那么难， 但是其中方法都要理解，会参照着这些方法写个更好）

* webpack 如何配置，如何去写一个loader 或者 plugin， 怎么去做打包优化和热更新优化

* 用没用过 ssr （服务端渲染），用过怎么实现的，如何优化

* vue，angular 有没有用过，在设计思想上有什么区别 （很少问，没用过可以不答，没影响）

* 是否用过 TypeScript 会问一些 ts 解决 js 什么问题，有的会问 ts 的某个功能用 js 如何实现 

* 写没写过测试，如何写单元测试，如何对 react 组件进行单元测试，原理是啥

## mobile

* ios点击 300ms 延迟如何解决， react 16.3 以后解决了这个bug，需要配置 meta 标签，能够说清楚以前处理的方式，为什么会出现这个问题

* 首屏加载优化

* jsBridge 如何实现的 如何优化 jsb 的并发

* RN 用过没，flutter 用过没

* 移动端自适应



