# html-webpack-plugin插件，主要的两个作用
* 为`html`文件引入的外部资源如 `script` 、 `link` 动态
添加 compile 后的 hash，防止引用缓存的外部文件问题.
* 可以生成创建 html 入口文件，比如单页面可以生成一个html文件入口，
配置N个 html-webpack-plugin 可以生成N个页面入口.

# 原理
* 原理很简单，将webpack 中 `entry` 配置的相关入口 `thunk` 和
`extract-text-webpack-plugin` 抽取的css样式，插入到该插件
提供的`template`或者 `templateContent` 配置项指定的内容基础
上生成一个html文件，具体插入方式是将样式`link`插入到`head`元素中，
`script`插入到`head`或者`body`中。
* 实例化该插件时可以不配置任何参数，例如
```javascript
    var HtmlWebpackPlugin = require('html-webpack-plugin')
    webpackconfig = {
        ...
        plugin: [
            new HtmlWebpackPlugin()
        ]
    }
```
* 不配置任何选项的 `html-webpack-plugin` 插件，他会默认将webpack中的
`entry` 配置所有入口thunk和 `extract-text-webpack-plugin`抽取的css
样式都插入到文件指定的位置。例如上面生成的html文件内容如下
```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Webpack App</title>
    <link href="index-af150e90583a89775c77.css" rel="stylesheet"></head>
    <body>
    <script type="text/javascript" src="common-26a14e7d42a7c7bbc4c2.js"></script>
    <script type="text/javascript" src="index-af150e90583a89775c77.js"></script></body>
    </html>
```
* 当然可以使用具体的配置项来定值化一些特殊的需求，那么插件有哪些配置项呢？

# html-webpack-plugin配置项
* 插件提供的配置项比较多，通过源码可以看出具体的配置项如下
```javascript
    this.options = _.entend({
        template: path.join(__dairname, 'default_index.ejs'),
        filename: 'index.html',
        hash: false
    }, options);
```
