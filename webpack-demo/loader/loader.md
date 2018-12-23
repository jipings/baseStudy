## [编写一个loader](https://www.webpackjs.com/contribute/writing-a-loader/)

## 复杂用法
当链式调用多个 loader 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。
* 最后的 loader 最早调用，将会传入原始资源内容。
* 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。
* 中间的 loader 执行时，会传入前一个 loader 传出的结果。<br />
所以，在接下来的例子，foo-loader 被传入原始资源，bar-loader 将接收 foo-loader 的产出，返回最终转化后的模块和一个 source map（可选）
    webpack.config.js

```js
{
  test: /\.js/,
  use: [
    'bar-loader',
    'foo-loader'
  ]
}
```
## 用法准则
* 简单易用
* 使用链式传递
* 模块化的输出
* 确保无状态
* 使用loader utilities
* 记录loader的依赖
* 解析模块依赖关系
* 提取通用代码
* 避免绝对路径
* 使用 peer dependencies

## 模块依赖 Module Dependencies
根据模块类型，可能会有不同的模式依赖关系。例如在css中，使用 `@import` 和 `url(...)` 语句来声明依赖。这些依赖关系应该由模块系统解析。
* 通过把他们转化成 `require` 语句
* 使用 `this.resolve` 函数解析路径
`css-loader` 是第一种方式的一个例子。它将 `@import` 语句替换为 `require` 其他样式文件，将`url(...)`替换为 `require` 引用文件，从而实现将依赖关系转化为 `require` 声明。

## 同等依赖 Peer Dependencies
如果你的 loader 简单包裹另外一个包，你应该把这个包作为一个 `peerDependency` 引入。这种方式允许应用程序开发者在必要情况下，使用 `package.json` 中指定所需的确定版本. <br>

例如，`sass-loader` 指定 `node-sass` 作为同等依赖，引用如下：
```js
"peerDependencies": {
    "node-sass": "^4.0.0"
}
```
## 测试
当你遵循上面的用法准则编写一个 `loader`, 并且可以在本地运行。下一步该做什么？让我们用一个简单的单元测试，来保证 `loader` 能够按照我们预期的方式正确运行。我们将使用 `Jest` 框架。然后还需要安装 `babel-jest` 和允许我们使用 `import/export` 和 `async/await` 的一些预设环境(`presets`)。
```node
    npm install --save-dev jest babel-jest babel-preset-env 
```
```json
    {
  "presets": [[
    "env",
    {
      "targets": {
        "node": "4"
      }
    }
  ]]
}
```
我们的 loader 将会处理 .txt 文件，并且将任何实例中的 [name] 直接替换为 loader 选项中设置的 name。然后返回包含默认导出文本的 JavaScript 模块。