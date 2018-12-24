// https://www.ibm.com/developerworks/cn/web/wa-lo-use-bluebird-implements-power-promise/index.html

const bluebird = require('bluebird');

console.time('bluebird');
bluebird.resolve('bluebird').then((res) => {console.log(res)});
console.timeEnd('bluebird');

console.time('promise');
Promise.resolve('Promise').then(res => console.log('promise'));
console.timeEnd('promise')