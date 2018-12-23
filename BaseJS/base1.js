// 不要厌烦熟悉的事物,每天都进步一点;不要畏惧陌生的事物,每天都学习一点;

// 基本数据类型: null, undefined, number, string, boolean
// 引用数据类型: Object: date, Array, {}, function, RegExp

/* 检测数据类型的方法

 1, typeof 
    局限性:不能准确检测
    typeof null -> Object;
    typeof [] -> Object;
    typeof {} -> Object;
    

2, instanceof/constructor  检测某一个实例是否属于某一个类
->我们使用instanceof/constructor可以检测数组和正则了

    [] instanceof Array -> true;
    /^$/ instanceof Object -> true;
    [] instanceof Object -> true;

    [].constructor === Array -> true;
    [].constructor === Object -> false; constructor可以避免instanceof检测的时候,用Object也是true的问题
    {}.constructor === Object -> true; 

局限性
    1, 用instanceof检测的时候,只要当前的这个类在实例的原型链上(可以通过原型链__proto__找到它),检测出来的结果都是true
    2, 基本数据类型不能使用instanceof检测
        1 instanceof [] -> false;

    3,数组创建的两种方式(对象、正则、函数...)
    ->对于引用数据类型来说,我们两种方式创建出来的都是所属类的实例,而且都是对象数据类型的值,是没有区别的
        var ary = [];
        var ary = new Array;

    ->对于基本数据类型来说,虽然不管哪一种方式创建出来的都是所属类的一个实例(在类的原型上定义的方法都可以使用),但是字面量方式创建出来的是基本数据类型,而实例方式创建出来的是对象数据类型
        var num1 = 1;
        var num2 = new Number("1");
        console.log(typeof num1,typeof num2);//->"number" "object"

    4,在类的原型继承中,instanceof检测出来的结果其实是不准确的
        function Fn() {}
        var f = new Fn;
        console.log(f instanceof Array);//->false f不是一个数组,它就是一个普通的实例(普通的对象)


    ->虽然我们的Fn继承了Array,但是f没有length和数字索引哪些东西,所以f应该不是数组才对,但是用instanceof检测的结果却是true,因为f虽然不是数组,但是在f的原型链上可以找到Array
        function Fn() {
        }
        Fn.prototype = new Array;//->Fn子类继承了Array这个父类中的属性和方法
        var f = new Fn;
        console.log(f instanceof Array);//->true

3, Object.prototype.toString.call(value);
        ->找到Object原型上的toString方法,让方法执行,并且让方法中的this变为value(value->就是我们要检测数据类型的值)

        ->toString:一个方法,转换为字符串数据类型用的方法
        每一个数据类型所属类的原型上都有toString方法,例如:Number.prototype/String.prototype/Array.prototype/Function.prototype...
        除了Object上的toString,其他类原型上的toString都是把当前的数据值转换为字符串的意思

        ->null和undefined比较的特殊:他们所属类Null/Undefined的原型上也有toString,只不过不让我们用而已,不仅如此其实类的原型都给屏蔽了

        ->alert、document.write这两种输出的方式其实都是把要输出的内容先转换为字符串,然后在输出的
            alert([]);//->""
            alert(true);//->"true"
            alert({});//->这个就要调用Object.prototype上的toString了 ->?


4、Object.prototype.toString是用来返回对应值的所属类信息的
    var oDiv = document.getElementById("div1");
    var obj = {};
    oDiv.toString();//->"[object HTMLDivElement]"
    obj.toString();//->"[object Object]"

    原理:
    ->obj首先找到原型上toString方法,并且让toString执行,toString方法执行的时候,里面的this是obj,同理oDiv.toString(),toString方法中的this是oDiv
    ->执行toString方法,返回当前方法中this的数据类型 ->"[object 当前this的直属类]",例如:"[object HTMLDivElement]"/"[object Object]"

    Object.prototype.toString.call(12);//->执行原型上的toString,并且让方法中的this变为12,也就相当于返回的是12的直属类的信息 ->"[object Number]"
    Object.prototype.toString.call("zhufeng");//->"[object String]"
    依此类推:
    "[object Boolean]"/"[object Null]"/"[object Undefined]"/"[object Object]"/"[object Array]"/"[object RegExp]"/"[object Function]"/"[object Math]"/"[object Date]"...
    ->所有的数据类型都可以用它来检测,而且非常的精准

*/

// value:要检测数据类型的值 type:判断是否为这个数据类型
    function isType(value, type) {
        var res = Object.prototype.toString.call(value);//-> "[object 直属类]"
        return res === "[object " + type + "]";
        // 98->"[object Array]"
        // 字符串拼接->"[object Array"]"
        // 两个相等了返回true
    }

// 优化:->忽略第二个传递进来参数的大小写
    function isType(value, type) {
        var reg = new RegExp("^\\[object " + type + "\\]$", "i");
        return reg.test(Object.prototype.toString.call(value));
    }
    var ary = [];x
    var flag = isType(ary, "array");
    console.log(flag);//->true说名是数组,false说明不是数组 ->true
    flag = isType(1, "string");
    console.log(flag);//->false


~function () {
    var utils = {}, numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            utils[key] = isType(numObj[key]);
        }
    }
    window.$type = utils;
}();
//console.log($type);

var ary = [];
console.log($type.isAry(ary));//->true
console.log($type.isFun(ary));//->false
