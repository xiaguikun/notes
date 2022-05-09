### 小程序跳转 H5

首页需要准备一个 webview 页面来承载 H5 链接页面

```js
<view>
  <web-view
    src={}
    onMessage={}
    onWebviewError={}
  ></web-view>
</view>
```

需要第一个授权，就是授权开发者使用该组件。这里比较扯淡的是虽然这个组件是小程序使用的，但并不能在小程序开发号里面设置，而必须在订阅号或者服务号中进行设置，网络上经常能够查到的下面这个截图只能登录订阅号或者服务号才能看到。

原来并不是什么网址拿来就可以设置跳转的，你的小程序中就不能直接跳转到百度上去，小程序能够跳转的域名必须在业务域名中进行注册，总算这次是在小程序开发号里面设置了，但注意在服务号的设置里也有业务域名这个设置，不要搞混了

这时候控制权已经从小程序转移到了 H5 页面，但微信页面跳转内部的机制比较复杂，涉及到了 OAuth 认证之类的，所以这个错误已经是 H5 页面报的了，这就需要到 H5 页面关联的服务号中去进行设置，这次设置的项目叫做网页授权域名，在公众号设置的功能设置里

服务号：支持最多的 Web 开发接口和 JS 开发接口，是最常规的应用开发账号；
订阅号：发文章用的，开发接口比较少，很多功能都不支持，是最傻瓜的文章发布账号；
小程序：小程序应用的专属开发账号，仅支持对小程序的开发，有许多设置还必须到前两类账号中去设置。

### 微信小程序跳转

微信小程序的导航跳转分为
navigateTo（保留当前页，跳转到应用内的其他页面，跳转非 tabBar 页面，可带参数，但是这里有个小坑，后面说）
navigateBack（关闭当前页面，返回上一页面或多级页面）
redirectTo（关闭当前页面，跳转到应用内的某个页面，跳转非 tabBar 页面，可带参数）
reLaunch（关闭所有页面，打开到应用内的某个页面，可带参数）
switchTab（跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面， 不可带参数）

### 进程

process.nextTick(callback)是为事件循环设置一项任务，node.js 会在下次事件循环调响应时调用 callback”.
process.nextTick() 在同一个阶段立即执行
setImmediate() 在事件循环的接下来的迭代或 'tick' 上触发。
执行顺序
process.nextTick----setImmediate()---setTimeout/setInterval
这在开发 API 时非常重要，可以在构造对象之后但在发生任何 I/O 之前，为用户提供分配事件句柄的机会：

### fix bug

input 框的光标和 placeholder 文字不对齐，添加一个 line-height:nomal 解决

### 一个 url 解析

https://www.example.com:80/path/to/myfile.html?key=1&&value=1#somnewhere
https://是协议部分（scheme）
www.example.com是域名部分，主机名（host）
:80 是端口部分（port）
/path/to/myfile.html 是路径部分（path）
?key=1&&value=1 是查询部分（search，query）
#somewhere 是锚点部分（fragment）

### 安装依赖包

-g --global 表示全局安装，安装到操作系统中，任何项目中都可以使用
-D --save-dev 表示局部安装，模块写到 devDependencies 中，表示开发环境依赖，不会发到线上去，例如打包的包之类的只需要在开发打包使用，不需要发到线上
-S --save 表示局部安装，模块写到 dependencies 中，表示生产环境依赖，需要发布到生产环境中

### package.json 符号

```js
1. node:"2.2.2"
无符号，指定版本，表示必须是2.2.2版本
2. node:"~2.2.2"
~号指定版本，表示安装~2.2.x中的最新版本(>=2.2.2   <2.3.0)，但是不能安装2.3.0及以上版本
3. node:"^2.2.2"
^号指定版本，表示安装2.x.x中的最新版本（>=2.2.2  <3.0.0），但是不能安装3.0.0及以上版本
4. node:">, >=,<,<=2.2.2"
分别表示安装的版本不得大于，大于等于，小于，小于等于2.2.2这个版本号
5. node:"2.2.2-3.3.3"
-号表示该版本号是>=2.2.2 <=3.3.3
```

### export import

```js
1.每个文件只能有一个 export default ,可以有多个 export （export后要声明）
export default aaa;
export const bbb=111;
2.对应 import 引入
import aaa,{bbb} from "./xxx"
```

### 静态资源和动态资源区别

```
1.概念：
  静态资源：一般客户端发送请求到web服务器，web服务器从内存在取到相应的文件，返回给客户端，客户端解析并渲染显示出来。
  动态资源：一般客户端请求的动态资源，先将请求交于web容器，web容器连接数据库，数据库处理数据之后，将内容交给web服务器，web服务器返回给客户端解析渲染处理

2.静态资源和动态资源的区别
  a.静态资源一般都是设计好的html页面，而动态资源依靠设计好的程序来实现按照需求的动态响应；
  b.静态资源的交互性差，动态资源可以根据需求自由实现；
  c.在服务器的运行状态不同，静态资源不需要与数据库参于程序处理，动态可能需要多个数据库的参与运算。

```

### 微信小程序环境变量

```
__wxConfig,内含大量配置
__wxConfig.envVersion,表示当前环境变量 "develop"-开发版本 "trial"-体验版本 "release"-线上版本
```

### git commit 规范

```
type:代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下：

    feat[特性]: 新增特性
    fix[修复]: 修复bug
    docs[文档]: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
    style[格式]: 仅仅修改了空格、格式缩进、喜好等等，不改变代码逻辑
    refactor[重构]: 代码重构，没有加新功能或者修复bug
    perf[优化]: 优化相关，比如提升性能、体验
    test[测试]: 测试用例，包括单元测试、集成测试等
    chore[工具]: 改变构建流程、或者增加依赖库、工具等
    revert[回滚]: 回滚到上一个版本

scope:scope说明commit影响的范围。scope依据项目而定，
  例如在业务项目中可以依据菜单或者功能模块划分，
  如果是组件库开发，则可以依据组件划分。

subject:是commit的简短描述
body:提交代码的详细描述
footer:如果代码的提交是不兼容变更或关闭缺陷，则Footer必需，否则可以省略。
```

### 混合开发 H5 页面

```js
//js判断是否移动端
function fIsMobile() {
  return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
//js判断是否ios或Android
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
```

```markdown
# 混合开发 H5 页面调试

- Vorlon.JS
  安装：npm install vorlon -g
  终端运行服务：vorlon
  在 html 页面添加脚本，IP_address 为 wifi 下电脑的 IP：
    <script src="http://[IP_address]:1337/vorlon.js"></script>
  在浏览器输入 http://localhost:1337 后回车，显示 vorlon 界面
  在 App 内打开上述 HTML 页面，浏览器会打印日志信息、接口信息
- APP 配置 H5 入口
  在同一个局域网下，获取电脑本机 ip
  npm run dev 后在地址栏获取当前测试项目的 url
  在 app 某个 html 页面配置一个 a 标签，href 为上述 url，将 url 中的 localhost 替换为上述 ip 地址
  打开 app，点击 a 标签即可打开测试页面，也可调用 jsbridge
- app 配置入口
  最好让 native 开发人员配置一个 h5 入口，H5 输入本地 ip 及路径，点击按钮直接加载上述路径
```

### 主题色样式解决方案

```js
变量名：
命名：              引用
less  @titleColor:blue     color:@titleColor
scss $titleColor:blue     color:$titleColor
css  :root{--titleColor:blue} color:var(--titleColor)
补充：
1.css中的var(--titleColor,skyBlue)函数可以接受两个参数，如果第一个参数的值不存在的话，则使用第二个默认值
2.css自定义的样式属性为什么通常放在:root{}中
 因为:root是一个伪类，表示文档根元素，非IE及ie8及以上浏览器都支持，在:root中声明相当于全局属性，只要当前页面引用了:root segment所在文件，都可以使用var()来引用 再者 因为CSS不仅用于设置HTML文档的样式，它还用于XML和SVG文件。对于XML和SVG文件，:root不会选择html元素，而是选择它们的根（例如svg文件中的SVG标记）。

解决方案
 方案一：通过编写globalCss样式文件，定义变量名，在开发中颜色使用变量名来定义，更换主题的时候只需要更换主题颜色库就可以了

```
