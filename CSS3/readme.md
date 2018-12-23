## CSS3  pointer-events
https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

## css3 Gpu渲染
虽然我们可能不想对元素应用3D变换，可我们一样可以开启3D引擎。例如我们可以用transform: translateZ(0); 来开启硬件加速 。
```css
.core {
    transform: translateZ(0);
}
```
当我们使用CSS transforms 或者 animations时可能会有页面闪烁的效果，下面的代码可以修复此情况：

```css
.core {
    backface-visibility: hidden;
    perspective: 1000;
}
```
在webkit内核的浏览器中，另一个行之有效的方法是
```css
.core {
   transform: translate3d(0, 0, 0);  
}
```