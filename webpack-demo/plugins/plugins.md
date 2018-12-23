## 编写一个插件
插件像第三方开发者提供了`webpack`引擎中完整的能力。使用阶段式的构建回调，开发者可以引入他们自己的行为到`webpack`构建流程中。创建插件比创建`loader`更加高级

## 创建插件
webpack 插件由一下组成：
* 一个JavaScript命名函数
* 在插件函数的 `prototype` 上定义一个 apply 方法
* 指定一个绑定到webpack自身的事件钩子
* 处理webpack内部实例的特定数据
* 功能完成后调用webpack提供的回调

## Compiler 和 Compilation
在插件开发中最重要的两个资源就是 `compiler` 和 `compilation`对象。理解他们的角色是拓展 webpack 引擎重要的第一步

* `compiler` 对象代表了完整的 `webpack` 环境配置。这个对象在启动`webpack`时被一次性建立，并配置好所有可操作的设置，包括 `options`，`loader` 和 `plugin`。当在`webpack`环境中应用一个插件时，插件将收到此`compiler`对象的引用。可以使用它来访问`webpack`的主环境

* `compilation`对象代表一次资源版本构建。当运行`webpack`开发环境中间件时，每当检测到一个文件变化，就会创建一个新的`compilation`，从而生成一组新的编译资源。一个 `compilation`，从而生成一组新的编译资源。一个`compilation` 对象表现了当前的模块资源、编译生成资源、变化的文件、以供插件做自定义处理时选择使用。

## 异步编译插件
有一些编译插件中的步骤是异步的，这样就需要额外传入一个`callback`回调函数，并且在插件运行结束时，`必须`调用这个回调函数

## 示例
一旦我们能深入理解 webpack compiler 和每个独立的 compilation, 我们依赖 webpack 引擎将有无线多的事可以做。我们可以重新格式化已有的文件，创建衍生的文件，或者制作全新的生成文件。

创建一个插件，插件功能是生成一个叫做 filelist.md 的新文件；文件内容是所有构建生成的文件的列表。

## 插件的不同类型
webpack插件可以按照它所注册的事件分成不同类型。每一个事件钩子决定了它该如何应用插件的注册。
* 同步(synchronous) Tapable 实例应用插件时会使用：
    applyPlugins(name: string, args: any...)
    applyPluginsBailResult(name: string,args: any...)
这意味着每个插件回调，都会被特定的args 一个接一个的调用。这是插件的最基本形式。