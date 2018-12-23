/*
    Hybrid是有缺点的，Hybrid体验就肯定比不上Native，所以使用有
    其场景，但是对于需要快速试错、快速占领市场的团队来说，Hybrid
    一定是不二的选择，团队生存下来后还是需要做体验更好的原生App。

    1，Hybrid中Native与前端各自的工作是什么
    2，Hybrid的交互接口如何设计
    3，Hybrid的Header如何设计
    4，Hybrid的如何设计目录结构以及增量机制如何实现
    5，资源缓存策略，白屏问题....

    代码地址：

https://github.com/yexiaochai/hybrid

 */

/*
    在做Hybrid架构设计之前需要分清Native与前端的界限，首先
    Native提供的是一宿主环境，要合理的利用Native提供的能力，
    要实现通用的Hybrid平台架构，站在前端视角，我认为需要考虑
    以下核心设计问题。

    交互设计

Hybrid架构设计第一个要考虑的问题是如何设计与前端的交互，如果
这块设计的不好会对后续开发、前端框架维护造成深远的影响，并且这
种影响往往是不可逆的，所以这里需要前端与native好好配合，提供通用
接口，比如
    1，NativeUI组件，header组件、消息类组件
    2，通讯录、系统、设备信息读取接口
    3，H5与native的互相跳转，比如H5如何跳转到一个native页面，
    h5如何新开WebView做动画跳转到另一个H5页面

    资源访问机制
Native首先需要考虑如何访问H5资源，做到既能以file的方式访问
Native内部资源，又能使用Url的方式访问线上资源；需要提供前端
资源增量替换机制，以摆脱APP迭代发版问题，避免用户升级APP。
这里就会涉及到静态资源在APP中的存放策略，更新策略的设计，复杂的话
还会涉及到服务器端的支持。

    账号信息设计
账号系统是重要并且无法避免的，Native需要设计良好安全的身份验证机制，
保证这块业务开发者足够透明，打通账户信息。

    Hybrid开发调试
功能设计并不是结束，Native与前端需要商量出一套可开发调试的模型，
不然很多业务开发的工作将难以继续。

至于Naitve还会关注的一些通讯设计、并发设计、异常处理、日志监控以及
安全模块，而前端要做的事情就是封装Native提供的各种能力，整体架构师这样的

真实业务开发时，Native除了会关注登录模块之外还会封装支付等重要
模块，这里视业务而定。

Hybrid交互设计

    Hybrid的交互无非是Native调用前端页面的JS方法，或者前端
    页面通过JS调用Native提供的接口，两者交互的桥梁皆WebView：

app自身可以自定义url schema，并且把自定义的url注册在调度中心，
例如：
ctrip://wireless 打开携程App
weixin:// 打开微信

我们JS与Native通信一般就是创建这类URL被Native捕获处理，后续也出现
了其他前端调用Native的方式，但可以做底层封装使其透明化，所以重点
以及是如何进行前端与Native的交互设计。

JS to Native

Native在每一个版本提供一些API，前端会有一个对应的框架团队对其
进行封装，释放业务接口，H5容器



 */