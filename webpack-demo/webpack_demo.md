当你为你的模块安装一个依赖模块时，正常情况下你得先安装他们（在模块根目录下npm install module-name），然后连同版本号手动将他们添加到模块配置文件package.json中的依赖里（dependencies）。

-save和save-dev可以省掉你手动修改package.json文件的步骤。
spm install module-name -save 自动把模块和版本号添加到dependencies部分
spm install module-name -save-dve 自动把模块和版本号添加到devdependencies部分

至于配置文件区分这俩部分， 是用于区别开发依赖模块和产品依赖模块， 以我见过的情况来看 devDepandencies主要是配置测试框架， 例如jshint、mocha。

* 1， 在此示例中，`<script>` 标签之间存在隐式依赖关系。index.js 文件在执行之前，还依赖于页面中引入的
lodash。之所以说是隐式的是因为index.js并未显式声明需要引入lodash，只是假定推测已经存在一个全局变量_。

使用这种方法去管理JavaScript项目会有一些问题：
* -> 无法立即体现，脚本的执行依赖于外部扩展库（external library）。
* -> 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
* -> 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

让我们使用webpack来管理这些脚本.

在这个设置中，index.js显式要求引入的lodash必须存在，然后将它绑定为_（没有全局作用域污染）.
通过声明模块所需的依赖，webpack能够利用这些信息去构建依赖图表，然后使用图表生成一个优化过得，会以正确
顺序执行的bundle。

可以这样说，执行webpack，会将我们的脚本作为入口起点，然后输出为 bundle.js。

# ES2015 模块
* 虽然在大多数浏览器中都不支持 import 和 export 语句，但是webpack却能够提供支持。
事实上，webpack在幕后会将代码“转译”, 以便旧有浏览器可以执行。如果你检查 dist/bundle.js, 你可以
看到webpack具体如何实现，这是独创精巧的设计！

注意，webpack不会更改代码中除了 import 和 export 语句以外的部分。
如果你在使用其它 ES2015特性，请确保你使用了一个像是Babel或bubel的转译器。

# 使用一个配置文件
* 大多数项目会需要很复杂的设置，这就是为什么webpack要支持配置文件。这比在终端（terminal）
中输入大量命令要高效的多，所以让我们创建一个取代以上使用CLI选项方式的配置文件。

* 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用
--config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分
成多个文件的复杂配置非常有用。

* 比起CLI这种简单直接的使用方式，配置文件具有更多的灵活性。我们可以通过配置方式
指定loader规则（loader rules）、插件（plugins）、解析选项（resolve options）,
以及许多其他增强功能。

# NPM脚本【NPM script】
* 考虑到用CLI这种方式来运行本地的webpack不是特别方便，我们可以设置
一个快捷方式。在 package.json 添加一个npm 脚本（npm script）。

* 现在，可以使用 `npm run build` 命令，来替代我们之前用到的较长命令。注意，
使用npm的script，我们可以通过模块名，来引用本地安装的npm包，而不是写出完整路径。
这是大多数基于`npm`的项目遵循的标准，允许我们直接调用webpack，而不是去调用
`node_modules/webpack/bin/webpack.js`

# 管理资源[Asset Management]
* 如果你是从开始一直遵循着指南的示例，现在会有一个小项目，显示 “Hello webpack”。
现在我们尝试整合一些其他资源，比如图像，看看webpack如何处理。

* 在webpack出现之前，前端开发人员会使用grunt 和 gulp等工具来处理资源，
并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中。同样方式
也被用于Javascript模块，但是，像webpack这样的工具，将动态打包（dynamically bundle）
所有依赖项（创建所谓的依赖图表（dependency graph））。这是极好的创举，因为
现在每个模块都可以明确表述它自身的依赖，我们将避免打包未使用的模块。

* webpack 最出色的功能之一就是， 除了 `javascript`，还可以通过loader引入
任何其他类型文件。也就是说，以上列出的那些JavaScript的优点（例如显式依赖）,目录中。同样
可以用来构建网站或web应用程序中的所有非JavaScript内容。

# 加载CSS
* 为了从Javascript模块中import一个css文件，你需要在module配置中安装并添加
style-loader和css-loader:
` npm install --save-dev style-loader css-loader`

* webpack根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的loader。在这种情况下，以 .css 
结尾的全部文件，都将被提供给 style-loader 和 css-loader.

* 这使你可以再依赖于此样式的文件中 `import './style.css'`。
现在，当该模块运行时，含有css字符串的 `<style>` 标签，将被插入到html文件的`<head>`中。

* 当你 `import MyImage from './my-image.png'`，该图像将被处理并添加到
 output 目录,并且 MyImage 变量将包含图像在处理后的最终url。当使用css-loader时，

* 加载字体
* file-loader和url-loader可以接收并加载任何文件，然后将其输出
到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。让


# 全局资源
* 