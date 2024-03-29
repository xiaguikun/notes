##### 项目重难点：

1.我们的 H5 身份验证页面点击人脸验证，调用原生 SDK 拉起人脸认证，但是我们需要人脸认证的结果告诉我们认证结果就这个交互动作

方案：我们在 window 上注册一个 js 方法函数，SDK 认证完成后调用我们 window 上的这个函数，函数中我们接受结果，通过派发自定义事件的方式下发结果，我们的页面中监听这个自定义事件

```js
//全局代码
window.baiduFaceResult = function (obj) {
  const event = new CustomEvent('baiduFaceResult', {
    detail: JSON.parse(obj),
  });
  document.dispatchEvent(event);
};
//组件代码
document.addEventListener('baiduFaceResult', (data) => {}
```

2.pagePathMap 问题：小程序分包后，页面路径变了，本来后端下发的一些路径都不对了，业务组件库配的跳转按钮什么的，后期维护一份 pagePathMap,后端只需要下发一个页面变量就好了，实际页面路径由前端把控

3.开发移动端测试工具，先做的是接口 log，后期又做了退出登录，清楚缓存等功能

4.组件通信，通过在 window 上注入事件的方式

```js
key:eventlistner
if (isWeb) {
    return window[key];
  } else {
    if (isWeChatMiniProgram) {
      return wx[key];
    }

    if (isByteDanceMicroApp) {
      return tt[key];
    }
  }

事件绑定，我们通过自定义事件绑定到window上，如果移除就从window上移除掉
```

5.封装判断运行环境工具

```js
增加封装函数库，判断环境在哪个环境，web，wx，tt
"use strict";
var isWeb = typeof window !== 'undefined' && 'onload' in window;
exports.isWeb = isWeb;
var isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
exports.isNode = isNode;
var isWeex = typeof WXEnvironment !== 'undefined' && WXEnvironment.platform !== 'Web';
exports.isWeex = isWeex;
var isKraken = typeof __kraken__ !== 'undefined';
exports.isKraken = isKraken;
var isMiniApp = typeof my !== 'undefined' && my !== null && typeof my.alert !== 'undefined';
exports.isMiniApp = isMiniApp;
var isByteDanceMicroApp = typeof tt !== 'undefined' && tt !== null && typeof tt.showToast !== 'undefined';
exports.isByteDanceMicroApp = isByteDanceMicroApp;
var isBaiduSmartProgram = typeof swan !== 'undefined' && swan !== null && typeof swan.showToast !== 'undefined';
exports.isBaiduSmartProgram = isBaiduSmartProgram;
var isKuaiShouMiniProgram = typeof ks !== 'undefined' && ks !== null && typeof ks.showToast !== 'undefined'; //

exports.isKuaiShouMiniProgram = isKuaiShouMiniProgram;
var isWeChatMiniProgram = !isByteDanceMicroApp && typeof wx !== 'undefined' && wx !== null && (typeof wx.request !== 'undefined' || typeof wx.miniProgram !== 'undefined');
exports.isWeChatMiniProgram = isWeChatMiniProgram;
var isQuickApp = typeof global !== 'undefined' && global !== null && typeof global.callNative !== 'undefined' && !isWeex;
exports.isQuickApp = isQuickApp;

```

6.封装路由跳转工具根据不同环境跳转不同的页面

```js
 wx.switchTab   wx.reLaunch    wx.redirectTo    wx.navigateTo    wx.navigateBack
tt.
my.
```

### 面试刚要

#### JavaScript

##### 1.MVC 和 MVVM 区别

MVC 和 MVVM 是一种软件设计思想

<img src="/Users/xiaguikun/Library/Application Support/typora-user-images/image-20220510192219819.png" alt="image-20220510192219819" style="zoom:25%;" />

```
1.View 传送指令到 Controller
2.Controller 完成业务逻辑后，要求 Model 改变状态
3.Model 将新的数据发送到 View，用户得到反馈
```

<img src="/Users/xiaguikun/Library/Application Support/typora-user-images/image-20220510192334467.png" alt="image-20220510192334467" style="zoom:25%;" />

```
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel
```

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

##### 2.Promise 的理解

Promise

Promise 是异步编程的一种解决方案，它比传统的解决方案回调函数和事件更合理和更强大，避免了地狱回调 Promise 的实例有三个状态，分别是 pending resolve(成功) reject(失败) Promise 的状态只能从 pending 到成功或者失败，一旦状态改变完成就不会再改变

平常我们一般会使用 Promise 有五个常用的方法：then()、catch()、all()、race()、finally()

1.then(resolvedFn,rejectedFn)方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为`resolved`时调用，第二个回调函数是 Promise 对象的状态变为`rejected`时调用。其中第二个参数可以省略。 `then`方法返回的是一个新的 Promise 实例（不是原来那个 Promise 实例）。因此可以采用链式写法，即`then`方法后面再调用另一个 then 方法。

2.还有一个 catch 方法，该方法相当于`then`方法的第二个参数，指向`reject`的回调函数。不过`catch`方法还有一个作用，就是在执行`resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入`catch`方法中。

3.`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。

调用`all`方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个 promise 对象`resolve`执行时的值。

4.race 方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected

5.`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

Promise 和 async await 的区别

promise 和 async await 都是异步编程的解决方案，比传统的回调函数和事件更为强大，promise 主要用于解决回调地狱问题，将但是其语法导致它向纵向发展成一个回调链，遇到复杂逻辑时就显得不那么美观，asnyc 和 await 就是 generator 的语法糖，变异步为同步，也比较美观，但是大量使用 async await 函数会导致程序的性能下降，因为它是等待异步操作返回结果才进行下一步

##### 3.cookie sesstion token 区别

cookie 数据存放在客户的浏览器上保存用户信息，相对而言是不安全的，而且 cookie 的大小受限不能超过可 4k 一般，session 数据放在服务器上，我们客户端仅仅需要存储一个 sessionId 来作为用户请求校验就可以了，相对安全一点，但是 Session 需要占用服务器的物理资源，如果用户量比较大对服务器的开销也是比较大的，所以现在项目基本使用 token，Token 是一个令牌，由服务器生成，然后保存在客户端，每次客户端发送请求都带上这个 Token；服务器验证该 Token 的正确性。Token 就像是一个身份证，由服务器签发和验证，在有效期内都具有合法性

##### 4.es6

```
promise，await/async，let、const、块级作用域、箭头函数、class、解构赋值
```

块作用域、类、模板字符串、扩展运算符、数组和对象的扩展、模块、Symbol、代理（proxy）、数据结构 Set Map、函数默认参数、rest、Set 和 Mapes6 新增的数据结构

Object.keys(obj) 会得到返回值是一个数组，数组的内容为 obj 的 key 值
Object.values(obj) 会得到返回值是一个数组，数组的参数 obj 的 value 值
Object.entries(obj) 会得到返回值是一个二维数组，数组的参数是每个二维的数组是 obj 的 key 和 values 的值

```js
const obj = { foo: "bar", baz: 42 };
Object.entries(obj);
// [ ["foo", "bar"], ["baz", 42] ]
```

Object.is(变量 1,变量 2),比较变量 1 与变量 2 是否相等。

##### 5.闭包

闭包就是指有权访问另一个函数作用域内的变量的函数，创建闭包的常用方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量

```js
function A() {
  let a = 1;
  window.B = function () {
    console.log(a);
  };
}
A();
B(); //1
```

闭包有两个常用的用途；

- 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
- 闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

##### 6.js 数据类型

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围

##### 7.数据类型检测

- typeof ---一般用于基本数据类型检测，但是 typeof null 或者 typeof 引用数据类型都是 object
- instanceof ---instanceof 可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型 [] instanceof Array
- constructor---constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor 就不能用来判断数据类型了
- Object.prototype.toString.call()--使用 Object 对象的原型方法 toString 来判断数据类型 Object.prototype.toString.call("str")

##### 8.原型和原型链

原型：

在 JavaScript 中使用构造函数来创建一个新对象，每个构造函数内部都有一个 prototype 属性，它的属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法，通过该构造函数创建的对象，内部会有一个**proto**这样指针，指向这个对象的构造函数的 prototype 属性，这个就叫做对象的原型，但是最好不要使用这个指针，可以通过 Object.getPrototypeOf() 方法来获取对象的原型。

原型链：

当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是新建的对象为什么能够使用 toString() 等方法的原因。

##### 9.响应式编程

响应式编程就是当我们的数据发生变化时会自动的带动我们视图或者一些其他的操作执行，这就是响应式编程，在 js 中我们可以通过 Object.defineProperty 或者 es6 的 Proxy 来实现数据的响应式，追踪数据变化已经在数据改变或者读取的时候做一些拦截

通过 Object.defineProperty 实现，这样我们就监听了 obj 的一个属性，可以循环遍历为每一个属性添加一个监听，但是对于新增的属性无法监听

```js
var obj = {};
var age;
Object.defineProperty(obj, "age", {
  get: function () {
    console.log("读取属性值");
    return age;
  },
  set: function (val) {
    console.log("修改属性值");
    age = val;
  },
});
```

通过 Proxy 实现 ,这样我们就监听了整个对象，对于新增属性也可以监听到

```js
const people = {
  age: 18,
};
const peopleProxy = new Proxy(people, {
  get: function (target, key) {
    console.log("读取了");
    // return target[key];  两个return等价
    return Reflect.get(...arguments);
  },
  set: function (target, key, val) {
    console.log("修改了");
    // return (target[key] = val);  两个return等价
    return Reflect.set(...arguments);
  },
});
console.log(peopleProxy.age);
```

两者区别

Proxy 可以劫持整个对象，如果对象内部有嵌套只需要通过递归劫持一下嵌套的对象从而完整的劫持整个数据

Object.defineProperty 只能劫持对象的一个属性，我们需要循环遍历才能劫持到整个对象，如果再有对象嵌套我们有需要深度遍历来劫持数据

##### 10.自执行函数

两种写法（注意使用括号包裹起来）

```js
(function fun4() {
  console.log("fun4");
})();
```

```js
(function fun5() {
  console.log("fun5");
})();
```

##### 11.事件轮询

js 代码是单线程执行的，我们的代码在执行栈中执行同步代码会立即执行掉，异步事件会被挂起，直到同步代码执行完毕，我们的 eventLoop 事件轮询机制会轮询我们的任务队列，在同步执行过程中挂起的异步任务中达到了执行条件就会被推送到任务队列，任务队列又分为宏任务和微任务队列，事件轮询优先会去执行微任务队列，执行完后再去执行宏任务队列。任务队列是先进先出的方式

常见宏任务：setTimeout， setInterval

常见为任务：pormise 的 then 函数 Process.nextTick

##### 12.垃圾回收机制

JavaScript 代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收，JavaScript 中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续要页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。

浏览器通常使用的垃圾回收方法有两种：标记清除，引用计数

##### 13.js 继承

1.原型链继承
重点：让新实例的原型等于父类的实例。
特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。
　　　 （新实例不会继承父类实例的属性！）
缺点：1、新实例无法向父类构造函数传参。
2、继承单一。
3、所有新实例都会共享父类实例的属性。
　　　　　　（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！） 2.借用构造函数继承
重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
2、解决了原型链继承缺点 1、2、3。
3、可以继承多个构造函数属性（call 多个）。
4、在子实例中可向父实例传参。
缺点：1、只能继承父类构造函数的属性。
2、无法实现构造函数的复用。（每次用每次都要重新调用）
3、每个新实例都有父类构造函数的副本，臃肿。 3.组合继承（组合原型链继承和借用构造函数继承）
重点：结合了两种模式的优点，传参和复用
特点：1、可以继承父类原型上的属性，可以传参，可复用。
2、每个新实例引入的构造函数属性是私有的。
缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。 4.原型式继承
重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。 object.create()就是这个原理。
特点：类似于复制一个对象，用函数来包装。
缺点：1、所有实例都会继承原型上的属性。
2、无法实现复用。（新实例属性都是后面添加的） 5.寄生式继承
重点：就是给原型式继承外面套了个壳子。
优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
缺点：没用到原型，无法复用。 6.寄生组合式继承（常用）
重点：修复了组合继承的问题
寄生：在函数内返回对象然后调用
组合：1、函数的原型等于另一个实例。
2、在函数中用 apply 或者 call 引入另一个构造函数，可传参

##### 14.创建对象的方式

我们一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但 js 和一般的面向对象的语言不同，在 ES6 之前它没有类的概念。但是我们可以使用函数来进行模拟，从而产生出可复用的对象创建方式，我了解到的方式有这么几种：

（1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

（2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

（3）第三种模式是原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

（4）第四种模式是组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

（5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

（6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。

#### Vue

##### 1.双向绑定的原理

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是: ① 在自身实例化时往属性订阅器(dep)里面添加自己 ② 自身必须有一个 update()方法 ③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

##### 2.Computed 和 Watch 的区别

computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。

##### 3.data 为什么是一个函数而不是对象

JavaScript 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。

而在 Vue 中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。

所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的 data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。

##### 4. 说一下 Vue 的生命周期

Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是 Vue 的⽣命周期。

1. **beforeCreate（创建前）**：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到 data、computed、watch、methods 上的方法和数据。
2. **created（创建后）** ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。
3. **beforeMount（挂载前）**：在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成以下的配置：编译模板，把 data 里面的数据和模板生成 html。此时还没有挂载 html 到页面上。
4. **mounted（挂载后）**：在 el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的 html 内容替换 el 属性指向的 DOM 对象。完成模板中的 html 渲染到 html 页面中。此过程中进行 ajax 交互。
5. **beforeUpdate（更新前）**：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。
6. **updated（更新后）** ：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7. **beforeDestroy（销毁前）**：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8. **destroyed（销毁后）**：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。

另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `activated` 钩子函数。

##### 5.事件通信

**（1）父子组件间通信**

- 子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。
- 通过 ref 属性给子组件设置一个名字。父组件通过 `$refs` 组件名来获得子组件，子组件通过 `$parent` 获得父组件，这样也可以实现通信。
- 使用 provide/inject，在父组件中通过 provide 提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provide 中的数据。

**（2）兄弟组件间通信**

- 使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。
- 通过 `$parent/$refs` 来获取到兄弟组件，也可以进行通信。

**（3）任意组件之间**

- 使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。

#### React

##### 1.react 事件机制

React 并不是将 click 事件绑定到了 div 的真实 DOM 上，而是在 document 处监听了所有的事件，当事件发生并且冒泡到 document 处的时候，React 将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。除此之外，冒泡到 document 上的事件也不是原生的浏览器事件，而是由 react 自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用 event.preventDefault()方法，而不是调用 event.stopProppagation()方法。

实现合成事件的目的：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

##### 2.react hooks

1. useState：就是类组件的 state，使得函数组件可以拥有类组件一样的状态
2. useReducer：setState，同时 useState 也是该方法的封装
3. useRef: refx
4. useImperativeHandle: 给 ref 分配特定的属性
5. useContext: context，需配合 createContext 使用
6. useMemo: 可以对 setState 的优化
7. useCallback: useMemo 的变形，对函数进行优化
8. useEffect: 类似 componentDidMount/Update, componentWillUnmount，当效果为 componentDidMount/Update 时，总是在整个更新周期的最后（页面渲染完成后）才执行
9. useLayoutEffect: 用法与 useEffect 相同，区别在于该方法的回调会在数据更新完成后，页面渲染之前进行，该方法会阻碍页面的渲染
10. useDebugValue：用于在 React 开发者工具中显示自定义 hook 的标签

注意：

1.  不能将 hooks 放在循环、条件语句或者嵌套方法内。react 是根据 hooks 出现顺序来记录对应状态的，执行以上操作会打乱 hooks 顺序
2.  只在 function 组件和自定义 hooks 中使用 hooks。

##### 3.React 高阶组件、Render props、hooks 有什么区别

这三者是目前 react 解决代码复用的主要方式：

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧，高阶组件是参数为组件，返回值为新组件的函数

Render Prop 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，具有 render prop 的组件接受一个返回 React 元素的函数，将 render 的渲染逻辑注入到组件内部。在这里，"render"的命名可以是任何其他有效的标识符。

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义 hook，可以复用代码逻辑。

##### 4.哪些方法会触发 React 重新渲染？

- **setState（）方法被调用**

setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 setState 传入 null 时，并不会触发 render。

- **父组件重新渲染**

只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

**重新渲染 render 会做些什么?**

- 会对新旧 VNode 进行对比，也就是我们所说的 Diff 算法。
- 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
- 遍历差异对象，根据差异的类型，根据对应对规则更新 VNode
-

##### 5.组件通信的方式有哪些

- **⽗组件向⼦组件通讯**: ⽗组件可以向⼦组件通过传 props 的⽅式，向⼦组件进⾏通讯
- **⼦组件向⽗组件通讯**: props+回调的⽅式，⽗组件向⼦组件传递 props 进⾏通讯，此 props 为作⽤域为⽗组件⾃身的函 数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
- **兄弟组件通信**: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏通信
- **跨层级通信**: Context 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题或⾸选语⾔，对于跨越多层的全局数据通过 Context 通信再适合不过
- **发布订阅模式**: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊ event 模块进⾏通信
- **全局状态管理⼯具**: 借助 Redux 或者 Mobx 等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼ Store,并根据不同的事件产⽣新的状态

##### 6.React-Router 的实现原理是什么？

**客户端路由实现的思想：**

- 基于 hash 的路由：通过监听

  ```
  hashchange
  ```

  事件，感知 hash 的变化

  - 改变 hash 可以直接通过 location.hash=xxx

- 基于 H5 history 路由：

  - 改变 url 可以通过 history.pushState 和 resplaceState 和 popstate 事件，会将 URL 压入堆栈，同时能够应用 `history.go()` 等 API
  - 监听 url 的变化可以通过自定义事件触发实现

**react-router 实现的思想：**

- 基于 `history` 库来实现上述不同的客户端路由实现思想，并且能够保存历史记录等，磨平浏览器差异，上层无感知
- 通过维护的列表，在每次 URL 发生变化的回收，通过配置的 路由路径，匹配到对应的 Component，并且 render

##### 7. Redux 和 Vuex 有什么区别，它们的共同思想

**（1）Redux 和 Vuex 区别**

- Vuex 改进了 Redux 中的 Action 和 Reducer 函数，以 mutations 变化函数取代 Reducer，无需 switch，只需在对应的 mutation 函数里改变 state 值即可
- Vuex 由于 Vue 自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的 State 即可
- Vuex 数据流的顺序是 ∶View 调用 store.commit 提交对应的请求到 Store 中对应的 mutation 函数->store 改变（vue 检测到数据变化自动渲染）

通俗点理解就是，vuex 弱化 dispatch，通过 commit 进行 store 状态的一次更变；取消了 action 概念，不必传入特定的 action 形式进行指定变更；弱化 reducer，基于 commit 参数直接对数据进行转变，使得框架更加简易;

**（2）共同思想**

- 单—的数据源
- 变化可以预测

本质上 ∶ redux 与 vuex 都是对 mvvm 思想的服务，将数据从视图中抽离的一种方案。

#### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place

##### place
