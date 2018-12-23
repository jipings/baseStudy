
// 类（class）通过 static 定义静态方法，不能在类的实例上调用静态方法
// 而应该通过类被神调用。这些通常是实用程序方法
class ClassWithStaticMethod {
    static staticMethod() {
        return 'static method has been called';
    }
}

const newClass = new ClassWithStaticMethod();

console.log(ClassWithStaticMethod.staticMethod());
console.log(newClass.staticMethod);

// 静态方法调用直接在类上进行，不能在类的实例上调用。
// 静态方法通常用于创建实用程序函数

// 调用静态方法
// 静态方法调用同一类中的其他静态方法，可以使用this关键字

class StaticMethodCall {
    static staticMethod() {
        return 'Static method has been '
    }
    static anotherStaticMethod() {
        return this.staticMethod() + ' from another static method';
    }
}

StaticMethodCall.staticMethod();
StaticMethodCall.anotherStaticMethod();

// 从类的构造函数和其他方法
// 非静态方法中，不能直接使用this关键字来访问静态方法。而是要用类名来调用：
// 或者用构造函数的属性来调用该方法

class StaticMethodCall2 {
    constructor() {
        console.log(StaticMethodCall2.staticMethod());
        console.log(this.constructor.staticMethod());
    }
    static staticMethod() {
        return 'static method has been called.';
    }
}

new StaticMethodCall2

console.log('Demo-----------------------')
/*
下面例子说明了这几点
1. 静态方法如何在类上实现
2. 具有静态成员的类，可以被子类化
3. 什么情况下静态方法可以调用，什么情况下不能
*/

class Tripple {
    static tripple(n = 1) {
        return n * 3
    }
}

class BiggerTripple extends Tripple {
    static tripple2(n) {
        return super.tripple(n) * super.tripple(n);
    }
}

console.log(Tripple.tripple());
console.log(Tripple.tripple(6));

let tp = new Tripple();
console.log(BiggerTripple.tripple2(3));// 81（不会受父类实例化的影响）
console.log(tp.tripple());// 'tp.tripple 不是一个函数'.