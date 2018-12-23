// Number 测试函数
Number.isInteger(22); // 测试是否整数
Number.isNaN(NaN); // 测试NaN

// 字符串拓展

'abcdef'.includes('c', 4); // false 从第5个字符开始查找是否有 'c' 这个字符
'abcdef'.startsWith('d', 3); //true 从第4个字符开始查找是否是以 'd' 字符为开头
'abcdef'.endsWith('d', 4); //true 前面的4个字符里，是否以 'd' 字符为结尾

'a'.repeat(5); //aaaaa 重复输出5遍

// 字符串遍历输出

//for ...of 格式为 es6 中的 Iterator 迭代器的输出方式
for(let c of 'abc'){
    console.log(c);
  }

  // 字符串补全
  '12345'.padStart(7, '0') //0012345 - 字符串不足7位，在头部补充不足长度的目标字符串
  '12345'.padEnd(7, '0') //1234500 - 在尾部进行字符串补全



// 数组扩展

let a = [1, 2];
let b = [3];
let c = [2, 4];
let d = [...a, ...b, ...c];//[1, 2, 3, 2, 4] 所有内容合并，但并不会去除重复

// 快速转换为数组

Array.of(3,4,5)//[3,4,5]
