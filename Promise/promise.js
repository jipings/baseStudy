// https://juejin.im/post/5a03c2d26fb9a045167ca122
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
  })
  promise.then(() => {
    console.log(3)
  })
  console.log(4)
  // Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  const promise2 = promise1.then(() => {
    throw new Error('error!!!')
  })
  
  console.log('promise1', promise1)
  console.log('promise2', promise2)
  
  setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
  }, 2000)
  
  // promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。

  const promise3 = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')
    resolve('success2')
  })
  
  promise3
    .then((res) => {
      console.log('then: ', res)
    })
    .catch((err) => {
      console.log('catch: ', err)
    })
  // 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。

  Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
//  解释：.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，
// 所以不会被后续的 .catch 捕获，
// 需要改成其中一种：return Promise.reject(new Error('error!!!'))    throw new Erro r('error!!!') 
// 因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。

const promise4 = Promise.resolve()
  .then(() => {
    return promise
  })
promise4.catch(console.error);

// 解释：.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。类似于：

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

  // 解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

// node 环境下执行
process.nextTick(() => {
    console.log('nextTick')
  })
  Promise.resolve()
    .then(() => {
      console.log('then')
    })
  setImmediate(() => {
    console.log('setImmediate')
  })
  console.log('end')
  
// process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。

// microtask（微任务） 和 macrotask（主任务）

// 事件循环（event loop）和任务队列（task queue）
// https://www.zcfy.cc/article/node-js-at-scale-understanding-the-node-js-event-loop-risingstack-1652.html
console.log('script start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {  
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
}) 
// 好可怕，那么我们去学习async.js吧

async function async1() {
  console.log( 'async1 start' )
  await async2()
  console.log( 'async1 end' )
}

async function async2() {
  console.log( 'async2' )
}

console.log( 'script start' )

setTimeout( function () {
  console.log( 'setTimeout' )
}, 0 )

async1();

new Promise( function ( resolve ) {
  console.log( 'promise1' )
  resolve();
} ).then( function () {
  console.log( 'promise2' )
} )

console.log( 'script end' )