
## [DOM的重绘和回流](https://segmentfault.com/a/1190000017329980)

## 浏览器渲染过程
    1，解析HTML，生成DOM树，解析css，生成cssom 树
    2，将DOM树和CSSOM 树结合，生成渲染树 （Render Tree）
    3，Layout（回流）；根据生成的渲染树，进行回流（Layout），得到节点的几何信息(位置，大小)
    4，Painting（重绘）：根据生成的渲染树以及回流得到的集合信息，得到节点的绝对像素
    5，Display: 将像素发给GPU，展示在页面上。（这一步其实还有很多内容，比如在GPU将多个合成层合并为同一层。并展示在页面中，而css3 硬件加速的原理则是新建合成层）
* 为了构建渲染树，浏览器主要完成以下工作
1，从DOM树的根节点开始遍历每个可见节点
2，对于每个可见的节点，找到 CSSOM 树对应的规则，并使用它们
3， 根据每个可见的节点以及其对应的样式，组合生成渲染树

## 回流

前面我们通过构造渲染树，我们将可见DOM节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。

## 重绘

最终，我们通过构造渲染树和回流阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(位置、大小)，那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。

## 何时发生回流重绘

* 添加或删除可见的DOM元素
* 元素的位置发生变化
* 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
* 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
* 页面一开始渲染的时候（这肯定避免不了）
* 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

注意：回流一定会触发重绘，而重绘不一定会回流

## 浏览器的优化机制