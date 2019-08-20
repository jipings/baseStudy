
var reg = /\d/; // \d 匹配一个 0-9 之前的数字 => [0-9]
console.log(reg.test('2016'))
console.log(reg.test('dufff0099ff'))

// exec -> 捕获

reg = /\d/g

console.log(reg.exec("2016"));//->["2", index: 0, input: "2016"]
console.log(reg.exec("2016"));//->["0"...]
console.log(reg.exec("2016"));//->["1"...]
console.log(reg.exec("2016"));//->["6"...]

reg = /\d+/ // 包含一到多个数字

console.log(reg.test('duff2016'))
// ^/$
reg = /^\d+$/ // 只能是一到多个数字
console.log(reg.test('duff2016'))
console.log(reg.test('2016'))

// .
reg = /^2.6$/ // \ 是转义字符： 把. 这个特殊意义(任意字符)的元字符转变为只代表本身意义(小数点) 的一个普通元字符
console.log(reg.test("2.6"))
console.log(reg.test("2@6"))

// []
// 在中括号内出现的所有字符（不管之前代表什么意思）在这里都只代表本身意思
reg = /^[2.3]$/
console.log(reg.test('.'))

reg = /^[\dz]$/ // \d 本身整体就是0-9之间的数字，在这里还是这个意思
console.log(reg.test('0'))

// 在中括号内出现的两位数不是一个两位数，而是左边或者右边的
reg = /^[10-23]$/ // 1或者0-2或者3
console.log(reg.test('10'))

// 在中括号中 ”-“ 具有连字符的作用，如果只想表示-，需要把其放在末尾
reg = /^[12-]$/
console.log(reg.test('-'))

// 中括号本身也有特殊的意思，如果需要只代表中括号本身的意思，需要进行转义
reg = /^\[\d+\]$/;
console.log(reg.test("[2000]"))

// x|y
reg = /^1|2$/; // 和这个有区别:/^[12]$/
console.log(reg.test('12'))

reg = /^10|28$/
console.log(reg.test('028'))    //->10、28、1028、102、108、128、028 ->不是我们想要的那个10或者28了

// () 分组： 把一个大正则划分成几个小正则 
// 1 改变正则默认的优先级
reg = /^(10|28)$/
console.log(reg.test('28'))

// 2 分组的第二个作用：分组引用
reg = /^[a-z]([a-z])\1[a-z]$/i // \1 出现和第一个分组一模一样的内容
console.log(reg.test('wood'))

// 创建正则两种方式： 字面量创建、实例创建
// 实例创建第一个参数是字符串
//->想要和字面量方式保持统一的话,对于\d \w \n...这些都需要多加一个\,使其\d具有自己的特殊的意义
//->在实例创建的方式中,我们只要出现\,基本上都是要写\\的
//->对于[]、()这类的是没有区别的

reg = /^\d+$/ig;

var reg2 = new RegExp('^\\d+$', 'ig');
console.log(reg2.test('2016'), reg.test('2016'))

var str = 'duffy2016px2017'

reg = /\d+/
console.log(reg.lastIndex);
console.log(reg.exec(str)) 
console.log(reg.lastIndex);
console.log(reg.exec(str)) 

reg = /\d+/g

console.log(str.match(reg))

// 格式化时间字符串

str = "2016-10-03";//->"2016年04月03日"
reg = /^([1-9]\d{3})-(0?[1-9]|1[0-2])-([02]\d|[3][0-1])$/g
console.log(reg.test(str))

var s1 = str.replace(reg, function(){
    console.log(arguments)
    return arguments[1] + '年'+ arguments[2] + '月' + arguments[3] + '日'
})
console.log(s1)

// 数字替换大小写
str = '123678';
var ary = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]

str = str.replace(/\d/g, function() {
    console.log(arguments)
    return ary[arguments[0]]
});
console.log(str);

// 简易模板引擎

var data = ['duffy', '27', 'china', 'javascript']
str = 'my name is {0}, my age is {1}, i come from {2}, i can do {3}'

reg = /\{(\d)\}/g
console.log(reg.test(str))

str = str.replace(reg, function() {
    console.log(arguments)
    return data[arguments[1]]
})
console.log(str)