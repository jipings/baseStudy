
// 解码使用base-64编码的一串数据 
// Decodes a string of data which has been encoded using base-64 encoding.
let result = null;
const atob = str => Buffer.from(str, 'base64').toString('binary');
result = atob('Zm9vYmFy'); // 'foobar'

// 将字符串编码成base64
// Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.
const btoa = str => Buffer.from(str, 'binary').toString('base64');
result = btoa('foobar');

// Add special characters to text to print in color in the console (combined with console.log()).

const colorize = (...args) => ({
    black: `\x1b[30m${args.join(' ')}`,
    red: `\x1b[31m${args.join(' ')}`,
    green: `\x1b[32m${args.join(' ')}`,
    yellow: `\x1b[33m${args.join(' ')}`,
    blue: `\x1b[34m${args.join(' ')}`,
    magenta: `\x1b[35m${args.join(' ')}`,
    cyan: `\x1b[36m${args.join(' ')}`,
    white: `\x1b[37m${args.join(' ')}`,
    bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
    bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
    bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
    bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
  });
  console.log(colorize('foo').red); 
  console.log(colorize('foo', 'bar').bgBlue);
  console.log(colorize(colorize('foo').yellow, colorize('foo').green).bgWhite); 
// hasFlags
// Check if the current process's arguments contain the specified flags
const hasFlags = (...flags) => 
    flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
// node myScript.js -s --test --cool=true
result = hasFlags('-s'); // true
result = hasFlags('--test', 'cool=true', '-s'); // true
// result = hasFlags('special'); // false

// hashNode
const crypto = require('crypto');
const hashNode = val =>
  new Promise(resolve => 
        setTimeout(
            () => resolve(
                crypto
                    .createHash('sha256')
                    .update(val)
                    .digest('hex')
            ), 0
        )
    );

hashNode(JSON.stringify({a:'a',b:[1,2,3,4], foo:{c:'bar'}})).then(console.log);
console.log(result);