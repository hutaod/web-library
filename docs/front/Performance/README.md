# Web前端性能优化实践

## 前言


首先我们先问一个问题：**为什么需要性能优化呢？**


- 访问页面的速度太慢，很长时间才有响应，用户等了几秒发现还没有内容，就会直接退出页面
- 用户进入页面后，操作卡断，用户会觉得网站相应慢或者没有响应，会影响用户继续使用下去的欲望
- 页面播放的动画效果卡顿，会影响用户的感官，用户会觉得页面不流畅，仍然会影响用户继续使用下去的欲望



从上面几个答案中，我们知道性能的好坏会影响用户是否继续使用我们的页面，也可以分析出影响性能的主要两个地方：


- 加载时性能：页面首屏内容显示耗时会影响用户是否会中途退出的重要因素
- 运行时性能：内容加载完成后，操作卡顿或者动画不流畅，是影响用户是否愿意继续使用该页面的重要因素



下面我们从转化率和跳出率来看一些网站的真实数据统计，可以很直观的理解性能对于一个网站的影响（此部分摘自原文[为什么网站速度很重要？](https://www.cloudflare.com/zh-cn/learning/performance/why-site-speed-matters)）：


**转化率**：多项研究表明，网站速度会影响转化率（即用户完成目标操作的比率）。与速度较慢的网站相比，不仅更多用户停留在快速加载的网站上，而且他们的转化率也更高。许多公司发现页面加载时间减少几毫秒都会增加转化率：


- Mobify发现将其首页的加载时间减少100毫秒会导致基于会话的转换次数增加1.11％
- 将页面加载时间缩短一半后，零售商AutoAnything的销售额增长了12-13％
- 沃尔玛发现，将页面加载时间缩短一秒，可以将转换率提高2％



**跳出率**：跳出率是用户在只浏览一个页面后就离开网站的百分比。如果页面在几秒钟内未加载，用户就可能关闭窗口或单击离开网站。英国广播公司（BBC）发现，网页加载每增加一秒钟，他们就会失去总用户的10％。


从上面的数据我们可以看出页面性能的重要性。
​

性能实践过程：
​

## 从输入url到页面完全加载


为了更好的理解影响性能的因素，我们需要理清楚这样一个问题：`在浏览器里，从输入url到页面加载完成，这中间发生了什么？`


![url_to_rendered.png](./url_to_rendered.png)


上面这张图展示了处理 url 到页面加载完成的整个过程，图片来源于极客时间 [浏览器工作原理与实践](https://time.geekbang.org/column/article/117637)


从上图我们再来梳理具体的过程：


1. 用户输入 `url`
1. 浏览器进程将该 `url` 转发给 网络进程
1. 网络进程接收到请求后，先检查本地缓存是否可用，缓存可用则直接读取缓存并返回给浏览器进程；缓存不可用再发起真正的 `url` 请求。 `url` 请求过程如下： 
   1. `DNS` 解析，获取服务器 `ip地址和端口`
   1. 与服务端建立 `http` 连接
   1. 构建和发送请求头信息
   1. 服务端处理请求后响应请求
   1. 浏览器网络进程接收并解析响应内容
4. 浏览器进行分配渲染进程，开始渲染流程。
4. 渲染进程解析 `html`：解析过程中如果 `header` 中使用非异步方式引入 `css` 或者 `js` 资源，就会先加载资源，再进行 `DOM` 的解析
4. 执行渲染流水线：此时关键资源已经加载完毕，进行浏览器的渲染流水线： 
   1. 构建 `DOM` 树
   1. 样式计算（Recalculate Style）：把 `CSS文本` 转换为浏览器可以识别的结构--styleSheets => 属性标准化 => 计算出 `DOM` 树中每个节点的具体样式
   1. 布局（Layout）：创建 `布局树` ，并计算元素布局信息
   1. 分层（Layers）：对布局树进行分层，生成分层树。（在更多工具里面可以打开 Layers 面板）
   1. 生成图层绘制列表，提交到合成线程。
   1. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
   1. 合成线程发送绘制图块命令 `DrawQuad` 给浏览器进程。
   1. 浏览器进程根据 `DrawQuad` 消息生成页面，并显示到显示器上。
7. 首屏渲染结束 
   1. 如果是 `ssr`， 白屏结束，显示页面首屏内容。
   1. 如果是 `csr`，则等待 body底部所有js加载完毕后，js执行生成页面。
8. 所有资源下载完毕



了解页面显示的整个过程后，我们就可以更好的分析影响页面性能的因素。


## 性能指标


性能指标可以分为三大类：`文档加载`、`内容呈现`、`交互响应`。


主要会介绍指标的定义以及测量方法。其中文档加载类指标主要是用于辅助观察内容呈现过程。


### 文档加载相关指标


![timestamp-diagram.svg](./timestamp-diagram.svg)


#### Time to First Byte（TTFB）


浏览器从请求页面开始到接收第一字节的时间，这个时间段内包括 `DNS` 查找、 `TCP` 连接和 `SSL` 连接。 `TTFB` 不仅是页面的加载，每个接口或者其他资源请求都有自己的 `TTFB` 时间。


测量方法：


```javascript
new PerformanceObserver((entryList) => {
  const [pageNav] = entryList.getEntriesByType('navigation');
  console.log(`TTFB: ${pageNav.responseStart}`);
}).observe({
  type: 'navigation',
  buffered: true
});
```


指标具体描述可以参考：[https://web.dev/ttfb/](https://web.dev/ttfb/)


#### DomContentLoaded（DCL）


当 `HTML` 文档被完全加载和解析完成之后,`DOMContentLoaded` 事件就会被触发，不会等待样式表、图像和子框架加载完成。为了让 `HTML` 按正常样式显示完整，一般会把样式表放在头部进行加载，阻塞 `HTML` 文档的解析。


#### Load


window.onLoad 事件触发的时间。页面所有资源都加载完毕后（比如图片，CSS），onLoad 事件才被触发。


### 内容呈现相关指标


像 `Load` 或 `DOMContentLoaded` 这样的度量并不能反映用户的视觉体验，因为它们的时间点不一定与用户在屏幕上看到内容的时间点对应。


我们需要一些可以能够体现页面内容呈现速度的指标。


#### `First Paint`(FP):


`FP` 定义是渲染树首次转变为屏幕像素的过程，我们用FP time来表达首次渲染时间。在FP之前我们看见的屏幕是空白的，那么FP time也可理解为白屏时间。计算方法：


```javascript
if (window.performance) {
    let pf = window.performance;
    let pfEntries = pf.getEntriesByType('paint')
    let fp = pfEntries.find(each => each.name === 'first-paint')
    console.log('first paint time: ', fp && fp.startTime)
}
```


#### `First Contentful Paint`(FCP): 首次内容绘制


`FCP` 从页面加载到屏幕上首次有渲染内容的过程，这里的内容可以是文本、图像、svg元素和非白色canvas元素。计算方法：


```javascript
if (window.performance) {
    let pf = window.performance;
    let pfEntries = pf.getEntriesByType('paint')
    let fp = pfEntries.find(each => each.name === 'first-contentful-paint')
    console.log('first contentful paint time: ', fp && fp.startTime)
}
```


`FCP` 是测量感知加载速度的一个以用户为中心的重要指标，因为该项指标会在用户首次在屏幕上看到任何内容时，在页面加载时间轴中标记出相应的点，迅捷的 FCP 有助于让用户确信某些事情正在进行。


实际上不管是ssr还是csr， `FCP` 和 `FP` 在测试结果看来没有任何区别。


指标具体描述可以参考：[https://web.dev/fcp/](https://web.dev/fcp/)


#### `Largest Contentful Paint`(LCP) 最大内容绘制


`LCP`从页面加载到屏幕上首次有渲染内容的过程，这里的内容可以是文本、图像、svg元素和非白色canvas元素。计算方法：


```javascript
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate:', entry.startTime, entry);
  }
}).observe({type: 'largest-contentful-paint', buffered: true});
```


`LCP` 是测量感知加载速度的一个以用户为中心的重要指标，因为该项指标会在页面的主要内容基本加载完成时，在页面加载时间轴中标记出相应的点，迅捷的 LCP 有助于让用户确信页面是有效的。


指标具体描述可以参考：[https://web.dev/lcp/](https://web.dev/lcp/)


#### `Speed Index`(SI) 速度指数


`Speed Index` 衡量页面加载期间内容的视觉显示速度。Lighthouse 首先捕获浏览器中页面加载的视频，并计算帧之间的视觉进展。


指标具体描述可以参考：[https://web.dev/speed-index/](https://web.dev/speed-index/)


### 交互响应相关指标


#### `Time to Interactive`(TTI) 可交互时间


`TTI` 指标测量页面从开始加载到主要子资源完成渲染，并能够快速、可靠地响应用户输入所需的时间。


`TTI` 是测量加载响应度的重要实验室指标。该指标有助于识别看起来具备交互性但实际上并非如此的页面情况。迅捷的 `TTI` 有助于确保页面的有效性。


但 `TTI` 是一种非标准化的 Web 性能“进度”指标，定义为最后一个长任务完成且之后网络和主线程处于非活动状态 5 秒的时间点。因此使用工具测量出来的时间和实际上可交互时间并不一致。


指标具体描述可以参考：[https://web.dev/tti/](https://web.dev/tti/)


#### `First Input Delay`(FID) 首次输入延迟


`FID` 是测量加载响应度的一个以用户为中心的重要指标，因为该项指标将用户尝试与无响应页面进行交互时的体验进行了量化，低 FID 有助于让用户确信页面是有效的。


指标具体描述可以参考：[https://web.dev/fid/](https://web.dev/fid/)


#### `Frames Per Second`(FPS) 帧率


`FPS` 是设备产生图像（或帧）的速率，用每秒可以重新绘制的帧数（Frames Per Second，FPS）表示。


重新绘制可能需要重新计算样式、布局和绘制，如果每帧绘制到屏幕的时间在 16.7 ms 以上，每秒绘制的帧数就会小于 60 帧，人眼就能感受到页面出现卡顿，所以 FPS 是衡量应用流畅度的一个非常重要的指标，60fps 是页面流畅的目标，可以为每次绘制提供 16.7ms 的时间预算。


## 性能监控方案


性能监控分为 **服务端性能监控** 和 **浏览器性能监控。**对于服务端，我们一般只需要关注 **node 服务性能监控。**
**​**

node服务性能监控可以使用** **[**prom-client**](https://github.com/siimon/prom-client)** **进行数据采集和上报** :**
```javascript
function startPromCollect({ jobName }) {
  // 引入性能检测
  const promClient = require("prom-client");
  const address = require("address");
  // pushgateway 地址
  const pushIp = process.env.BUILD_ENV === "prod" ? "http://xxx" : "http://xxx";

  const gateway = new promClient.Pushgateway(pushIp);
  // 收集默认数据
  promClient.collectDefaultMetrics();
  // 30秒push一次
  setInterval(() => {
    gateway.push({ jobName: jobName, groupings: { instance: address.ip(), pid: process.pid } }, (err, resp, body) => {
      if (err) {
        console.error(`prometheus Pushgateway pushError: ${err}`);
      }
    });
  }, 30000);
}

// 开发环境不进行上报
if (process.env.BUILD_ENV !== "dev") {
  const { startPromCollect } = require("./promCollect");
  // 开始性能检查
  startPromCollect({
    jobName: `${process.env.BUILD_ENV}-my-web-app`,
  });
}
```
这只是前端采集和上报的代码，还需要实现的对应的数据分析平台，可以参考官方文档自己搭建一个 [基于Prometheus 的 Grafana 性能分析平台](https://prometheus.io/docs/visualization/grafana/) ，也可以参考这篇文章：[使用Prometheus + Grafana搭建监控系统](https://juejin.cn/post/6844904086484025357)


**浏览器端性能监控** 可以根据前面介绍的指标计算方法实现自己的 性能监控sdk ，性能数据可以上报到 Grafana性能分析 平台，实时分析性能数据，也可以直接接入 google 的 [firebase](https://www.npmjs.com/package/firebase) ，不过 firebase 会有一些延迟，但数据会存在保存三个月。如果不需要自定义性能指标，直接使用 [firebase](https://www.npmjs.com/package/firebase) 上报默认的指标即可，firebase接入文档：[https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup?authuser=0)
​

## 性能优化方案


接下来我们就根据性能指标分类来分析性能优化方案。**文档加载相关指标** 并不能反映用户体验，** 内容呈现指标 **基本也包含  **文档加载相关指标 ，** 因此 **文档加载 **和** 内容呈现 **会合并一起进行分析。


### 加载或内容呈现性能优化


加载性能主要影响因素有： `资源响应速度` 、`资源体积优化` 、 `资源加载的顺序` 、 `代码质量` 、 `用户网络速度` 、 `用户设备条件` ，不过用户网速和设备我们无法控制，所以我们主要优化方向是其他几个方面


#### 资源响应速度
资源响应速度的主要优化点在于：减少请求数、减少请求资源体积、提升网络传输效率


- 使用 CDN 加速：利用CDN增加并发连接和长缓存的优势来加速下载静态资源
- 开启gzip压缩：使用 gzip 压缩编码技术，减小资源体积。
- 浏览器缓存：利用浏览器缓存(强缓存与协商缓存)与 Nginx 代理层缓存，缓存静态资源文件。
- 减少网络请求次数和体积：通过压缩文件及合并小文件为大文件，减少网络请求次数，但需要找到合理的平衡点。
- 使用 HTTP/2 ：HTTP/2带来的的优势可以看这一篇文章：[解读 HTTP1/HTTP2/HTTP3](https://juejin.cn/post/6995109407545622542)

​

##### CDN加速
内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。CDN的优势可以去看[CDN 原理](https://juejin.cn/post/6892994632968306702#heading-12)
​

##### gzip压缩
gzip 编码是改进 web 应用程序性能的技术，通常web 服务器和客户端(浏览器)必须同时支持 gzip。gzip 压缩效率非常高，通常可达 70% 压缩率。
​

**webpack** 中可以使用 **CompressionWebpackPlugin** 插件进行gzip压缩:
​

```javascript
if (process.env.NODE_ENV === 'production') {
  plugins.push(new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false
  }))
}
```
​

服务端支持 gzip，以 Nginx 配置为例：
```
gzip on;
gzip_static on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/png image/jpeg image/svg+xml image/gif;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";
```
服务器支持gzip压缩后，response header 中会显示 Content-Encoding: gzip。
​

为何要同时使用webpack gzip压缩和 服务的gzip压缩 呢？ 答案可以看一下这里： [webpack gzip压缩 和 nginx gzip压缩的区别](https://blog.csdn.net/sd4015700/article/details/118650050)


- 之所以在 **webpack** 的 **TerserPlugin** 插件已对文件进行压缩的结果下，还进行一次 **gzip** 压缩，是因为 **gzip** 能够在已压缩文件的基础上，再次进行压缩
- 之所 **webpack** 和 **nginx** 都对静态资源进行 **gzip** 压缩，是为了让 **nginx** 能够优先使用静态 **gzip** 压缩，直接使用 **gz** 文件的结果作为 **gzip** 压缩的结果，从而减少实时 **gizp** 对 **cpu** 资源的占用



如何开启双端gzip压缩，也可以看这里：[「简明性能优化」双端开启Gzip指南](https://juejin.cn/post/6844903825585897485)


#####  浏览器缓存
​

前端缓存一般可分为 http缓存和浏览器缓存，http缓存还分**强缓存**和**协商缓存**，如果想对前端缓存了解更多，可以去看一下这本专栏 [前端缓存技术与方案解析](https://juejin.cn/book/6994678547826606095)
​

强缓存生产方式：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/93172/1642939677264-c917f513-d332-4cf8-8330-7d71819b4dea.png#clientId=udee8a368-a933-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=611&id=u0dc4d401&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1221&originWidth=1975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=299220&status=done&style=none&taskId=u4527feeb-410d-4544-8c86-4596e0c7c5a&title=&width=987.5)
​

注意点：浏览器请求资源一般会默认开启强缓存，协商缓存生效的前提是强缓存失效，一般关闭强缓存的方式可以是设置资源响应头：
```
Cache-Control: max-age=0
```
​

协商缓存生效过程：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/93172/1642939969949-d7c038ad-a991-469b-b670-0a8d6ebc42bd.png#clientId=udee8a368-a933-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=696&id=udbcdc312&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1392&originWidth=1984&originalType=binary&ratio=1&rotation=0&showTitle=false&size=311535&status=done&style=none&taskId=ua79b7695-5c7d-49e1-8cd6-f243b241e6b&title=&width=992)
前面介绍完了强缓存和协商缓存，现在来说一下 HTTP 缓存的常见方案，也算是通用方案：

- 频繁变动的资源，比如 HTML， 关闭强缓存，始终采用协商缓存
- CSS、JS、图片资源等采用强缓存，因为资源请求默认都会采用强缓存，但如何保证有资源有变更的时候不会读取缓存呢，那就是使用 hash 命名，这里就要借助比如类似webpack的工具，在打包的时候，根据文件内容来生成文件，并把资源链接动态插入HTML中。具体如何如何使用可以去看 [webpack缓存方案](https://www.webpackjs.com/guides/caching)





浏览器缓存按照缓存位置划分可以分为：

- Service Worker Cache：本质上是一种用 JavaScript 编写的脚本，其作为一个独立的线程，它可以使应用程序能够控制网络请求，缓存这些请求以提高性能，并提供对缓存内容的离线访问。而常见的 Service Worker 应用就是**渐进式 Web 应用（Progressive Web Apps）**
- Memory Cache 内存缓存：计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。
- Disk Cache 磁盘缓存：读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。
- Push Cache 推送缓存：HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。



http缓存就是利用浏览器的 Memory Cache 和 Disk Cache 两种缓存方式，原理就是浏览器在和服务端进行交互时，添加了一层拦截器，这层拦截器来进行缓存喝是否需要返回缓存内容，也会根据不同情况来判断使用 Memory Cache 还是 Disk Cache 。
​

##### 减少网络请求次数和体积


- 合理使用 webpack 打包策略进行代码拆包，参考 [代码分离](https://webpack.docschina.org/guides/code-splitting/)
- 图片精灵（升级HTTP/2后不建议使用）
- 清理多余js/css代码
- 图片转base64策略优化，太大的突破不要使用base64，base64体积会更大，且影响js体积



##### 使用HTTP/2


HTTP/2 相对于HTTP/1来说，进行了一些列的增强：

1. 多路复用，解决TCP协议慢启动问题：主要因为HTTP/1 每个请求都会新建一个TCP连接，每个域名同时最多同时有6个TCP连接，会造成 TCP 连接之间相互竞争带宽，而且启动TCP连接相对较慢。
1. 可以设置请求的优先级：可以在发送请求时，标上该请求的优先级，这样服务器接收到请求之后，会优先处理优先级高的请求。
1. 头部压缩：无论是 HTTP/1.1 还是 HTTP/2，它们都有请求头和响应头，这是浏览器和服务器的通信语言。HTTP/2 对请求头和响应头进行了压缩，你可能觉得一个 HTTP 的头文件没有多大，压不压缩可能关系不大，但你这样想一下，在浏览器发送请求的时候，基本上都是发送 HTTP 请求头，很少有请求体的发送，通常情况下页面也有 100 个左右的资源，如果将这 100 个请求头的数据压缩为原来的 20%，那么传输效率肯定能得到大幅提升。



HTTP/2带来的的优势也可以看这一篇文章：[解读 HTTP1/HTTP2/HTTP3](https://juejin.cn/post/6995109407545622542)
​

#### 资源体积优化


不同资源类型优化方式不一样。


##### 文本资源


文本资源包含 `HTML` 、 `CSS` 、 `JS` 等，主要优化手段：


- 代码压缩：minify
- 压缩内容：比如使用 gzip 压缩
- 代码精简
- `JS` 体积优化方案 
   - Tree Shaking
   - Code Split
   - 组件按需加载
   - 代码按需打包
- `CSS` 体积优化方案 
   - 引入第三方库样式文件时按需引入
   - 减少不必要的 css 前缀补全



##### 图片资源


一个页面，图片资源的大小一般占据整个页面资源体积的一半以上，因此图片资源体积优化也非常重要。


图片体积优化的手段：


- 去掉不必要的图片，能使用样式实现的不要使用图片
- 雪碧图（HTTP/2及以上不需要雪碧图）
- 上传图片大小限制
- 压缩项目静态图片
- 接入Webp图片处理，可以根据浏览器请求中所带的 `accept` 来判断是否支持webp格式，各cdn厂商基本上也都支持webp图片转换：[阿里云图像处理](https://help.aliyun.com/document_detail/209551.htm?spm=a2c4g.11186623.0.0.48e473c362lahb#section-ivw-6eg-iuz)



#### 资源加载的顺序


在 `从输入url到页面完全加载` 中我们讲解了页面呈现的过程，因此可以知道资源加载是有顺序的，下面来看一下加载阶段的渲染流水线：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/93172/1642905957151-3abb1768-c8f5-40ed-b310-9eae7f589982.png#clientId=udee8a368-a933-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=230&id=u77531b41&margin=%5Bobject%20Object%5D&name=image.png&originHeight=459&originWidth=1142&originalType=binary&ratio=1&rotation=0&showTitle=false&size=271796&status=done&style=none&taskId=uf248f398-8e18-4e78-ab14-08a4d748172&title=&width=571)
可以知道并非所有的资源都会阻塞页面的首次绘制，比如图片、音频、视频等文件就不会阻塞页面的首次渲染；而 JavaScript、首次请求的 HTML 资源文件、CSS 文件是会阻塞首次渲染的，因为在构建 DOM 的过程中需要 HTML 和 JavaScript 文件，在构造渲染树的过程中需要用到 CSS 文件。
​

我们把这些能阻塞网页首次渲染的资源称为**关键资源**，因此我们需要梳理清楚哪些是**关键资源**，哪些是**非关键资源**。资源加载顺序往往于代码所在位置或者设置的属性有关：


1. 一般我们需要把`css` 放在 `header` 中，以便于页面渲染出来时，页面能按照预期中的样式正常显示。
1. `js` 代码一般放在 `DOM` 底部，如果 `JavaScript` 文件中没有操作 `DOM` 相关代码，就可以将该 `JavaScript` 脚本设置为异步加载，通过 `async` 或 `defer` 来标记代码； `async` 和 `defer` 虽然都是异步的，不过还有一些差异，使用 `async` 标志的脚本文件一旦加载完成，会立即执行；而使用了 `defer` 标记的脚本文件，需要在 `DOMContentLoaded` 事件之前执行。



#### 代码质量


代码质量分为很多方面，比如代码量、复杂度、代码结构设计等等


##### 代码量


代码量优化的方案主要分为一下几种：


- 代码精简：使用简洁并清晰的代码编写，这个一般与开发者的工作经验或者知识面有很大的关系 
   - 使用 `lodash` 提供的功能函数
   - 使用正则替代一些复杂的js校验或者匹配功能
   - 合理使用一些位运算符
   - 使用es6语法
   - 去除无效代码
- 抽离并封装公用模块代码 
   - 当一个功能被多次使用就应该封装成公共函数
   - 公共组件封装
- css原子化，尽量让每一行css都能得到充分利用



##### 代码复杂度设计


复杂度主要分为 `时间复杂度` 和 `空间复杂度`。


`时间复杂度` 对性能的影响在于：增加 js 解析时间，主要主要优化手段有以下几种：


- 减少嵌套循环，使用空间换时间
- 使用高性能算法处理复杂功能



`空间复杂度` 对性能的影响在于：占据设备内存过大时，可能引起浏览器崩溃等问题，主要主要优化手段：


- 减少全局变量，和注意全局变量所占内存，防止内存不断增大，导致内存溢出。
- 注意销毁不需要的对象，防止不销毁旧的对象，又不断生成新的对象，页面所在内存持续增长，导致页面崩溃。



##### 代码结构设计


好的代码结构设计，对性能的提升影响会特别大，主要的一些设计手段有以下几种：


1. 组件懒加载：让页面首次加载只渲染首屏展示的内容，可以提升首屏生产内容的速度和DOM解析显示到页面的速度，当DOM节点过多，对于浏览器的渲染进程的压力也会越大，显示到页面的时间就会长
1. `virtual-list` : 当长列表页面上拉加载越来越多的内容时，DOM节点会不断增大，就会造成每次生产新图层会越来越久，就会出现渲染卡顿、内存增大等问题，因此可以使用`virtual-list`方案只给DOM添加当前屏幕显示的DOM节点，可以避免出现渲染卡顿等问题。
1. `图片懒加载`：当页面图片太多，同时请求会对服务端造成一定的压力，也可以防止并发加载的资源过多而阻塞js 或者其他关键资源的加载。
1. css 对性能的优化方案：可参考[仅使用CSS提高页面渲染速度]([https://juejin.cn/post/6942661408181977118](https://juejin.cn/post/6942661408181977118)



### 交互相关性能优化


影响交互性能的主要有几方面： `操作响应速度`、 `页面流畅度`、 `交互体验设计`。


#### 操作响应速度


什么情况会影响操作的响应速度？


- 操作后执行时间过长，用户等待时间长
- 有任务正在执行，占据主线程，需要等待主线程空闲



我们可以从以下几个方面进行优化操作响应的速度：


- 首次加载只执行首屏需要的代码，非首屏需要的代码可以按需加载
- React 可以开启 Concurrent 模式来实现可中断渲染，优先处理用户操作：[Concurrent 模式介绍](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)
- 当需要执行一段逻辑复杂、耗时较长的代码时，如果不是一定需要阻塞其他应用，可以利用 `requestIdleCallback`来在空闲时间再继续执行代码，或者使用异步或者使用定时器让任务在下一个Eventloop执行
- 优化代码执行时间



#### 页面流畅度


页面不流畅的主要原因是频繁的对页面进行操作，导致不断的重绘或者重排，导致帧率小于60fps，造成视觉上的卡顿，这时候


#### 交互体验设计


交互一般包括：操作、视觉变化、使用引导、用户习惯性行为等等


比如一般我们都会按照ui出的设计稿进行编写页面，但是ui设计有时候不会注意一些细节，比如弹框显示或隐藏的过渡时间或者效果，友好的过渡效果，不会让用户觉得弹出出现的太突兀。因此我们也许要考虑交互的合理性。


## 参考资源


- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601?tab=catalog)
- [前端缓存技术与方案解析](https://juejin.cn/book/6994678547826606095/section/6996933175863672872)
- [web.dev](https://web.dev/)
- [前端性能优化指南[7]--Web 性能指标](https://juejin.cn/post/6844904153869713416)
- [前端性能优化 24 条建议](https://juejin.cn/post/6892994632968306702)
- [聊一聊前端性能优化](https://juejin.cn/post/6911472693405548557)
- [仅使用CSS提高页面渲染速度](https://juejin.cn/post/6942661408181977118)
- [花帽子的博客](https://jonny-wei.github.io/blog/optimization/)
