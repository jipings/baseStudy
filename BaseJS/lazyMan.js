
const _LazyMan = function (name) {
    this.tasks = [];
    let task = (name => () => {
        console.log(`Hi! this is ${name}!`);
        this.next();
    })(name);
    this.tasks.push(task);
    //通过settimeout的方法，将执行函数放入下一个事件队列中，从而达到先注册事件，后执行的目的

    setTimeout(() => {
        this.next()
    }, 0);
    // 尾调用函数，一个任务执行完然后再调用下一个任务
    _LazyMan.prototype.next = function next() {
        let task = this.tasks.shift();
        task && task();
    };

    _LazyMan.prototype.eat = function eat(food) {
        let task = (food => () => {
            console.log(`Eat ${food}`);
            this.next();
        })(food);
        this.tasks.push(task);
        return this;
    };

    _LazyMan.prototype.sleep = function sleep (time) {
        let task = (time => () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} s!`);
                this.next();
            }, time*1000);
        })(time);
        this.tasks.push(task);
        return this;
    };

    _LazyMan.prototype.sleepFirst = function sleepFirst(time) {
        let task = (time => () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} s!`);
                this.next();
            }, time*1000)
        })(time )
        this.tasks.unshift(task);
        return this;
    }

}

const LazyMan = function(name) {
    return new _LazyMan(name)
}

LazyMan('Hank').sleepFirst(5).eat('supper').sleep(3).eat('dinner');