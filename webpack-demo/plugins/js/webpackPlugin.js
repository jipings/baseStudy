
// 创建一个js命名函数
function MyExampleWebpackPlugin() {

};
// 在插件函数的 prototype 上定义一个 `apply` 方法
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
    // // 指定一个挂载到 webpack 自身的事件钩子
    // compiler.plugin('compilation', function(compilation, callback) {
    //     // compilation 处理webpack 内部实例的特定数据
    //     console.log('/n This is an example plugin!!!');
    //     compilation.plugin('optimize',function() {
    //         console.log('Assets are being optimized.')
    //     })
    //     // 功能完成后调用 webpack 提供的回调
    //     // callback();
    // });

    // 异步编译插件，必须调用callback
    compiler.plugin('emit', function(compilation, callback) {
        // 异步
        setTimeout(function() {
            console.log('\n',"Done with async work...");
            callback();
        }, 1000)
    })
};
export default MyExampleWebpackPlugin