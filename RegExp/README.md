
## 断言 (Assertions)

表示一个匹配在某些条件下发生。断言包含先行断言、后行断言和条件表达式。

## 边界 (Boundaries)

表示行和单词的开始和结尾。

## 字符类别 (Character Classes)

区分不同类型的字符，例如区分字母和数字。

## 组和范围 (Groups and Ranges)

表示表达式字符的分组和范围。

## 量词 (Quantifiers)

表示匹配的字符或表达式的数量。

## Unicode 属性转义 (Unicode Property Escapes)

基于 unicode 字符属性区分字符。例如大写和小写字母、数学符号和标点。

## 使用正则表达式
正则表达式可以被用于 RegExp 的 exec 和 test 方法以及 String的 match、replace、search 和 split 方法。

## exec

一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回null）。

## test

一个在字符串中测试是否匹配 RegExp 方法，它返回 true 或 false

## match 

一个在字符串中执行查找匹配的 String 方法，它返回一个数组，在未匹配到时会返回 null

## matchAll

一个在字符串中执行查找所有匹配的 String 方法，它返回一个迭代器(iterator)。

## search 

一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1.

## replace 

一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替掉匹配到的子字符串

## split

一个使用正则表达式或者一个固定字符串分割一个字符串，并将分割后的子字符串存储到数组中的 String 方法。

## [正则教程](https://juejin.im/post/5acb4d3f6fb9a028c813295e)

## 正则的组成 每个正则都是由元字符和修饰符两部分组成，“/” 里面的内容称为元字符 “/”[修饰符]g、i、m

* g(global) -> 全局匹配
* i(ignoreCase) -> 忽略大小写匹配
* m(mutiline) -> 换行匹配

## 具有特殊意义的元字符

* \d -> 匹配一个 0 - 9 的数字，相当于[0-9],和它相反的是 \D -> 匹配一个除了0-9的任意字符
* \w -> 匹配一个0-9、a-z、A-Z、_ 的数字或字符，相当于`[0-9a-zA-Z_]`
* \s -> 匹配一个空白字符（空格、制表符...）
* \b -> 匹配一个单词的边界
* \t -> 匹配一个制表符
* \n -> 匹配一个换行符
* .  -> 匹配一个 \n 以外的任意字符
* ^  -> 以某一个元字符开头
* $  -> 以某一个元字符结尾
* \  -> 转义字符
* x|y -> x 或者 y 的一个
* `[xyz]` -> x、y、z 中的任意一个
* `[^xyz]` -> 除了 xyz 中的任意一个字符
* [a-z] -> 匹配 a-z 中任意一个字符
* [^a-z] -> 匹配除了 a-z 中的任意一个字符
* () -> 正则中的分组

## 代表出现次数的 “量词元字符“

* `+` : 出现一到多次
* `*` : 出现零到多次
*  ？  :  出现零到一次
* {n}  : 出现n次
* {n,} : 出现n到多次
* {n,m} : 出现n-m次


## 常用的正则表达式

* 手机号： 11 位数字、都是以 1 开头的

```js
var reg = /^1\d{10}$/;
```

* 真是姓名（中国）：两到四位的汉字

```js
var reg = /^[\u4e00-\u9fa5]{2,4}$/;
```

* 验证邮箱

```js
// 1633397595@qq.com
// 1633397595@163.com.cn
// 1633397595@163.com
// duffy_youxiang@tengxu.cn
var reg = /^[\w.-]+@([1-9]|[a-z]|[A-Z])+(\.[A-Za-z]{2,4}){1,2}$/
reg.test('1633397595@qq.com')

```

* 验证有效数字

```js
// 0 -12 -12.3 -12.0 12.3 12.0
var reg = /^-?(\d|([1-9]\d+))/

```
* 年龄：18-65之间

```js
// 18-19 /^1(8|9)$/
// 20-59 /^[2-5]\d$/
// 60-65 /^6[0-5]$/
var reg = /^((18|19)|([2-5]\d)|(6[0-5]))$/
```

## 正则的捕获

正则的捕获分为两个阶段：匹配：首先验证字符串和正则是否匹配，不匹配的话捕获到的结果为 null

```js
var str = 'dafei'
var reg = /\d+/;
console.log(reg.exec(str));//->null
```
### 捕获：
把正则匹配的内容捕获到：捕获到的结果是一个数组，数组第一项是当前正则匹配捕获的内容，index：捕获的开始索引位置，input: 捕获的原始字符串 每一次执行 exec 只能捕获到一个匹配的，想把所有匹配的都捕获到，至少需要执行多少次 ->但是一般情况下，我们不管执行多少次，每一次捕获的内容都是和第一次一模一样，后面的2017是捕获不到的 "正则捕获的懒惰性"

```js
var str = 'duffy2016px2017'

reg = /\d+/
console.log(reg.exec(str)) 
console.log(reg.exec(str)) 
```

* 为啥会出现懒惰性？
reg.lastIndex: 正则每一次捕获的时候，在字符串中开始查找的索引，正则每一次捕获结束后，默认的没有把lastIndex值进行修改，lastIndex 一直是零，导致第二次捕获还是从字符串的起始位置开始查找，导致每一次捕获的都是第一个和正则匹配的

有n个的匹配的就需要执行n次`exec`这个方法，比较麻烦，-> 字符串中提供了一个叫做`match`的方法，这个方法可以一次执行把所有匹配的捕获到

```js
var str = "duffy2016peixun2017";
var reg = /\d+/g;//->不管用哪个方法,g是不能少的
console.log(str.match(reg));//->["2016", "2017"]

```

但是match也有自己的局限性? 如果正则中出现分组,而且需要执行多次exec才能全部捕获的,使用match不能把分组的内容捕获到.最佳解决方案 ---replace