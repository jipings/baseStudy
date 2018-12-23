// https://segmentfault.com/a/1190000017224799
// https://segmentfault.com/a/1190000007535316
/* await 等待， await是在等待一个async函数完成。await其实是一个表达式，这个表达式
的计算结果是Promise 对象或者其它值
因为async函数返回一个Promise对象，所以await可以用于等待一个async 函数的返回值
也可以说await在等待async函数，它等的实际是一个返回值。注意到await不仅仅用于等Promise对象
它可以等任意表达式的结果，所以，await后面实际是可以接普通函数调用或者直接量
*/

function getSomething() {
    return 'something';
}

async function testAsync() {
    return Promise.resolve("hello async")
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
};

test();

/*
    await 等到了要等的，然后呢
    await等到了它要等的东西，一个Promise 对象，或者其他值，然后呢，await是个运算符，用于组成表达式
    await表达式的运算结果取决于它等的东西

    如果它等到的不是一个Promise 对象，那await表达式的运算结果就是它等到的东西

    如果它等到的不是一个Promise 对象，await就忙起来了，它会阻塞后面的代码，等着Promise
    对象的resolve，然后得到resolve的值，作为 await 表达式的运算结果

    由于await会造成阻塞，这就是await必须用在async函数中的原因。async函数调用不会造成
    阻塞，它内部所有的阻塞都被封装在一个Promise对象中异步执行
*/
// setTimeout 模拟耗时的异步操作

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve('long-time-value'), 1000);
    });
};

// takeLongTime().then(v => {
//     console.log('got',v)
// })

// 使用async/await改写


async function testTake() {
    const v = await takeLongTime();
    console.log(v);
}
console.log('hhh')
testTake();

/*
async/await 的优势在于处理then 链
单一的Promise 链 并不能发现 async/await 的优势，但是， 如果需要处理多个 Promise 组成的then 链的时候，
优势就能体现出来（Prmose 通过then链来解决多层回调的问题，现在又用 async/await 来进一步优化它）
*/

// 假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 setTimeout 来模拟异

/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */

 function takeLongTimeT(n) {
     return new Promise(resolve => {
         setTimeout(() => resolve(n+200), n);
     })
 };

 function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTimeT(n);
 };

 function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTimeT(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTimeT(n);
}

// 使用 promise 方式来实现这三个步骤的处理
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd('doIt')
        })
};

doIt();

// 使用async 改写

async function doIt2() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd('doIt')
}

// 现在把业务要求改一下，仍然是三个步骤，但每一个步骤都需要之前每个步骤的结果。
function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}

async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();

// 把它写成 Promise 方式实现

function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

// await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

async function myFunction() {
    try {
      await somethingThatReturnsAPromise();
    } catch (err) {
      console.log(err);
    }
  }
  
  // 另一种写法
  
  async function myFunction() {
    await somethingThatReturnsAPromise().catch(function (err){
      console.log(err);
    });
  }