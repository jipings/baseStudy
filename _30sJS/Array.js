// Array.prototype.every()
let result = null;
const all = (arr, fn = Boolean) => arr.every(fn);

result = all([4,2,3, 2], x => x>1); // true
result = all([1,2,3, null]) // false

// allEqual
const allEqual = arr => arr.every(val => val=== arr[0]);

result = allEqual([2,2,2,2]); // true
result = allEqual([1,2,2,2]); // false

// any Array.prototype.some()
const any = (arr, fn = Boolean) => arr.some(fn);
result = any([0,1,2,0], x => x >= 2); // true
result = any([0,0,1,null]) // true
result = any([0,0,0,null]) // false

// arrayToCSV Array.prototype.map()  Array.prototype.join(delimiter)
const arrayToCSV = (arr, delimiter = ",") => arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n')
result = arrayToCSV([['a', 'b'], ['c', 'd']]);

// bifurcate 
/*
Splits values into two groups. If an element in filter is truthy, the corresponding
element in the collection belongs to the first group; othervise, it belongs to the second group
*/

const bifurcate = (arr, filter) => {
    return arr.reduce((acc, val, i) => (acc[filter[i]?0:1].push(val),acc),[[],[]] )
}
result = bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]

// bifurcateBy
const bifurcateBy = (arr, fn) => {
    return arr.reduce((acc, val, i) => (acc[fn(val, i)?0:1].push(val),acc), [[],[]])
}
result = bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]

// chunk
// Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
// Math.ceil() 向上取整数
const chunk = (arr, size) => {
    return Array.from({length: Math.ceil(arr.length / size)}, (v, i) => (arr.slice(i*size, i*size + size)))
}
result = chunk([1,2,3,4,5], 2)

// compact
// Removes falsey values from an array.
// Use Array.prototype.filter() to filter out falsey values (false, null, 0, "", undefined, NaN)
const compact = arr => arr.filter(Boolean);
result = compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);

// countBy

const countBy = (arr, fn) => {
    return arr.map(typeof fn === 'function'? fn : val => val[fn]).reduce((acc, val) => {
        acc[val] = (acc[val]||0)+1
        return acc
    }, {})
}

result = countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
result = countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}

// countOccurrences
const countOccurrences = (arr, val) => arr.reduce((a,v) => (v === val?a+1:a), 0);
result = countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

// deepFlatten
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v)?deepFlatten(v):v)))
result = deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

// difference
const difference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x))
} 
result = difference([1,22,3],[1,2,3])

// differenceBy
const differenceBy = (a,b,fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => !s.has(fn(x)));
}
result = differenceBy([2.1,1.2],[2.3,3.4], Math.floor)
result = differenceBy([{x:2},{x:1}], [{x:1}], v => v.x)

// differenceWith
// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a,b)) === -1);
result = differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b));

// drop
const drop = (arr, n = 1) => arr.slice(n);
result = drop([1, 2, 3]); // [2,3]
result = drop([1, 2, 3], 2); // [3]
result = drop([1, 2, 3], 42); // []

// dropRight
const dropRight = (arr, n = 1) => arr.slice(0, -n);
result = dropRight([1, 2, 3]); 
result = dropRight([1, 2, 3], 2); 
result = dropRight([1, 2, 3], 42);

// dropRightWhile
const dropRightWhile = (arr, func) => {
    while(arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0,-1)
    return arr;
}
result = dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

// dropWhile
const dropWhile = (arr, func) => {
    while(arr.length>0 && !func(arr[0])) arr = arr.slice(1);
    return arr;
}
result = dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

// everyNth
const everyNth = (arr, nth) => arr.filter((e,i) => i % nth === nth - 1);
result = everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]

// filterFalsy
const filterFalsy = arr => arr.filter(Boolean)
 result = filterFalsy(['', true, {}, false, 'sample', 1, 0]); // [true, {}, 'sample', 1]


// filterNonUnique
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
result = filterNonUnique([1, 2, 2, 3, 4, 4, 5]);

// findLast
const findLast = (arr, fn) => arr.filter(fn).pop();
result = findLast([1, 2, 3, 4], n => n % 2 === 1);

// findLastIndex
const findLastIndex = (arr, fn) => arr
        .map((val, i) => [i, val])
        .filter(([i,val]) => fn(val,i,arr))
        .pop()[0]

result = findLastIndex([1, 2, 3, 4], n => n % 2 === 1);

// flatten
const flatten = (arr, depth = 1) => 
            arr.reduce((a, v)=> a.concat( depth > 1 && Array.isArray(v) ? flatten(v,depth -1) : v ),[]);

result = flatten([1, [2], 3, 4]);
result = flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);

// forEachRight
const forEachRight = (arr, callback) => arr.slice(0).reverse().forEach(callback);
// forEachRight([1,2,3,4], val => console.log(val))

// groupBy
const groupBy = (arr, fn) => 
    arr.map(typeof fn === 'function'?fn:val => val[fn])
        .reduce((acc,val,i)=> {
            acc[val] = (acc[val]||[]).concat([arr[i]])
            return acc;
        }, {})

result = groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
result = groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}

// head
const head = arr => arr[0]

// indexOfAll
const indexOfAll = (arr, val) => arr.reduce((acc,el,i) => (el === val?[...acc,i]:acc), []);
result = indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]

// initial
const initial = arr => arr.slice(0,-1);
result = initial([1,2,3]);

// initialize2DArray
// fill() 方法用于将一个固定值替换数组的元素。
// array.fill(value, start, end)
const initialize2DArray = (w, h, val = null) => 
    Array.from({length: h}).map(() => Array.from({length: w}).fill(val));

result = initialize2DArray(2, 2, 0);

// initializeArrayWithRange
const initializeArrayWithRange = (end, start = 0, step = 1) => {
    return Array.from({length: Math.ceil(( end - start )/step)}, (v, i) => i*step + start);
} 
result = initializeArrayWithRange(5);
result = initializeArrayWithRange(7, 3);
// result = initializeArrayWithRange(9, 0, 2);

// initializeArrayWithRangeRight
const initializeArrayWithRangeRight = (end, start = 0,step = 1) =>
    Array.from({length:Math.ceil((end+1-start)/ step)})
        .map((v,i,arr) => (arr.length - i - 1) * step + start);

result = initializeArrayWithRangeRight(9, 0, 2);
console.log(result);
