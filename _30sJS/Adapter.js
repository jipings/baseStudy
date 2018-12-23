
// https://30secondsofcode.org/adapter#ary
let result = null;
// ary
const ary = (fn, n) => (...args) => fn(...args.slice(0,n))
const firstTwoMax = ary(Math.max, 2);
result = [[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)); // [6, 8, 10]

// call
const call = (key, ...args) => context => {
    return context[key](...args);
} 

Promise.resolve([1,2,3])
    .then(call('map', x => 2*x))
    .then(console.log)

const map = call.bind(null,'map');
Promise.resolve([1,2,3])
    .then(map(x => 2*x))
    .then(console.log)

// collectInto

const collectInto = fn => (...args) => fn(args);

const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log);

// flip

const flip = fn => (first, ...rest) => fn(...rest, first);

let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
result = mergePerson(b);
b = {};
result = Object.assign(b, a);

// over
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))
const minMax = over(Math.min, Math.max);
result = minMax(1, 2, 3, 4, 5);

// overArgs
const overArgs = (fn, transforms) => (...args) => fn(...args.map((val,i) => transforms[i](val)))
const square = n => n*n;
const double = n => n*2;
const fn = overArgs((x,y) => [x,y], [square, double]);
result = fn(9,3)

// pipeFunctions
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
const add5 = x => x + 5;
const add2 = x => x + 2;
const multiply = (x,y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5, add2);
result = multiplyAndAdd5(5,2)

// pipeAsyncFunctins
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async() => {
  console.log(await sum(5)); // 15 (after one second)
})();

// promisify
const promisify = func => (...args) => 
    new Promise(
        (resolve, reject) => func(...args,(err, result) => (err? reject(err):resolve(result)))
    )

const delay = promisify((d,cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!', 'delay'));

// rearg
const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]));
var rearged = rearg(
    function(a, b, c) {
      return [a, b, c];
    },
    [2, 0, 1]
  );
result = rearged('b', 'c', 'a');

// spreadOver
const spreadOver = fn => argsArr => fn(...argsArr);
const arrayMax = spreadOver(Math.max);

result = arrayMax([1, 2, 3]); // 3

// unary 
const unary = fn => val => fn(val);
result = ['6.12', '8', '10'].map(unary(parseInt)); // [6, 8, 10]
console.log(result);

