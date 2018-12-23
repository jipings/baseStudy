/*
html5中的canvas也可以实现。除此之外，html5还提供一个专门
用于请求动画API，那就是requestAnimationFrame，请求动画帧

与setTimeout相比，requestAnimationFrame最大的优势是由系
统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,
那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个
时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走
。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，
这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
 */

// API的调用，
var progress = 0;
function render() {
    progress += 1;
    if(progress > 100) {
        window.requestAnimationFrame(render);
    }
}
window.requestAnimationFrame(render);
