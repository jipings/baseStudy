//构造函数的参数是一个异步任务
function Promise1(task) {
    let that = this;//缓存this
    //默认状态为pending
    that.status = 'pending';
    //此变量里放着此promise的结果
    that.value = undefined;
    //存放的着所有成功的回调函数
    that.onResolvedCallbacks = [];
    //存放着所有的失败的回调函数
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成成功态

    function resolve(value) {
      if (that.status == 'pending') {
        that.status = 'fulfilled';
        that.value = value;
        that.onResolvedCallbacks.forEach(item=>item(that.value));
      }
    }
  
    //调用此方法可以把当前的promise变成失败态
    function reject(reason) {
      //如果当前状态是初始态，则转成失败态
      if (that.status == 'pending') {
        that.status = 'rejected';
        that.value = reason;
        that.onRejectedCallbacks.forEach(item=>item(that.value));
      }
    }
  
    //立即执行传入的任务
    try {
      task(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  //onFulfilled成功的回调，onReject失败的回调
  Promise1.prototype.then = function (onFulfilled, onReject) {
    let that = this;
    if(that.status == 'fulfilled'){
      onFulfilled(that.value);
    }
    if(that.status == 'rejected'){
      onReject(that.value);
    }
    if(that.status == 'pending'){
      that.onResolvedCallbacks.push(onFulfilled);
      that.onRejectedCallbacks.push(onReject);
    }
  
  }
console.time('myPro');
new Promise1((resolve, reject) => {
    resolve('qwe');
}).then((res) => {console.log(res)})
console.timeEnd('myPro');

console.time('Pro');
new Promise((resolve,reject) => {
    resolve('qwe1');
}).then((res) => {console.log(res)})
console.timeEnd('Pro');

module.exports = Promise1;