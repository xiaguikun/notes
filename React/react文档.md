# 一、create-react-app

全局安装 create-react-app

```sh
$ npm install -g create-react-app
```

创建一个项目

```sh
$ create-react-app your-app 注意命名方式

Creating a new React app in /dir/your-app.

Installing packages. This might take a couple of minutes. 安装过程较慢，
Installing react, react-dom, and react-scripts...
```

如果不想全局安装，可以直接使用 npx

```sh
$ npx create-react-app your-app	也可以实现相同的效果
```

这需要等待一段时间，这个过程实际上会安装三个东西

- react: react 的顶级库
- react-dom: 因为 react 有很多的运行环境，比如 app 端的 react-native, 我们要在 web 上运行就使用 react-dom
- react-scripts: 包含运行和打包 react 应用程序的所有脚本及配置

出现下面的界面，表示创建项目成功:

```sh
Success! Created your-app at /dir/your-app
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd your-app
  npm start

Happy hacking!
```

根据上面的提示，通过`cd your-app`命令进入目录并运行`npm start`即可运行项目。

生成项目的目录结构如下：

```sh
├── README.md							使用方法的文档
├── node_modules					所有的依赖安装的目录
├── package-lock.json			锁定安装时的包的版本号,保证团队的依赖能保证一致。
├── package.json
├── public								静态公共目录
└── src										开发用的源代码目录
```

常见问题：

- npm 安装失败

  - 切换为 npm 镜像为淘宝镜像
  - 使用 yarn，如果本来使用 yarn 还要失败，还得把 yarn 的源切换到国内
  - 如果还没有办法解决，请删除 node_modules 及 package-lock.json 然后重新执行`npm install命令`
  - 再不能解决就删除 node_modules 及 package-lock.json 的同时清除 npm 缓存`npm cache clean --force`之后再执行`npm install`命令

- yarn
  - 安装 npm install -g yarn
  - 查看版本 yarn --version
  - 设置淘宝源 yarn config set registry https://registry.npm.taobao.org -g

# 二、关于 React

## 1、React 的起源和发展

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。

## 2、React 与传统 MVC 的关系

轻量级的视图层**库**！_A JavaScript library for building user interfaces_

React 不是一个完整的 MVC 框架，最多可以认为是 MVC 中的 V（View），甚至 React 并不非常认可 MVC 开发模式；React 构建页面 UI 的库。可以简单地理解为，React 将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

## 3、React 高性能的体现：虚拟 DOM

**React 高性能的原理：**

在 Web 开发中我们总需要将变化的数据实时反应到 UI 上，这时就需要对 DOM 进行操作。而复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因（如何进行高性能的复杂 DOM 操作通常是衡量一个前端开发人员技能的重要指标）。

React 为此引入了虚拟 DOM（Virtual DOM）的机制：在浏览器端用 Javascript 实现了一套 DOM API。基于 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从 A-B, B-A，React 会认为 A 变成 B，然后又从 B 变成 A UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的，而对实际 DOM 进行操作的仅仅是 Diff 分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。

**React Fiber:**

在 react 16 之后发布的一种 react 核心算法，**React Fiber 是对核心算法的一次重新实现**(官网说法)。之前用的是 diff 算法。

在之前 React 中，更新过程是同步的，这可能会导致性能问题。

当 React 决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对 Virtual DOM，最后更新 DOM 树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，中途不会中断。因为 JavaScript 单线程的特点，如果组件树很大的时候，每个同步任务耗时太长，就会出现卡顿。

React Fiber 的方法其实很简单——分片。把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

## 4、React 的特点和优势

**(1) 虚拟 DOM**

我们以前操作 dom 的方式是通过 document.getElementById()的方式，这样的过程实际上是先去读取 html 的 dom 结构，将结构转换成变量，再进行操作。而 reactjs 定义了一套变量形式的 dom 模型，一切操作和换算直接在变量中，这样减少了操作真实 dom，性能真实相当的高，和主流 MVC 框架有本质的区别，并不和 dom 打交道

**(2) 组件系统**

react 最核心的思想是将页面中任何一个区域或者元素都可以看做一个组件 component

那么什么是组件呢？

组件指的就是同时包含了 html、css、js、image 元素的聚合体

使用 react 开发的核心就是将页面拆分成若干个组件，并且 react 一个组件中同时耦合了 css、js、image，这种模式整个颠覆了过去的传统的方式

**(3) 单向数据流**

其实 reactjs 的核心内容就是数据绑定，所谓数据绑定指的是只要将一些服务端的数据和前端页面绑定好，开发者只关注实现业务就行了

**(4) JSX 语法**

在 vue 中，我们使用 render 函数来构建组件的 dom 结构性能较高，因为省去了查找和编译模板的过程，但是在 render 中利用 createElement 创建结构的时候代码可读性较低，较为复杂，此时可以利用 jsx 语法来在 render 中创建 dom，解决这个问题，但是前提是需要使用工具来编译 jsx

# 三、编写第一个 react 应用程序

## 1.脚手架使用

react 开发需要引入多个依赖文件：react.js、react-dom.js，分别又有开发版本和生产版本，create-react-app 里已经帮我们把这些东西都安装好了。把通过 CRA 创建的工程目录下的 src 目录清空，然后在里面重新创建一个 index.js. 写入以下代码:

```jsx
// 从 react 的包当中引入了 React。只要你要写 React.js 组件就必须引入React, 因为react里有一种语法叫JSX，稍后会讲到JSX，要写JSX，就必须引入React
import React from 'react';
// ReactDOM 可以帮助我们把 React 组件渲染到页面上去，没有其它的作用了。它是从 react-dom 中引入的，而不是从 react 引入。
import ReactDOM from 'react-dom';

// ReactDOM里有一个render方法，功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上
ReactDOM.render(
  // 这里就比较奇怪了，它并不是一个字符串，看起来像是纯 HTML 代码写在 JavaScript 代码里面。语法错误吗？这并不是合法的 JavaScript 代码, “在 JavaScript 写的标签的”语法叫 JSX- JavaScript XML。
  <h1>欢迎进入React的世界</h1>,
  // 渲染到哪里
  document.getElementById('root')
);
```

## 2.单个文件使用

单个 html 文件使用 react 需要引入三个文件才能使用

```jsx
react.js	          	 -------React的顶级库，引入之后就可以使用react的api
react-dom.js			 -------reactDom适用于渲染组件到视图
babel-loader			 -------用于解析jsx语法

通过ReactDOM.render(组价(页面)名，dom节点)方法渲染组件到指定的dom节点
```

# 四、元素与组件

如果代码多了之后，不可能一直在 render 方法里写，所以就需要把里面的代码提出来，定义一个变量，像这样：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// 这里感觉又不习惯了？这是在用JSX定义一下react元素
const app = <h1>欢迎进入React的世界</h1>;
ReactDOM.render(app, document.getElementById('root'));
```

## 1、函数式组件

由于元素没有办法传递参数，所以我们就需要把之前定义的变量改为一个方法，让这个方法去 return 一个元素:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// 特别注意这里的写法，如果要在JSX里写js表达式(只能是表达式，不能流程控制)，就需要加 {}，包括注释也是一样，并且可以多层嵌套
const app = (props) => <h1>欢迎进入{props.name}的世界</h1>;

ReactDOM.render(
  app({
    name: 'react',
  }),
  document.getElementById('root')
);
```

这里我们定义的方法实际上也是 react 定义组件的第一种方式-定义函数式组件，这也是无状态组件。但是这种写法不符合 react 的 jsx 的风格，更好的方式是使用以下方式进行改造

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => <h1>欢迎进入{props.name}的世界</h1>;

ReactDOM.render(
  // React组件的调用方式
  <App name="react" />,
  document.getElementById('root')
);
```

这样一个完整的函数式组件就定义好了。但要**注意！注意！注意！**组件名必须**大写**，否则报错。

## 2、class 组件

ES6 的加入让 JavaScript 直接支持使用 class 来定义一个类，react 的第二种创建组件的方式就是使用的类的继承，`ES6 class`是目前官方推荐的使用方式，它使用了 ES6 标准语法来构建，看以下代码：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      // 注意这里得用this.props.name, 必须用this.props
      <h1>欢迎进入{this.props.name}的世界</h1>
    );
  }
}
ReactDOM.render(<App name="react" />, document.getElementById('root'));
```

运行结果和之前完全一样，因为 JS 里没有真正的 class，这个 class 只是一个语法糖, 但二者的运行机制底层运行机制不一样。

- 函数式组件是直接调用, 在前面的代码里已经有看到

- `es6 class`组件其实就是一个构造器,每次使用组件都相当于在实例化组件，像这样：

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  class App extends React.Component {
    render() {
      return <h1>欢迎进入{this.props.name}的世界</h1>;
    }
  }
  
  const app = new App({
    name: 'react',
  }).render();
  
  ReactDOM.render(app, document.getElementById('root'));
  ```

## 3、更老的一种方法

在 16 以前的版本还支持这样创建组件, 但现在的项目基本上不用

```jsx
React.createClass({
  render() {
    return <div>{this.props.xxx}</div>;
  },
});
```

## 4、组件的组合、嵌套

组件组合方式将一个组件渲染到某一个节点里的时候，会将这个节点里原有内容覆盖，组件中通过 props.children 来渲染插进来的组件

组件嵌套的方式就是将子组件写入到父组件的模板中去，且 react 没有 Vue 中的内容分发机制（slot），所以我们在一个组件的模板中只能看到父子关系

```jsx
// 从 react 的包当中引入了 React 和 React.js 的组件父类 Component
// 还引入了一个React.js里的一种特殊的组件 Fragment
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component {
  render() {
    return <h1>欢迎进入React的世界</h1>;
  }
}
class Content extends Component {
  render() {
    return <p>React.js是一个构建UI的库</p>;
  }
}
/** 由于每个React组件只能有一个根节点，所以要渲染多个组件的时候，需要在最外层包一个容器，如果使用div, 会生成多余的一层dom
class App extends Component {
  render () {
    return (
    	<div>
    		<Title />
        <Content />
      </div>
  	)
  }
}
**/
// 如果不想生成多余的一层dom可以使用React提供的Fragment组件在最外层进行包裹
class App extends Component {
  render() {
    return (
      <Fragment>
        <Title />
        <Content />
      </Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

## 5、样式引入

常用的四种样式引入方式(六中详细解释)

```jsx
行内样式
引入样式
通过包classname(classnames)控制类名的方式引入
通过包styled-components开发引入样式组件
```

# 五、JSX 原理

要明白 JSX 的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构?

看下面的 DOM 结构

```html
<div class="app" id="appRoot">
  <h1 class="title">欢迎进入React的世界</h1>
  <p>React.js 是一个帮助你构建页面 UI 的库</p>
</div>
```

上面这个 HTML 所有的信息我们都可以用 JavaScript 对象来表示：

```js
{
  tag: 'div',
  attrs: { className: 'app', id: 'appRoot'},
  children: [
    {
      tag: 'h1',
      attrs: { className: 'title' },
      children: ['欢迎进入React的世界']
    },
    {
      tag: 'p',
      attrs: null,
      children: ['React.js 是一个构建页面 UI 的库']
    }
  ]
}
```

但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

下面代码:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className="app" id="appRoot">
        <h1 className="title">欢迎进入React的世界</h1>
        <p>React.js 是一个构建页面 UI 的库</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

编译之后将得到这样的代码:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'app',
        id: 'appRoot',
      },
      React.createElement('h1', { className: 'title' }, '欢迎进入React的世界'),
      React.createElement('p', null, 'React.js 是一个构建页面 UI 的库')
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
```

`React.createElement` 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等, 语法为

```jsx
React.createElement(type, [props], [...children]);
```

所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:

> JSX —使用 react 构造组件，bable 进行编译—> JavaScript 对象 — `ReactDOM.render()`—>DOM 元素 —>插入页面

# 六、组件中 DOM 样式

- 行内样式

想给虚拟 dom 添加行内样式，需要使用表达式传入样式对象的方式来实现：

```jsx
// 注意这里的两个括号，第一个表示我们在要JSX里插入JS了，第二个是对象的括号
<p style={{ color: 'red', fontSize: '14px' }}>Hello world</p>
```

行内样式需要写入一个样式对象，而这个样式对象的位置可以放在很多地方，例如`render`函数里、组件原型上、外链 js 文件中

- 使用`class`

React 推荐我们使用行内样式，因为 React 觉得每一个组件都是一个独立的整体

其实我们大多数情况下还是大量的在为元素添加类名，但是需要注意的是，`class`需要写成`className`（因为毕竟是在写类 js 代码，会收到 js 规则的现在，而`class`是关键字）

```jsx
<p className="hello" style={this.style}>
  Hello world
</p>
```

- 不同的条件添加不同的样式

有时候需要根据不同的条件添加不同的样式，比如：完成状态，完成是绿色，未完成是红色。那么这种情况下，我们推荐使用[classnames](https://www.npmjs.com/package/classnames)这个包：

- css-in-js

`styled-components`是针对 React 写的一套 css-in-js 框架，简单来讲就是在 js 中写 css。[npm 链接](https://www.npmjs.com/package/styled-components)

# 七、组件的数据挂载方式

## 1、属性(props)

`props`是正常是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更改，但是你可以通过父组件主动重新渲染的方式来传入新的 `props`

属性是描述性质、特点的，组件自己不能随意更改。

之前的组件代码里面有`props`的简单使用，总的来说，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为组件 `props` 对象的键值。通过箭头函数创建的组件，需要通过函数的参数来接收`props`:

```jsx
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component {
  render() {
    return <h1>欢迎进入{this.props.name}的世界</h1>;
  }
}

const Content = (props) => {
  return <p>{props.name}是一个构建UI的库</p>;
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Title name="React" />
        <Content name="React.js" />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### (1) 设置组件的默认 props

```jsx
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component {
  // 使用类创建的组件，直接在这里写static方法，创建defaultProps
  static defaultProps = {
    name: 'React',
  };
  render() {
    return <h1>欢迎进入{this.props.name}的世界</h1>;
  }
}

const Content = (props) => {
  return <p>{props.name}是一个构建UI的库</p>;
};

// 使用箭头函数创建的组件，需要在这个组件上直接写defaultProps属性
Content.defaultProps = {
  name: 'React.js',
};

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* 由于设置了defaultProps， 不传props也能正常运行，如果传递了就会覆盖defaultProps的值 */}
        <Title />
        <Content />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### (2) props.children

我们知道使用组件的时候，可以嵌套。要在自定义组件的使用嵌套结构，就需要使用 `props.children` 。在实际的工作当中，我们几乎每天都需要用这种方式来编写组件。

```jsx
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component {
  render() {
    return <h1>欢迎进入{this.props.children}的世界</h1>;
  }
}

const Content = (props) => {
  return <p>{props.children}</p>;
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Title>React</Title>
        <Content>
          <i>React.js</i>是一个构建UI的库
        </Content>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### (3) 使用 prop-types 检查 props

React 其实是为了构建大型应用程序而生, 在一个大型应用中，根本不知道别人使用你写的组件的时候会传入什么样的参数，有可能会造成应用程序运行不了，但是不报错。为了解决这个问题，React 提供了一种机制，让写组件的人可以给组件的`props`设定参数检查，需要安装和使用[prop-types](https://www.npmjs.com/package/prop-types):

```sh
$ npm i prop-types -S
```

## 2、状态(state)

状态就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用状态的目的就是为了在不同的状态下使组件的显示不同(自己管理)

### (1) 定义 state

第一种方式

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {
    name: 'React',
    isLiked: false,
  };
  render() {
    return (
      <div>
        <h1>欢迎来到{this.state.name}的世界</h1>
        <button>{this.state.isLiked ? '❤️取消' : '🖤收藏'}</button>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

另一种方式(推荐)

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isLiked: false,
    };
  }
  render() {
    return (
      <div>
        <h1>欢迎来到{this.state.name}的世界</h1>
        <button>{this.state.isLiked ? '❤️取消' : '🖤收藏'}</button>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

`this.props`和`this.state`是纯 js 对象,在 vue 中，data 属性是利用`Object.defineProperty`处理过的，更改 ​data 的数据的时候会触发数据的`getter`和`setter`，但是 React 中没有做这样的处理，如果直接更改的话，react 是无法得知的，所以，需要使用特殊的更改状态的方法`setState`。

### (2) setState

`isLiked` 存放在实例的 `state` 对象当中，组件的 `render` 函数内，会根据组件的 `state` 的中的`isLiked`不同显示“取消”或“收藏”内容。下面给 `button` 加上了点击的事件监听。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isLiked: false,
    };
  }
  handleBtnClick = () => {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  };
  render() {
    return (
      <div>
        <h1>欢迎来到{this.state.name}的世界</h1>
        <button onClick={this.handleBtnClick}>
          {this.state.isLiked ? '❤️取消' : '🖤收藏'}
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

`setState`有两个参数

第一个参数可以是对象，也可以是方法 return 一个对象，我们把这个参数叫做`updater`

- 参数是对象

  ```jsx
  this.setState({
    isLiked: !this.state.isLiked,
  });
  ```

- 参数是方法

  ```jsx
  this.setState((prevState, props) => {
    return {
      isLiked: !prevState.isLiked,
    };
  });
  ```

  注意的是这个方法接收两个参数，第一个是上一次的 state, 第二个是 props

`setState`是异步的，所以想要获取到最新的 state，没有办法获取，就有了第二个参数，这是一个可选的回调函数

```jsx
this.setState(
  (prevState, props) => {
    return {
      isLiked: !prevState.isLiked,
    };
  },
  () => {
    console.log('回调里的', this.state.isLiked);
  }
);
console.log('setState外部的', this.state.isLiked);
```

## 3、属性 vs 状态

相似点：都是纯 js 对象，都会触发 render 更新，都具有确定性（状态/属性相同，结果相同）

不同点：

1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值，状态也可以
4. 属性不在组件内部修改，状态要改
5. 属性能设置子组件初始值，状态不可以
6. 属性可以修改子组件的值，状态不可以

`state` 的主要作用是用于组件保存、控制、修改自己的可变状态。`state` 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 `state` 是一个局部的、只能被组件自身控制的数据源。`state` 中状态可以通过 `this.setState`方法进行更新，`setState` 会导致组件的重新渲染。

`props` 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变。

如果搞不清 `state` 和 `props` 的使用场景，记住一个简单的规则：**尽量少地用 `state`，多用 `props`**。

没有 `state` 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。

## 4、状态提升

如果有多个组件共享一个数据，把这个数据放到共同的父级组件中来管理

## 5、受控组件与非受控组件

React 组件的数据渲染是否被调用者传递的`props`完全控制，控制则为受控组件，否则非受控组件。

## 6、渲染数据

- 条件渲染

  ```jsx
  {
    condition ? '❤️取消' : '🖤收藏';
  }
  ```

- 列表渲染

```jsx
// 数据
const people = [
  {
    id: 1,
    name: 'Leo',
    age: 35,
  },
  {
    id: 2,
    name: 'XiaoMing',
    age: 16,
  },
];
// 渲染列表
{
  people.map((person) => {
    return (
      <dl key={person.id}>
        <dt>{person.name}</dt>
        <dd>age: {person.age}</dd>
      </dl>
    );
  });
}
```

React 的高效依赖于所谓的 Virtual-DOM，尽量不碰 DOM。对于列表元素来说会有一个问题：元素可能会在一个列表中改变位置。要实现这个操作，只需要交换一下 DOM 位置就行了，但是 React 并不知道其实我们只是改变了元素的位置，所以它会重新渲染后面两个元素（再执行 Virtual-DOM ），这样会大大增加 DOM 操作。但如果给每个元素加上唯一的标识，React 就可以知道这两个元素只是交换了位置，这个标识就是`key`，这个 `key` 必须是每个元素唯一的标识

- dangerouslySetInnerHTML

对于富文本创建的内容，后台拿到的数据是这样的：

```js
content = '<p>React.js是一个构建UI的库</p>';
```

处于安全的原因，React 当中所有表达式的内容会被转义，如果直接输入，标签会被当成文本。这时候就需要使用`dangerouslySetHTML`属性，它允许我们动态设置`innerHTML`

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: '<p>React.js是一个构建UI的库</p>',
    };
  }
  render() {
    return (
      <div
        // 注意这里是两个下下划线 __html
        dangerouslySetInnerHTML={{ __html: this.state.content }}
      />
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

# 八、事件处理

## 1、绑定事件

采用 on+事件名的方式来绑定一个事件，注意，这里和原生的事件是有区别的，原生的事件全是小写`onclick`, React 里的事件是驼峰`onClick`，**React 的事件并不是原生事件，而是合成事件**。

## 2、事件 handler 的写法

- 直接在 render 里写行内的箭头函数(不推荐)
- 在组件内使用箭头函数定义一个方法(推荐)
- 直接在组件内定义一个非箭头函数的方法，然后在 render 里直接使用`onClick={this.handleClick.bind(this)}`(不推荐)
- 直接在组件内定义一个非箭头函数的方法，然后在.constructor 里 bind(this)(推荐)

## 3、Event 对象

和普通浏览器一样，事件 handler 会被自动传入一个 `event` 对象，这个对象和普通的浏览器 `event` 对象所包含的方法和属性都基本一致。不同的是 React 中的 `event` 对象并不是浏览器提供的，而是它自己内部所构建的。它同样具有`event.stopPropagation`、`event.preventDefault` 这种常用的方法

## 4、事件的参数传递

- 在`render`里调用方法的地方外面包一层箭头函数
- 在`render`里通过`this.handleEvent.bind(this, 参数)`这样的方式来传递
- 通过`event`传递
- 比较推荐的是做一个子组件, 在父组件中定义方法，通过`props`传递到子组件中，然后在子组件件通过`this.props.method`来调用

## 5、处理用户输入

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      xing: '',
      ming: '',
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { xing, ming } = this.state;
    return (
      <div>
        <label>
          <span>姓:</span>
          <input
            type="text"
            name="xing"
            value={xing}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          <span>名:</span>
          <input
            type="text"
            name="ming"
            value={ming}
            onChange={this.handleInputChange}
          />
        </label>
        <p>
          欢迎您: {xing}
          {ming}
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

# 九、表单

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称：

```html
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。

## 1、受控组件

在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用`setState()`来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。

## 2、textarea 标签

在 HTML 中, `<textarea>` 元素通过其子元素定义其文本:

```
<textarea>
  你好， 这是在 text area 里的文本
</textarea>
```

而在 React 中，`<textarea>` 使用 `value` 属性代替。这样，可以使得使用 `<textarea>` 的表单和使用单行 input 的表单非常类似：

```javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('提交的文章: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

请注意，`this.state.value` 初始化于构造函数中，因此文本区域默认有初值。

## 3、select 标签

在 HTML 中，`<select>` 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：

```
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
```

请注意，由于 `selected` 属性的缘故，椰子选项默认被选中。React 并不会使用 `selected` 属性，而是在根 `select` 标签上使用 `value` 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：

```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

总的来说，这使得, `<input type="text">`, `<textarea>` 和 `<select>`之类的标签都非常相似—它们都接受一个 `value` 属性，你可以使用它来实现受控组件。

> 注意
>
> 你可以将数组传递到 `value` 属性中，以支持在 `select` 标签中选择多个选项：
>
> ```
> <select multiple={true} value={['B', 'C']}>
> ```

```javascript
class MulFlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'coconut',
      arr: [],
      options: [
        { value: 'grapefruit', label: '葡萄柚' },
        { value: 'lime', label: '酸橙' },
        { value: 'coconut', label: '椰子' },
        { value: 'mango', label: '芒果' },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let idx = this.state.arr.findIndex((item) => {
      return item === e.target.value;
    });
    if (idx >= 0) {
      this.state.arr.splice(idx, 1);
    } else {
      this.state.arr.push(e.target.value);
    }
    let arr = this.state.arr;
    this.setState({ arr });
  }

  render() {
    return (
      <div>
        <select
          multiple={true}
          value={this.state.arr}
          onChange={this.handleChange}
        >
          {this.state.options.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Test4;
```

## 4、处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

## 5、文件 input 标签

在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 File API 进行控制。

```html
<input type="file" />
```

因为它的 value 只读，所以它是 React 中的一个非受控组件。将与其他非受控组件在后续文档中一起讨论。

## 6、受控输入空值

在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将 value 设置为 undefined 或 null。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function () {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

## 7、非受控组件

在大多数情况下，我们推荐使用 [受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components) 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据。

例如，下面的代码使用非受控组件接受一个表单的值：

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

### (1) 默认值

在 React 渲染生命周期时，表单元素上的 `value` 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 `defaultValue` 属性，而不是 `value`。

```javascript
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` 支持 `defaultValue`。

### (2) 文件输入

在 HTML 中，`<input type="file">` 可以让用户选择一个或多个文件上传到服务器，或者通过使用 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行操作。

在 React 中，`<input type="file">` 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

您应该使用 File API 与文件进行交互。下面的例子显示了如何创建一个 [DOM 节点的 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 从而在提交表单时获取文件的信息。

```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<FileInput />, document.getElementById('root'));
```

#十、TodoList

组件化开发 React todolist， 项目开发中的组件的基本目录结构基本上是这样的：

> /your-project
>
> - src
>   - …
>   - components
>     - YourComponentOne
>       - index.js/YourComponentOne.js
>     - YourComponentTwo
>       - index.js/YourComponentTwo.js
>     - index.js 用于导出组件

注意：一个组件只干一件事情 ，所以 TodoList 和 TodoItem 要做成两个组件，这样也方便于后期理解 shouldComponentUpdate

# 十一、组件的生命周期

React 中组件也有生命周期，也就是说也有很多钩子函数供我们使用, 组件的生命周期，我们会分为四个阶段，初始化、运行中、销毁、错误处理(16.3 之后)

## 1、初始化

在组件初始化阶段会执行

1. constructor

2. static getDerivedStateFromProps()

3. componentWillMount() / UNSAFE_componentWillMount()

4. render()

5. componentDidMount()

## 2、更新阶段

`props`或`state`的改变可能会引起组件的更新，组件重新渲染的过程中会调用以下方法：

1. componentWillReceiveProps() / UNSAFE_componentWillReceiveProps() 
2. static getDerivedStateFromProps()
3. shouldComponentUpdate() 
4. componentWillUpdate() / UNSAFE_componentWillUpdate() 
5. render() 
6. getSnapshotBeforeUpdate() 
7. componentDidUpdate()

## 3、卸载阶段

1. componentWillUnmount()

## 4、错误处理

1. componentDidCatch()

## 5、各生命周期详解

**(1) constructor(props)**

React 组件的构造函数在挂载之前被调用。在实现`React.Component`构造函数时，需要先在添加其他内容前，调用`super(props)`，用来将父组件传来的`props`绑定到这个类中，使用`this.props`将会得到。

官方建议不要在`constructor`引入任何具有副作用和订阅功能的代码，这些应当使用`componentDidMount()`。

`constructor`中应当做些初始化的动作，如：初始化`state`，将事件处理函数绑定到类实例上，但也不要使用`setState()`。如果没有必要初始化 state 或绑定方法，则不需要构造`constructor`，或者把这个组件换成纯函数写法。

当然也可以利用`props`初始化`state`，在之后修改`state`不会对`props`造成任何修改，但仍然建议大家提升状态到父组件中，或使用`redux`统一进行状态管理。

```jsx
constructor(props) {
  super(props);
  this.state = {
    isLiked: props.isLiked
  };
}
```

**(2) static getDerivedStateFromProps(nextProps, prevState)**

React 的 16.3 版本中对生命周期进行了较大的调整，这是为了开发者能正确地使用生命周期，避免误解其概念而造成反模式。

本节将重点介绍 getDerivedStateFromProps 这个生命周期。要注意的是，React 16.3 的版本中 getDerivedStateFromProps 的触发范围是和 16.4^ 是不同的，主要区别是在 `setState` 和 `forceUpdate` 时会不会触发，具体可以看这个[生命全周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) 。

可能的使用场景有两个：

- 无条件的根据 prop 来更新内部 state，也就是只要有传入 prop 值， 就更新 state
- 只有 prop 值和 state 值不同时才更新 state 值。

```js
注意：这个生命周期中不能使用this，因为这个生命周期是类的静态属性，类的静态属性的this指向这个类，而不是指向实例的组件对象
```

我们接下来看几个例子。

假设我们有个一个表格组件，它会根据传入的列表数据来更新视图。

```jsx
class Table extends React.Component {
    state = {
        list: []
    }
    static getDerivedStateFromProps (props, state) {
        return {
            list: props.list
        }
    }
    render () {
        .... // 展示 list
    }
}
```

上面的例子就是第一种使用场景，但是无条件从 prop 中更新 state，我们完全没必要使用这个生命周期，直接对 prop 值进行操作就好了，无需用 state 值类保存。

再看一个例子，这个例子是一个颜色选择器，这个组件能选择相应的颜色并显示，同时它能根据传入 prop 值显示颜色。

```jsx
Class ColorPicker extends React.Component {
    state = {
        color: '#000000'
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.color) {
            return {
                color: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```

现在我们可以这个颜色选择器来选择颜色，同时我们能传入一个颜色值并显示。但是这个组件有一个 bug，如果我们传入一个颜色值后，再使用组件内部的选择颜色方法，我们会发现颜色不会变化，一直是传入的颜色值。

这是使用这个生命周期的一个常见 bug。为什么会发生这个 bug 呢？在开头有说到，在 React 16.4^ 的版本中 `setState` 和 `forceUpdate` 也会触发这个生命周期，所以内部 state 变化后，又会走 getDerivedStateFromProps 方法，并把 state 值更新为传入的 prop。

接下里我们来修复这个 bug。

```jsx
Class ColorPicker extends React.Component {
    state = {
        color: '#000000',
        prevPropColor: ''
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.prevPropColor) {
            return {
                color: props.color
                prevPropColor: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```

通过保存一个之前 prop 值，我们就可以在只有 prop 变化时才去修改 state。这样就解决上述的问题。

这里小结下 getDerivedStateFromProps 方法使用的注意点：

- 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较。
- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。

我们应该谨慎地使用 getDerivedStateFromProps 这个生命周期。使用时要注意下面几点：

- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。
- 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较（这个 prop 值最好有唯一性，或者使用一个唯一性的 prop 值来专门比较）。
- 不使用 getDerivedStateFromProps，可以改成组件保持完全不可控模式，通过初始值和 key 值来实现 prop 改变 state 的情景。

**(3) componentWillMount() / UNSAFE_componentWillMount()**

`componentWillMount()`将在 React 未来版本(官方说法 17.0)中被弃用。`UNSAFE_componentWillMount()`在组件挂载前被调用，在这个方法中调用`setState()`不会起作用，是由于他在`render()`前被调用。

为了避免副作用和其他的订阅，官方都建议使用`componentDidMount()`代替。这个方法是用于在服务器渲染上的唯一方法。这个方法因为是在渲染之前被调用，也是惟一一个可以直接同步修改 state 的地方。

**(4) render()**

render()方法是必需的。当他被调用时，他将计算`this.props`和`this.state`，并返回以下一种类型：

- React 元素。通过 jsx 创建，既可以是 dom 元素，也可以是用户自定义的组件。
- 字符串或数字。他们将会以文本节点形式渲染到 dom 中。
- Portals。react 16 版本中提出的新的解决方案，可以使组件脱离父组件层级直接挂载在 DOM 树的任何位置。
- null，什么也不渲染
- 布尔值。也是什么都不渲染。

当返回`null`,`false`,`ReactDOM.findDOMNode(this)`将会返回 null，什么都不会渲染。

`render()`方法必须是一个纯函数，他不应该改变`state`，也不能直接和浏览器进行交互，应该将事件放在其他生命周期函数中。
如果`shouldComponentUpdate()`返回`false`，`render()`不会被调用。

**(5) componentDidMount**

`componentDidMount`在组件被装配后立即调用。初始化使得 DOM 节点应该进行到这里。

**通常在这里进行 ajax 请求**

如果要初始化第三方的 dom 库，也在这里进行初始化。只有到这里才能获取到真实的 dom.

**(6) componentWillReceiveProps()/UNSAFE_componentWillReceiveProps(nextProps)**

官方建议使用`getDerivedStateFromProps`函数代替`componentWillReceiveProps`。当组件挂载后，接收到新的`props`后会被调用。如果需要更新`state`来响应`props`的更改，则可以进行`this.props`和`nextProps`的比较，并在此方法中使用`this.setState()`。

如果父组件会让这个组件重新渲染，即使`props`没有改变，也会调用这个方法。

React 不会在组件初始化 props 时调用这个方法。调用`this.setState`也不会触发。

**(7) shouldComponentUpdate(nextProps, nextState)**

调用`shouldComponentUpdate`使 React 知道，组件的输出是否受`state`和`props`的影响。默认每个状态的更改都会重新渲染，大多数情况下应该保持这个默认行为。

在渲染新的`props`或`state`前，`shouldComponentUpdate`会被调用。默认为`true`。这个方法不会在初始化时被调用，也不会在`forceUpdate()`时被调用。返回`false`不会阻止子组件在`state`更改时重新渲染。

如果`shouldComponentUpdate()`返回`false`，`componentWillUpdate`,`render`和`componentDidUpdate`不会被调用。

> 官方并不建议在`shouldComponentUpdate()`中进行深度查询或使用`JSON.stringify()`，他效率非常低，并且损伤性能。

**(8) UNSAFE_componentWillUpdate(nextProps, nextState)**

在渲染新的`state`或`props`时，`UNSAFE_componentWillUpdate`会被调用，将此作为在更新发生之前进行准备的机会。这个方法不会在初始化时被调用。

_不能在这里使用 this.setState()_，也不能做会触发视图更新的操作。如果需要更新`state`或`props`，调用`getDerivedStateFromProps`。

**(9) getSnapshotBeforeUpdate(prevProps,prevState)**

在 react `render()`后的输出被渲染到 DOM 之前被调用。它使您的组件能够在它们被潜在更改之前捕获当前值（如滚动位置）。这个生命周期返回的任何值都将作为参数传递给 componentDidUpdate（）。

**(10) componentDidUpdate(prevProps, prevState, snapshot)**

在更新发生后立即调用`componentDidUpdate()`。此方法不用于初始渲染。当组件更新时，将此作为一个机会来操作 DOM。只要您将当前的 props 与以前的 props 进行比较（例如，如果 props 没有改变，则可能不需要网络请求），这也是做网络请求的好地方。

如果组件实现`getSnapshotBeforeUpdate()`生命周期，则它返回的值将作为第三个“快照”参数传递给`componentDidUpdate()`。否则，这个参数是`undefined`。

**(11) componentWillUnmount()**

在组件被卸载并销毁之前立即被调用。在此方法中执行任何必要的清理，例如使定时器无效，取消网络请求或清理在`componentDidMount`中创建的任何监听。

**(12) componentDidCatch(error, info)**

错误边界是 React 组件，可以在其子组件树中的任何位置捕获 JavaScript 错误，记录这些错误并显示回退 UI，而不是崩溃的组件树。错误边界在渲染期间，生命周期方法以及整个树下的构造函数中捕获错误。

如果类组件定义了此生命周期方法，则它将成错误边界。在它中调用`setState()`可以让你在下面的树中捕获未处理的 JavaScript 错误，并显示一个后备 UI。只能使用错误边界从意外异常中恢复; 不要试图将它们用于控制流程。

错误边界只会捕获树中下面组件中的错误。错误边界本身不能捕获错误。

## 6、PureComponent

`PureComponnet`里如果接收到的新属性或者是更改后的状态和原属性、原状态相同的话，就不会去重新 render 了
在里面也可以使用`shouldComponentUpdate`，而且。是否重新渲染以`shouldComponentUpdate`的返回值为最终的决定因素。

```jsx
import React, { PureComponent } from 'react'

class YourComponent extends PureComponent {
  ……
}
```

## 7、ref

React 提供的这个`ref`属性，表示为对组件真正实例的引用，其实就是`ReactDOM.render()`返回的组件实例,`ref`可以挂载到组件上也可以是 dom 元素上。

- 挂到组件(`class`声明的组件)上的 ref 表示对组件实例的引用。**不能**在函数式组件上使用 ref 属性，因为它们没有实例：
- 挂载到 dom 元素上时表示具体的 dom 元素节点。

在 React 最新的版本中，要使用`ref`, 需要使用`React.createRef`方法先生成一个`ref`。

```jsx
import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    // 创建inputRef
    this.inputRef = createRef();
  }
  componentDidMount() {
    console.log(this.inputRef.current); // <input type="text">
  }
  render() {
    return (
      <div>
        {/* 关联ref和dom */}
        <input type="text" ref={this.inputRef} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

# 十二、组件通信

**组件通信可分为**

父子组件通信 子父组件通信 非父子组件通信 跨组件通信 路由通信 多组件状态共享

## 1.父组件与子组件通信

- 父组件将自己的状态传递给子组件，子组件当做属性来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变

- 父组件利用`ref`对子组件做标记，通过调用子组件的方法以更改子组件的状态,也可以调用子组件的方法..
  ```jsx
  <Children ref={el=>this.childComp=el}></Children>
  <!-- 这时就可以通过this.childComp这个属性来访问子组件的方法或状态(this.childComp.state,this.childComp.method) -->
  ```

## 2.子组件与父组件通信

- 父组件将自己的某个方法传递给子组件，在方法里可以做任意操作，比如可以更改状态，子组件通过`this.props`接收到父组件的方法后调用。

## 3.跨组件通信

在 react 没有类似 vue 中的事件总线来解决这个问题，我们只能借助它们共同的父级组件来实现，将非父子关系装换成多维度的父子关系。react 提供了`context` api 来实现跨组件通信, React 16.3 之后的`context`api 较之前的好用。

实例，使用`context` 实现购物车中的加减功能

```jsx
// counterContext.js
import React, { Component, createContext } from 'react';

const { Provider, Consumer: CountConsumer } = createContext();

class CountProvider extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };
  }
  increaseCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  decreaseCount = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
  render() {
    return (
      <Provider
        value={{
          count: this.state.count,
          increaseCount: this.increaseCount,
          decreaseCount: this.decreaseCount,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { CountProvider, CountConsumer };
```

```jsx
// 定义CountButton组件
const CountButton = (props) => {
  return (
    <CountConsumer>
      // consumer的children必须是一个方法
      {({ increaseCount, decreaseCount }) => {
        const { type } = props;
        const handleClick = type === 'increase' ? increaseCount : decreaseCount;
        const btnText = type === 'increase' ? '+' : '-';
        return <button onClick={handleClick}>{btnText}</button>;
      }}
    </CountConsumer>
  );
};
```

```jsx
// 定义count组件，用于显示数量
const Count = (prop) => {
  return (
    <CountConsumer>
      {({ count }) => {
        return <span>{count}</span>;
      }}
    </CountConsumer>
  );
};
```

```jsx
// 组合
class App extends Component {
  render() {
    return (
      <CountProvider>
        <CountButton type="decrease" />
        <Count />
        <CountButton type="increase" />
      </CountProvider>
    );
  }
}
```

> 复杂的非父子组件通信在 react 中很难处理，多组件间的数据共享也不好处理，在实际的工作中我们会使用 flux、redux、mobx 来实现

## 补充知识点

**nodejs 事件**

```js
import events from 'events'; //nodejs提供api
const envBus = events.EventEmitter.protoType;
envBus.on('fn', () => {}); //监听事件
envBus.emit('fn'); //抛出事件
```

# 十三、HOC(高阶组件)

Higher-Order Components 就是一个函数，传给它一个组件，它返回一个新的组件。

```jsx
const NewComponent = higherOrderComponent(YourComponent);
```

比如，我们想要我们的组件通过自动注入一个版权信息。

```jsx
// withCopyright.js 定义一个高阶组件
import React, { Component, Fragment } from 'react';

const withCopyright = (WrappedComponent) => {
  return class NewComponent extends Component {
    render() {
      return (
        <Fragment>
          <WrappedComponent />
          <div>&copy;版权所有 教育 2019 </div>
        </Fragment>
      );
    }
  };
};
export default withCopyright;
```

```jsx
// 使用方式
import withCopyright from './withCopyright';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Awesome React</h1>
        <p>React.js是一个构建用户界面的库</p>
      </div>
    );
  }
}
const CopyrightApp = withCopyright(App);
```

这样只要我们有需要用到版权信息的组件，都可以直接使用 withCopyright 这个高阶组件包裹即可。

在这里要讲解在 CRA 中配置装饰器模式的支持。

# 十四、Portal

Portals 提供了一个最好的在父组件包含的 DOM 结构层级外的 DOM 节点渲染组件的方法。

```javascript
ReactDOM.createPortal(child, container);
```

第一个参数 child 是可渲染的 react 子项，比如元素，字符串或者片段等。第二个参数 container 是一个 DOM 元素。

## 1、用法

普通的组件，子组件的元素将挂载到父组件的 DOM 节点中。

```javascript
render() {
  // React 挂载一个div节点，并将子元素渲染在节点中
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

有时需要将元素渲染到 DOM 中的不同位置上去，这是就用到的 portal 的方法。

```javascript
render(){
    // 此时React不再创建div节点，而是将子元素渲染到Dom节点上。domNode，是一个有效的任意位置的dom节点。
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    )
}
```

一个典型的用法就是当父组件的 dom 元素有 `overflow:hidden`或者`z-inde`样式，而你又需要显示的子元素超出父元素的盒子。举例来说，如对话框，悬浮框，和小提示。

## 2、在 protal 中的事件冒泡

虽然通过 portal 渲染的元素在父组件的盒子之外，但是渲染的 dom 节点仍在 React 的元素树上，在那个 dom 元素上的点击事件仍然能在 dom 树中监听到。

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const getDiv = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    return div;
};

const withPortal = (WrappedComponent) => {
    class AddPortal extends Component {
        constructor(props) {
            super(props);
            this.el = getDiv();
        }

        componentWillUnmount() {
            document.body.removeChild(this.el);
        }

        render(props) {
            return ReactDOM.createPortal(<WrappedComponent {...props} />, this.el);
        }
    }
    return AddPortal;
};

class Modal extends Component {
    render() {
        return (
            <div>
                <div>amodal content</div>
                <button type="button">Click</button>
            </div>
        );
    }
}

const PortalModal = withPortal(Modal);

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { clicks: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            clicks: state.clicks + 1
        }));
    }


    render() {
        return (
            <div onClick={this.handleClick}>
                <h3>ppppppppp</h3>
                <h3>num: {this.state.clicks}</h3>
                <PortalModal />
            </div>
        );
    }
}

export default Page;
```

# 十五、状态管理

##1、传统 MVC 框架的缺陷

**什么是 MVC？**

![image-20190420010944626](./images/mvc-base.png)

`MVC`的全名是`Model View Controller`，是模型(model)－视图(view)－控制器(controller)的缩写，是一种软件设计典范。

`V`即 View 视图是指用户看到并与之交互的界面。

`M`即 Model 模型是管理数据 ，很多业务逻辑都在模型中完成。在 MVC 的三个部件中，模型拥有最多的处理任务。

`C`即 Controller 控制器是指控制器接受用户的输入并调用模型和视图去完成用户的需求，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

**MVC 只是看起来很美**

MVC 框架的数据流很理想，请求先到 Controller, 由 Controller 调用 Model 中的数据交给 View 进行渲染，但是在实际的项目中，又是允许 Model 和 View 直接通信的。然后就出现了这样的结果：

![image-20190420012010718](./images/defect-of-mvc.png)

##2、Flux

在 2013 年，Facebook 让`React`亮相的同时推出了 Flux 框架，`React`的初衷实际上是用来替代`jQuery`的，`Flux`实际上就可以用来替代`Backbone.js`，`Ember.js`等一系列`MVC`架构的前端 JS 框架。

其实`Flux`在`React`里的应用就类似于`Vue`中的`Vuex`的作用，但是在`Vue`中，`Vue`是完整的`mvvm`框架，而`Vuex`只是一个全局的插件。

`React`只是一个 MVC 中的 V(视图层)，只管页面中的渲染，一旦有数据管理的时候，`React`本身的能力就不足以支撑复杂组件结构的项目，在传统的`MVC`中，就需要用到 Model 和 Controller。Facebook 对于当时世面上的`MVC`框架并不满意，于是就有了`Flux`, 但`Flux`并不是一个`MVC`框架，他是一种新的思想。

![image-20190420012450223](./images/flux.png)

- View： 视图层
- ActionCreator（动作创造者）：视图层发出的消息（比如 mouseClick）
- Dispatcher（派发器）：用来接收 Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒 Views 要更新页面

Flux 的流程：

1. 组件获取到 store 中保存的数据挂载在自己的状态上
2. 用户产生了操作，调用 actions 的方法
3. actions 接收到了用户的操作，进行一系列的逻辑代码、异步操作
4. 然后 actions 会创建出对应的 action，action 带有标识性的属性
5. actions 调用 dispatcher 的 dispatch 方法将 action 传递给 dispatcher
6. dispatcher 接收到 action 并根据标识信息判断之后，调用 store 的更改数据的方法
7. store 的方法被调用后，更改状态，并触发自己的某一个事件
8. store 更改状态后事件被触发，该事件的处理程序会通知 view 去获取最新的数据

## 3、Redux

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。有两个方面，它没涉及。

- 代码结构
- 组件之间的通信

2013 年 Facebook 提出了 Flux 架构的思想，引发了很多的实现。2015 年，Redux 出现，将 Flux 与[函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)结合一起，很短时间内就成为了最热门的前端架构。

如果你不知道是否需要 Redux，那就是不需要它

只有遇到 React 实在解决不了的问题，你才需要 Redux

简单说，如果你的 UI 层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

**需要使用 Redux 的项目:**

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了 WebSocket
- View 要从多个来源获取数据

**从组件层面考虑，什么样子的需要 Redux：**

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

**Redux 的设计思想：**

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面（唯一数据源）。

> 注意：flux、redux 都不是必须和 react 搭配使用的，因为 flux 和 redux 是完整的架构，在学习 react 的时候，只是将 react 的组件作为 redux 中的视图层去使用了。

**Redux 的使用的三大原则：**

- Single Source of Truth(唯一的数据源)
- State is read-only(状态是只读的)
- Changes are made with pure function(数据的改变必须通过纯函数完成)

什么叫纯函数：如果相同的入参，必有相同的返回值，不能改变入参

### (1) 自己实现 Redux

这个部分，不使用 react，直接使用原生的 html/js 来写一个简易的的 redux

**基本的状态管理及数据渲染：**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Redux principle 01</title>
  </head>
  <body>
    <h1>redux principle</h1>
    <div class="counter">
      <span
        class="btn"
        onclick="dispatch({type: 'COUNT_DECREMENT', number: 10})"
        >-</span
      >
      <span class="count" id="count"></span>
      <span
        class="btn"
        id="add"
        onclick="dispatch({type: 'COUNT_INCREMENT', number: 10})"
        >+</span
      >
    </div>
    <script>
      // 定义一个计数器的状态
      const countState = {
        count: 10,
      };

      // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
      const changeState = (action) => {
        switch (action.type) {
          // 处理减
          case 'COUNT_DECREMENT':
            countState.count -= action.number;
            break;
          // 处理加
          case 'COUNT_INCREMENT':
            countState.count += action.number;
            break;
          default:
            break;
        }
      };

      // 定义一个方法用于渲染计数器的dom
      const renderCount = (state) => {
        const countDom = document.querySelector('#count');
        countDom.innerHTML = state.count;
      };

      // 首次渲染数据
      renderCount(countState);

      // 定义一个dispatch的方法，接收到动作之后，自动调用
      const dispatch = (action) => {
        changeState(action);
        renderCount(countState);
      };
    </script>
  </body>
</html>
```

**创建 createStore 方法**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Redux principle 02</title>
  </head>
  <body>
    <h1>redux principle</h1>
    <div class="counter">
      <span
        class="btn"
        onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})"
        >-</span
      >
      <span class="count" id="count"></span>
      <span
        class="btn"
        id="add"
        onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})"
        >+</span
      >
    </div>
    <script>
      // 定义一个方法，用于集中管理state和dispatch
      const createStore = (state, changeState) => {
        // getState用于获取状态
        const getState = () => state;

        // 定义一个监听器，用于管理一些方法
        const listeners = [];
        const subscribe = (listener) => listeners.push(listener);

        // 定义一个dispatch方法，让每次有action传入的时候返回render执行之后的结果
        const dispatch = (action) => {
          // 调用changeState来处理数据
          changeState(state, action);
          // 让监听器里的所以方法运行
          listeners.forEach((listener) => listener());
        };
        return {
          getState,
          dispatch,
          subscribe,
        };
      };
      // 定义一个计数器的状态
      const countState = {
        count: 10,
      };
      // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
      const changeState = (state, action) => {
        switch (action.type) {
          // 处理减
          case 'COUNT_DECREMENT':
            state.count -= action.number;
            break;
          // 处理加
          case 'COUNT_INCREMENT':
            state.count += action.number;
            break;
          default:
            break;
        }
      };

      // 创建一个store
      const store = createStore(countState, changeState);
      // 定义一个方法用于渲染计数器的dom
      const renderCount = () => {
        const countDom = document.querySelector('#count');
        countDom.innerHTML = store.getState().count;
      };
      // 初次渲染数据
      renderCount();
      // 监听，只要有dispatch，这个方法就会自动运行
      store.subscribe(renderCount);
    </script>
  </body>
</html>
```

**让 changeState 方法变为一个纯函数**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Redux principle 03</title>
  </head>
  <body>
    <h1>redux principle</h1>
    <div class="counter">
      <span
        class="btn"
        onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})"
        >-</span
      >
      <span class="count" id="count"></span>
      <span
        class="btn"
        id="add"
        onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})"
        >+</span
      >
    </div>
    <script>
      // 定义一个方法，用于集中管理state和dispatch
      const createStore = (state, changeState) => {
        // getState用于获取状态
        const getState = () => state;

        // 定义一个监听器，用于管理一些方法
        const listeners = [];
        const subscribe = (listener) => listeners.push(listener);

        // 定义一个dispatch方法，让每次有action传入的时候返回render执行之后的结果
        const dispatch = (action) => {
          // 调用changeState来处理数据
          state = changeState(state, action);
          // 让监听器里的所有方法运行
          listeners.forEach((listener) => listener());
        };
        return {
          getState,
          dispatch,
          subscribe,
        };
      };
      // 定义一个计数器的状态
      const countState = {
        count: 10,
      };
      // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
      const changeState = (state, action) => {
        switch (action.type) {
          // 处理减
          case 'COUNT_DECREMENT':
            return {
              ...state,
              count: state.count - action.number,
            };
          // 处理加
          case 'COUNT_INCREMENT':
            return {
              ...state,
              count: state.count + action.number,
            };
          default:
            return state;
        }
      };

      // 创建一个store
      const store = createStore(countState, changeState);
      // 定义一个方法用于渲染计数器的dom
      const renderCount = () => {
        const countDom = document.querySelector('#count');
        countDom.innerHTML = store.getState().count;
      };
      // 初次渲染数据
      renderCount();
      // 监听，只要有dispatch，这个方法就会自动运行
      store.subscribe(renderCount);
    </script>
  </body>
</html>
```

**合并 state 和 changeState(最终版)**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Redux principle 04</title>
  </head>
  <body>
    <h1>redux principle</h1>
    <div class="counter">
      <span
        class="btn"
        onclick="store.dispatch({type: 'COUNT_DECREMENT', number: 10})"
        >-</span
      >
      <span class="count" id="count"></span>
      <span
        class="btn"
        id="add"
        onclick="store.dispatch({type: 'COUNT_INCREMENT', number: 10})"
        >+</span
      >
    </div>
    <script>
      // 定义一个方法，用于集中管理state和dispatch, changeState改名了，专业的叫法是reducer
      const createStore = (reducer) => {
        // 定义一个初始的state
        let state = null;
        // getState用于获取状态
        const getState = () => state;

        // 定义一个监听器，用于管理一些方法
        const listeners = [];
        const subscribe = (listener) => listeners.push(listener);

        // 定义一个dispatch方法，让每次有action传入的时候返回reducer执行之后的结果
        const dispatch = (action) => {
          // 调用reducer来处理数据
          state = reducer(state, action);
          // 让监听器里的所有方法运行
          listeners.forEach((listener) => listener());
        };
        //  初始化state
        dispatch({});
        return {
          getState,
          dispatch,
          subscribe,
        };
      };
      // 定义一个计数器的状态
      const countState = {
        count: 10,
      };
      // 定一个方法叫changeState，用于处理state的数据，每次都返回一个新的状态
      const changeState = (state, action) => {
        // 如果state是null, 就返回countState
        if (!state) return countState;
        switch (action.type) {
          // 处理减
          case 'COUNT_DECREMENT':
            return {
              ...state,
              count: state.count - action.number,
            };
          // 处理加
          case 'COUNT_INCREMENT':
            return {
              ...state,
              count: state.count + action.number,
            };
          default:
            return state;
        }
      };

      // 创建一个store
      const store = createStore(changeState);
      // 定义一个方法用于渲染计数器的dom
      const renderCount = () => {
        const countDom = document.querySelector('#count');
        countDom.innerHTML = store.getState().count;
      };
      // 初次渲染数据
      renderCount();
      // 监听，只要有dispatch，renderCount就会自动运行
      store.subscribe(renderCount);
    </script>
  </body>
</html>
```

###(2) 使用 Redux 框架

**Redux 的流程：**

![image-20190420013410981](./images/redux.png)

- store 通过 reducer 创建了初始状态

- view 通过 store.getState()获取到了 store 中保存的 state 挂载在了自己的状态上

- 用户产生了操作，调用了 actions 的方法

- actions 的方法被调用，创建了带有标示性信息的 action

- actions 将 action 通过调用 store.dispatch 方法发送到了 reducer 中

- reducer 接收到 action 并根据标识信息判断之后返回了新的 state

- store 的 state 被 reducer 更改为新 state 的时候，store.subscribe 方法里的回调函数会执行，此时就可以通知 view 去重新获取 state

**Reducer 必须是一个纯函数：**

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。Reducer 不是只有 Redux 里才有，之前学的数组方法`reduce`, 它的第一个参数就是一个 reducer

纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数

- 不能调用系统 I/O 的 API

- 不能调用 Date.now()或者 Math.random()等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```js
// State 是一个对象
function reducer(state = defaultState, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state = defaultState, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变(immutable)的对象。

我们可以通过在 createStore 中传入第二个参数来设置默认的 state，但是这种形式只适合于只有一个 reducer 的时候。

**划分 reducer**:

因为一个应用中只能有一个大的 state，这样的话 reducer 中的代码将会特别特别的多，那么就可以使用 combineReducers 方法将已经分开的 reducer 合并到一起

> 注意：
>
> 1. 分离 reducer 的时候，每一个 reducer 维护的状态都应该不同
> 2. 通过 store.getState 获取到的数据也是会按照 reducers 去划分的
> 3. 划分多个 reducer 的时候，默认状态只能创建在 reducer 中，因为划分 reducer 的目的，就是为了让每一个 reducer 都去独立管理一部分状态

_最开始一般基于计数器的例子讲解 redux 的基本使用即可_。

关于 action/reducer/store 的更多概念，请查看[官网](https://www.redux.org.cn/)

**Redux 异步**

通常情况下，action 只是一个对象，不能包含异步操作，这导致了很多创建 action 的逻辑只能写在组件中，代码量较多也不便于复用，同时对该部分代码测试的时候也比较困难，组件的业务逻辑也不清晰，使用中间件了之后，可以通过 actionCreator 异步编写 action，这样代码就会拆分到 actionCreator 中，可维护性大大提高，可以方便于测试、复用，同时 actionCreator 还集成了异步操作中不同的 action 派发机制，减少编码过程中的代码量

常见的异步库：

- Redux-thunk
- Redux-saga
- Redux-effects
- Redux-side-effects
- Redux-loop
- Redux-observable
- …

基于 Promise 的异步库：

- Redux-promise
- Redux-promises
- Redux-simple-promise
- Redux-promise-middleware
- …

### (3) 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

|                | 展示组件                   | 容器组件                           |
| -------------: | :------------------------- | :--------------------------------- |
|           作用 | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux | 否                         | 是                                 |
|       数据来源 | props                      | 监听 Redux state                   |
|       数据修改 | 从 props 调用回调函数      | 向 Redux 派发 actions              |
|       调用方式 | 手动                       | 通常由 React Redux 生成            |

### (4) 使用 react-redux

可以先结合`context`来手动连接 react 和 redux。

react-redux 提供两个核心的 api：

- Provider: 提供 store
- connect: 用于连接容器组件和展示组件

  - Provider

    根据单一 store 原则 ，一般只会出现在整个应用程序的最顶层。

  - connect

    语法格式为

    `connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(component)`

    一般来说只会用到前面两个，它的作用是：

    - 把`store.getState()`的状态转化为展示组件的`props`
    - 把`actionCreators`转化为展示组件`props`上的方法

> 特别强调：
>
> 官网上的第二个参数为 mapDispatchToProps, 实际上就是 actionCreators

只要上层中有`Provider`组件并且提供了`store`, 那么，子孙级别的任何组件，要想使用`store`里的状态，都可以通过`connect`方法进行连接。如果只是想连接`actionCreators`，可以第一个参数传递为`null`

# 十六、React Router

React Router 现在的版本是 5, 于 2019 年 3 月 21 日搞笑的发布，[搞笑的官网链接](https://reacttraining.com/blog/react-router-v5/)， 本来是要发布 4.4 的版本的，结果成了 5。从 4 开始，使用方式相对于之前版本的思想有所不同。之前版本的思想是传统的思想：**路由应该统一在一处渲染**， Router 4 之后是这样的思想：**一切皆组件**

React Router 包含了四个包:

| 包名                                                                                                            | Description                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`react-router`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router)               | React Router 核心 api                                                                               |
| [`react-router-dom`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom)       | React Router 的 DOM 绑定，在浏览器中运行不需要额外安装`react-router`                                |
| [`react-router-native`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-native) | [React Native](https://facebook.github.io/react-native/) 中使用，而实际的应用中，其实不会使用这个。 |
| [`react-router-config`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config) | 静态路由的配置                                                                                      |

主要使用`react-router-dom`

## 1、使用方式

正常情况下，直接按照[官网](https://reacttraining.com/react-router/web/guides/quick-start)的 demo 就理解 路由的使用方式，有几个点需要特别的强调：

- Route 组件的 exact 属性

`exact`属性标识是否为严格匹配， 为`true`是表示严格匹配，为`false`时为正常匹配。

- Route 组件的 render 属性而不是 component 属性

怎么在渲染组件的时候，对组件传递属性呢？使用`component`的方式是不能直接在组件上添加属性的。所以，React Router 的`Route`组件提供了另一种渲染组件的方式 `render`, 这个常用于页面组件级别的权限管理。

- 路由的参数传递与获取

- Switch 组件

总是渲染第一个匹配到的组件

- 处理 404 与默认页

- withRoute 高阶组件的使用
- 管理一个项目路由的方法
- [code spliting](https://reacttraining.com/react-router/web/guides/code-splitting)
- HashRouter 和 BrowserRouter 的区别，前端路由和后端路由的区别。这个在 Vue 里应该有讲过了。

## 2、React Router 基本原理

React Router 甚至大部分的前端路由都是依赖于[`history.js`](https://github.com/browserstate/history.js)的，它是一个独立的第三方 js 库。可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的 API。

- 老浏览器的 history: 通过`hash`来存储在不同状态下的`history`信息，对应`createHashHistory`，通过检测`location.hash`的值的变化，使用`location.replace`方法来实现 url 跳转。通过注册监听`window`对象上的`hashChange`事件来监听路由的变化，实现历史记录的回退。
- 高版本浏览器: 利用 HTML5 里面的 history，对应`createBrowserHistory`, 使用包括`pushState`， `replaceState`方法来进行跳转。通过注册监听`window`对象上的`popstate`事件来监听路由的变化，实现历史记录的回退。
- node 环境下: 在内存中进行历史记录的存储，对应`createMemoryHistory`。直接在内存里`push`和`pop`状态。

# 十七、Immutable.js

## 1、JavaScript 数据修改的问题

看一段大家熟悉的代码

```js
const state = {
  str: '教育',
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = state;

console.log(newState === state); // true
```

由于 js 的对象和数组都是引用类型。所以 newState 的 state 实际上是指向于同一块内存地址的, 所以结果是 newState 和 state 是相等的。

尝试修改一下数据

```js
const state = {
  str: '教育',
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = state;

newState.str = '教育H5学院';

console.log(state.str, newState.str);
```

可以看到，newState 的修改也会引起 state 的修改。要解决这个问题，js 中提供了另一种修改数据的方式，要修改一个数据之前先制作一份数据的拷贝，像这样

```js
const state = {
  str: '教育',
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = Object.assign({}, state);

newState.str = '教育H5学院';

console.log(state.str, newState.str);
```

我们可以使用很多方式在 js 中复制数据，比如`…`, `Object.assign`, `Object.freeze`, `slice`, `concat`, `map`, `filter`, `reduce`等方式进行复制，但这些都是浅拷贝，就是只拷贝第一层数据，更深层的数据还是同一个引用，比如：

```js
const state = {
  str: '教育',
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = Object.assign({}, state);

newState.obj.y = 2;
newState.arr.push(4);

console.log(state, newState);
```

可以看到，当在更改 newState 更深层次的数据的时候，还是会影响到 state 的值。如果要深层复制，就得一层一层的做递归拷贝，这是一个复杂的问题。虽然有些第三方的库已经帮我们做好了，比如`lodash`的`cloneDeep`方法。深拷贝是非常消耗性能的。

```js
import { cloneDeep } from 'lodash';

const state = {
  str: '教育',
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = cloneDeep(state);

newState.obj.y = 2;
newState.arr.push(4);

console.log(state, newState);
```

## 2、什么是不可变数据

不可变数据 (Immutable Data )就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是持久化数据结构（ Persistent Data Structure），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的 s 性能损耗，Immutable 使用了 结构共享（Structural Sharing），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

![react](./images/structure-sharing.png)

## 3、immutable.js 的优缺点

**优点：**

- 降低 mutable 带来的复杂度
- 节省内存
- 历史追溯性（时间旅行）：时间旅行指的是，每时每刻的值都被保留了，想回退到哪一步只要简单的将数据取出就行，想一下如果现在页面有个撤销的操作，撤销前的数据被保留了，只需要取出就行，这个特性在 redux 或者 flux 中特别有用
- 拥抱函数式编程：immutable 本来就是函数式编程的概念，纯函数式编程的特点就是，只要输入一致，输出必然一致，相比于面向对象，这样开发组件和调试更方便。推荐一本函数式编程的在线免费书《[JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)》, 此书可以推荐给学生做为课外补充阅读。

**缺点：**

- 需要重新学习 api
- 资源包大小增加（源码 5000 行左右）
- 容易与原生对象混淆：由于 api 与原生不同，混用的话容易出错。

## 4、使用 Immutable.js

参考[官网](https://immutable-js.github.io/immutable-js/)重点讲解数据不可变数据的创建、更新及比较方式 。对于就业班来说，掌握以下知识点即可。

安装 immutable.js yarn add immutable

**01-get-started**

```javascript
const { Map } = require('immutable')
const map1 = Map({
  a: 1,
  b: 2,
  c: 3
})

const map2 = map1.set('b', 50)
console.log(map1.get('b') + ' vs. ' + map2.get('b'))

*// 2 vs. 50*
```

**02-case-for-immutability-1.js**

```javascript
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });

console.log(map1.equals(map2));
console.log(map1 == map2);
console.log(map1 === map2);

// true
// false
// false
```

**02-case-for-immutability-2.js**

```javascript
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 2);

console.log(map1.equals(map2));
console.log(map1 == map2);
console.log(map1 === map2);

// true
// true
// true
```

**02-case-for-immutability-3.js**

```javascript
const { Map } = require('immutable');
const map = Map({ a: 1, b: 2, c: 3 });
const mapCopy = map;

console.log(mapCopy.equals(map));

// true
```

**03-JavaScript-first-API-0.js**

```javascript
const { List } = require('immutable');

const list1 = List([1, 2]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);

console.log(list1.size === 2);
console.log(list2.size === 5);
console.log(list3.size === 6);
console.log(list4.size === 13);

// true
// true
// true
// true
```

**03-JavaScript-first-API-1.js**

```javascript
const { Map } = require('immutable');
const alpha = Map({ a: 1, b: 2, c: 3, d: 4 });
const upperCase = alpha.map((v, k) => k.toUpperCase()).join();

console.log(upperCase);
// A,B,C,D
```

**03-JavaScript-first-API-2.js**

```javascript
const { Map, List } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });

const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj);

console.log(map3);

// Map { "a": 20, "b": 2, "c": 10, "d": 100, "t": 30, "o": 200, "g": 300 }

const list1 = List([1, 2, 3]);
const list2 = List([4, 5, 6]);

const array = [7, 8, 9];
const list3 = list1.concat(list2, array);

console.log(list3);

// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

**03-JavaScript-first-API-3.js**

```javascript
const { Seq } = require('immutable');

const myObject = { a: 1, b: 2, c: 3 };
const seq = Seq(myObject).map((v) => v * v);

const seqToObject = seq.toObject();
console.log(seq, seqToObject);

// Seq { "a": 1, "b": 4, "c": 9 } { a: 1, b: 4, c: 9 }
```

**03-JavaScript-first-API-4.js**

```javascript
const { fromJS } = require('immutable')

const obj = { 1: 'one' }
console.log(Object.keys(obj)) *// [ '1' ]*
console.log(obj['1'], obj[1]) *// one one*

const map = fromJS(obj)
console.log(map.get('1'), map.get(1)) *// one undefined*
```

**03-JavaScript-first-API-5.js**

```javascript
const { Map, List } = require('immutable');

const deep = Map({ a: 1, b: 2, c: List([3, 4, 5]) });
console.log(deep.toObject());
console.log(deep.toArray());
console.log(deep.toJS());
console.log(JSON.stringify(deep));

// { a: 1, b: 2, c: List [ 3, 4, 5 ] }
// [ 1, 2, List [ 3, 4, 5 ] ]
// { a: 1, b: 2, c: [ 3, 4, 5 ] }
// {"a":1,"b":2,"c":[3,4,5]}
```

**03-JavaScript-first-API-6.js**

```javascript
const { Map, List } = require('immutable');

const mapped = Map({ a: 1, b: 2, c: 3 });
console.log(mapped.map((x) => x * x));
console.log(
  mapped.map(function (x) {
    return x * x;
  })
);

// Map { "a": 1, "b": 4, "c": 9 }
// Map { "a": 1, "b": 4, "c": 9 }

const aList = List([1, 2, 3]);
const anArray = [0, ...aList, 4, 5];
console.log(anArray);

// [ 0, 1, 2, 3, 4, 5 ]
```

**04-nested-structures.js**

```javascript
const { fromJS } = require('immutable');

const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });
console.log(nested);
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ] } } }

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
console.log(nested2);
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 6 } } }*

console.log(nested2.getIn(['a', 'b', 'd']));
// 6

const nested3 = nested2.updateIn(['a', 'b', 'd'], (value) => value + 1);
console.log(nested3);
// Map { "a": Map { "b": Map { "c": "List [ 3, 4, 5 ]1", "d": 7 } } }

// setIn 和 updateIn 都可以修改深层次的Immutable对象，setIn 直接传值，updateIn 传入回调函数
const nested4 = nested3.updateIn(['a', 'b', 'c'], (list) => list.push(6));
console.log(nested4);
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5, 6 ], "d": 7 } } }

const nested5 = nested4.setIn(['a', 'b', 'd'], 90);

console.log(nested5);
console.log(nested);
console.log(nested2);
console.log(nested3);
console.log(nested4);

// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ] } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 6 } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ], "d": 7 } } }
// Map { "a": Map { "b": Map { "c": List [ 3, 4, 5, 6 ], "d": 7 } } }
```

**05-Equality-treats-Collections-as-Values-0.js**

```javascript
const { Map, is } = require('immutable');

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 1, b: 2, c: 3 };
console.log(obj1 !== obj2);
// true

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });

console.log(map1 !== map2);
console.log(map1.equals(map2));
console.log(is(map1, map2));

// true
// true
// true
```

**05-Equality-treats-Collections-as-Values-1.js**

```javascript
const { Map, Set } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
const set = Set().add(map1);

console.log(set.has(map2));

// true
```

**05-Equality-treats-Collections-as-Values-2.js**

```javascript
const { Map } = require('immutable');

const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set('b', 2);
console.log(updatedMap === originalMap)

*// true*
```

**05-Equality-treats-Collections-as-Values-3.js**

```javascript
const { Map, is } = require('immutable');

const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set('b', 1000);
console.log(updatedMap !== originalMap);
// true

const anotherUpdatedMap = originalMap.set('b', 1000);
console.log(anotherUpdatedMap !== updatedMap);
console.log(anotherUpdatedMap.equals(updatedMap));
console.log(is(anotherUpdatedMap, updatedMap));
// true
// true
// true
```

**06-Batching-Mutations.js**

```javascript
const { List } = require('immutable');

const list1 = List([1, 2, 3]);
const list2 = list1.withMutations(function (list) {
  list.push(4).push(5).push(6);
});

console.log(list1.size === 3);
console.log(list2.size === 6);
// true
// true

let map2 = map1.withMutations((map) => {
  // 逻辑
  map.setIn(['c', 'd'], 9);
  map.set('a', 1);
});

let map3 = map1.updateIn(['c', 'd'], (v) => {
  return 9;
});

console.log(map1 === map3);
```

**07-Lazy-Seq-0.js**

```javascript
const { Seq } = require('immutable');

const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter((x) => {
    console.log('filter x:' + x);
    return x % 2 !== 0;
  })
  .map((x) => {
    console.log('map x:' + x);
    return x * x;
  });

console.log(oddSquares.get(1));

// filter x:1
// filter x:2
// filter x:3
// map x:3

// 9
```

**07-Lazy-Seq-1.js**

```javascript
const { Seq, Map } = require('immutable');

const map = Map({ a: 1, b: 2, c: 3 });
const lazySeq = Seq(map);
const newMap = lazySeq
  .flip()
  .map((key) => key.toUpperCase())
  .flip();

console.log(newMap);

// Seq { A: 1, B: 1, C: 1 }
```

**07-Lazy-Seq-2.js**

```javascript
const { Range } = require('immutable');

const aRange = Range(1, Infinity)
  .skip(1000)
  .map((n) => -n)
  .filter((n) => n % 2 === 0)
  .take(2)
  .reduce((r, n) => r * n, 1);

console.log(aRange);

// 1006008
```

## 5、在 redux 中使用 immutable.js

[redux 官网](https://redux.js.org/recipes/using-immutablejs-with-redux)推荐使用[redux-immutable](https://www.npmjs.com/package/redux-immutable)进行 redux 和 immutable 的集成。几个注意点：

`redux`中，利用`combineReducers`来合并多个`reduce`, `redux`自带的`combineReducers`只支持原生 js 形式的，所以需要使用`redux-immutable`提供的`combineReducers`来代替

```js
// 使用redux-immutable提供的combineReducers方法替换redux里的combineReducers
import { combineReducers } from 'redux-immutable';
import reducerOne from './reducerOne';
import reducerTwo from './reducerTwo';

const rootReducer = combineReducers({
  reducerOne,
  reducerTwo,
});

export default rootReducer;
```

`reducer`中的`initialState`也需要初始化成`immutable`类型, 比如一个 counter 的 reducer

```js
import { Map } from 'immutable';

import ActionTypes from '../actions';

const initialState = Map({
  count: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREAMENT:
      return state.set('count', state.get('count') + 1); // 使用set或setIn来更改值, get或者getIn来取值
    case ActionTypes.DECREAMENT:
      return state.set('count', state.get('count') - 1);
    default:
      return state;
  }
};
```

`state`成为了`immutable`类型，`connect`的`mapStateToProp`也需要相应的改变

```js
const mapStateToProps = (state) => ({
  count: state.getIn(['counter', 'count']), // 永远不要在mapStateToProps里使用`toJS`方法，因为它永远返回一个新的对象
});
```

在`shouldComponentUpdate`里就可以使用`immutable.is`或者`instance.equals`来进行数据的对比了。

# 十八、Lazy 和 Suspense

## 1、React.lazy 定义

`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。

什么意思呢？其实就是懒加载。其原理就是利用`es6 import()`函数。这个`import`不是`import命令`。同样是引入模块，`import命令`是同步引入模块，而`import()`函数动态引入。

当 Webpack 解析到该语法时，它会自动地开始进行代码分割(Code Splitting)，分割成一个文件，当使用到这个文件的时候会这段代码才会被异步加载。

### (1) 为什么代码要分割

当你的程序越来越大，代码量越来越多。一个页面上堆积了很多功能，也许有些功能很可能都用不到，但是一样下载加载到页面上，所以这里面肯定有优化空间。就如图片懒加载的理论。

### (2) import 函数

javascript

```javascript
//import 命令
import { add } from './math';

console.log(add(16, 26));

//import函数
import('./math').then((math) => {
  console.log(math.add(16, 26));
});
```

> 动态 `import()` 语法目前只是一个 ECMAScript (JavaScript) 提案， 而不是正式的语法标准。预计在不远的将来就会被正式接受。http://es6.ruanyifeng.com/#docs/module#import

### (3) import 函数示例

下面是 import 一个示例：

在 test 文件夹下新建两个文件

![图片1](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/1.png)

**图片 1：**

test.html 代码如下:

```html
<div id="root">页面无内容</div>
<button id="btn">加载js</button>

<script>
  document.getElementById('btn').onclick = function () {
    import('./test.js').then((d) => {
      d.test();
    });
  };
</script>
```

test.js 代码如下:

```javascript
function test() {
  document.getElementById('root');
  root.innerHTML = '页面变的有内容了';
}
export { test };
```

![图片2](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/2.png)

**图片 2**

这时候打开 web 服务让页面以 http 的方式访问，http://192.168.1.2:8080/test.html

我们在 chrome 的开发者工具下的 Network 可以看到只请求了一个页面。

![图片3](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/3.png)

**图片 3**

但是当我们点击加载 js，你会发现 test.js 会以动态的方式加入到代码中,同时执行了 test 函数，使页面的内容发生了变化。

![图片4](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/4.png)

**图片 4**

在`React.lazy`和常用的三方包`react-loadable`，都是使用了这个原理，然后配合 webpack 进行代码打包拆分达到异步加载，这样首屏渲染的速度将大大的提高。

由于`React.lazy`不支持服务端渲染，所以这时候`react-loadable`就是不错的选择。

## 2、如何使用 React.lazy

下面示例代码使用 create-react-app 脚手架搭建：

```jsx
//OtherComponent.js 文件内容

import React from 'react'
const OtherComponent = ()=>{
  return (
    <div>
      我已加载
    </div>
  )
}
export default OtherComponent

// App.js 文件内容
import React from 'react';
import './App.css';
//使用React.lazy导入OtherComponent组件
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function App() {
  return (
    <div className="App">
      <OtherComponent/>
    </div>
  );
}
export default App;
```

这是最简单的`React.lazy`，但是这样页面会报错。这个报错提示我们，在 React 使用了`lazy`之后，会存在一个加载中的空档期，React 不知道在这个空档期中该显示什么内容，所以需要我们指定。接下来就要使用到`Suspense`。

![图片5](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/5.png)

**图片 5**

### (1) Suspense

如果在 `App` 渲染完成后，包含 `OtherComponent` 的模块还没有被加载完成，我们可以使用加载指示器为此组件做优雅降级。这里我们使用 `Suspense` 组件来解决。

这里将`App`组件改一改

```jsx
import React, { Suspense, Component } from 'react';
import './App.css';
//使用React.lazy导入OtherComponent组件
const OtherComponent = React.lazy(() => import('./OtherComponent'));
export default class App extends Component {
  state = {
    visible: false,
  };
  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          加载OtherComponent组件
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.visible ? <OtherComponent /> : null}
        </Suspense>
      </div>
    );
  }
}
```

我们指定了空档期使用 Loading 展示在界面上面，等`OtherComponent`组件异步加载完毕，把`OtherComponent`组件的内容替换掉 Loading 上。

![图片6](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/6.gif)

**图片 6**

![图片7](https://cllxx.cn/2019/07/09/react-xin-te-xing-lazy-he-suspense-er/7.png)

**图片 7**

为了演示我把 chrome 网络调到`lower-end mobile`，不然看不到 loading 出现。

可以从上面图片看出，当点击加载的时候,页面的 head 会插入``这段代码，发出一个get请求，页面开始显示loading，去请求`2.chunk.js`文件。

请求结束返回内容就是`OtherComponent`组件的内容,只是文件名称和文件内容经过 webpack 处理过。

> 注意：`Suspense`使用的时候，`fallback`一定是存在且有内容的， 否则会报错。

# 十九、React Hooks

在 React 的世界中，有容器组件和 UI 组件之分，在 React Hooks 出现之前，UI 组件我们可以使用函数，无状态组件来展示 UI，而对于容器组件，函数组件就显得无能为力，我们依赖于类组件来获取数据，处理数据，并向下传递参数给 UI 组件进行渲染。在我看来，使用 React Hooks 相比于从前的类组件有以下几点好处：

1. 代码可读性更强，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，容易使开发者不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护
2. 组件树层级变浅，在原本的代码中，我们经常使用 HOC/render props 等方式来复用组件的状态，增强功能等，无疑增加了组件树层数及渲染，而在 React Hooks 中，这些功能都可以通过强大的自定义的 Hooks 来实现

React 在 v16.8 的版本中推出了 React Hooks 新特性，虽然社区还没有最佳实践如何基于 React Hooks 来打造复杂应用(至少我还没有)，凭借着阅读社区中大量的关于这方面的文章，下面我将通过十个案例来帮助你认识理解并可以熟练运用 React Hooks 大部分特性。

3.  注意事项

    (1). 不能将 hooks 放在循环、条件语句或者嵌套方法内。react 是根据 hooks 出现顺序来记录对应状态的，执行以上操作会打乱 hooks 顺序
    (2). 只在 function 组件和自定义 hooks 中使用 hooks。

4.  命名规范

    (1). 使用驼峰命名法，useState 返回数组的第二项以 set 开头（仅作为约定）。
    (2). 自定义 hooks 以 use 开头（可被 lint 校验）

5.  简释

6.  useState：就是类组件的 state，使得函数组件可以拥有类组件一样的状态
7.  useReducer：setState，同时 useState 也是该方法的封装
8.  useRef: refx
9.  useImperativeHandle: 给 ref 分配特定的属性
10. useContext: context，需配合 createContext 使用
11. useMemo: 可以对 setState 的优化
12. useCallback: useMemo 的变形，对函数进行优化
13. useEffect: 类似 componentDidMount/Update, componentWillUnmount，当效果为 componentDidMount/Update 时，总是在整个更新周期的最后（页面渲染完成后）才执行
14. useLayoutEffect: 用法与 useEffect 相同，区别在于该方法的回调会在数据更新完成后，页面渲染之前进行，该方法会阻碍页面的渲染
15. useDebugValue：用于在 React 开发者工具中显示自定义 hook 的标签

## 1、useState 保存组件状态

在类组件中，我们使用 `this.state` 来保存组件状态，并对其修改触发组件重新渲染。比如下面这个简单的计数器组件，很好诠释了类组件如何运行：

```js
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'alife',
    };
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        Count: {count}
        <button onClick={() => this.setState({ count: count + 1 })}>+</button>
        <button onClick={() => this.setState({ count: count - 1 })}>-</button>
      </div>
    );
  }
}
```

一个简单的计数器组件就完成了，而在函数组件中，由于没有 this 这个黑魔法，React 通过 useState 来帮我们保存组件的状态。

```js
import React, { useState } from 'react';
function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: 'alife',
  });
  return (
    <div className="App">
      Count: {obj.count}
      <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>
        +
      </button>
      <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>
        -
      </button>
    </div>
  );
}
```

通过传入 useState 参数后返回一个带有默认状态和改变状态函数的数组。通过传入新状态给函数来改变原本的状态值。**值得注意的是 useState 不帮助你处理状态，相较于 setState 非覆盖式更新状态，useState 覆盖式更新状态，需要开发者自己处理逻辑。(代码如上)**

似乎有个 useState 后，函数组件也可以拥有自己的状态了，但仅仅是这样完全不够。

## 2、useEffect 处理副作用

1.  useEffect 接收两个参数，第一个参数是一个回调函数，第二个参数是一个数组,数组里可以添加需要监听的变量（可选），无返回值
2.  useEffect 常用来处理副作用，代替一些常用的生命周期（副作用：和函数业务主逻辑关联不大，特定时间或事件中执行的动作，比如 Ajax 请求后端数据，添加登录监听和取消登录，手动修改 DOM 等等），一般用来代替 componentDidMounu,componentDidUpdate,componentWillUnmount 三个生命周期，但是和生命周期不同的是，useEffect 是异步执行的，不会阻碍页面的渲染，而生命周期是同步进行的
3.  第二个参数，如果不传，就会模拟 componentDidMount 和 componentDidUpdate 两个生命周期
    第二个参数数组里面如果传入参数状态变量们就会模拟 componentDidMount 和监听的状态变量发生变化时执行
    第二个参数如果传一个空数组[]，就会模拟 componentDidMount,hooks 中的 return 一个匿名函数部分会在 componentWillUnmount 中执行
4.  补充：
    useLayoutEffect(effect, array);
    与 useEffect 使用方法一样，只是执行回调函数的时机有着略微区别，运行时机更像是 componentDidMount 和 componentDidUpdate。但是要注意的是，该方法是同步方法，在浏览器 paint 之前执行，会阻碍浏览器 paint，只有当我们需要进行 DOM 的操作时才使用该函数（比如设定 DOM 布局尺寸，这样可以防抖动）。
    useEffect 与 useLayoutEffect:
    正常情况用默认的 useEffect 钩子就够了，这可以保证状态变更不阻塞渲染过程，但如果 effect 更新（清理）中涉及 DOM 更新操作，用 useEffect 就会有意想不到的效果，这时我们最好使用 useLayoutEffect 。
    比如逐帧动画 requestAnimationFrame ，需要保证同步变更。这也符合作者说到的 useEffect 的时期是非常晚，可以保证页面是稳定下来再做事情。
    钩子的执行顺序：​useLayoutEffect > requestAnimationFrame > useEffect​

函数组件能保存状态，但是对于异步请求，副作用的操作还是无能为力，所以 React 提供了 useEffect 来帮助开发者处理函数组件的副作用，在介绍新 API 之前，我们先来看看类组件是怎么做的：

```js
import React, { Component } from 'react';
class App extends Component {
  state = {
    count: 1,
  };
  componentDidMount() {
    const { count } = this.state;
    document.title = 'componentDidMount' + count;
    this.timer = setInterval(() => {
      this.setState(({ count }) => ({
        count: count + 1,
      }));
    }, 1000);
  }
  componentDidUpdate() {
    const { count } = this.state;
    document.title = 'componentDidMount' + count;
  }
  componentWillUnmount() {
    document.title = 'componentWillUnmount';
    clearInterval(this.timer);
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        Count:{count}
        <button onClick={() => clearInterval(this.timer)}>clear</button>
      </div>
    );
  }
}
```

在例子中，组件每隔一秒更新组件状态，并且每次触发更新都会触发 document.title 的更新(副作用)，而在组件卸载时修改 document.title（类似于清除）

从例子中可以看到，一些重复的功能开发者需要在 componentDidMount 和 componentDidUpdate 重复编写，而如果使用 useEffect 则完全不一样。

```js
import React, { useState, useEffect } from 'react';
let timer = null;
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = 'componentDidMount' + count;
  }, [count]);

  useEffect(() => {
    timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    // 一定注意下这个顺序：
    // 告诉react在下次重新渲染组件之后，同时是下次执行上面setInterval之前调用
    return () => {
      document.title = 'componentWillUnmount';
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      Count: {count}
      <button onClick={() => clearInterval(timer)}>clear</button>
    </div>
  );
}
```

我们使用 useEffect 重写了上面的例子，**useEffect 第一个参数接收一个函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，而第二个参数称之为 dependencies，是一个数组，如果数组中的值变化才会触发 执行 useEffect 第一个参数中的函数。返回值(如果有)则在组件销毁或者调用函数前调用**。

- 1.比如第一个 useEffect 中，理解起来就是一旦 count 值发生改变，则修改 documen.title 值；
- 2.而第二个 useEffect 中传递了一个空数组[]，这种情况下只有在组件初始化或销毁的时候才会触发，用来代替 componentDidMount 和 componentWillUnmount，慎用；
- 1. 还有另外一个情况，就是不传递第二个参数，也就是 useEffect 只接收了第一个函数参数，代表不监听任何参数变化。每次渲染 DOM 之后，都会执行 useEffect 中的函数。

基于这个强大 Hooks，我们可以模拟封装出其他生命周期函数，比如 componentDidUpdate 代码十分简单

```js
function useUpdate(fn) {
  // useRef 创建一个引用
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
}
```

现在我们有了 useState 管理状态，useEffect 处理副作用，异步逻辑，学会这两招足以应对大部分类组件的使用场景。

## 3、useContext 减少组件层级

上面介绍了 useState、useEffect 这两个最基本的 API，接下来介绍的 useContext 是 React 帮你封装好的，用来处理多层级传递数据的方式，在以前组件树种，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层 props 往下透传之外，我们还可以使用 React Context API 来帮我们做这件事，举个简单的例子：

```js
const { Provider, Consumer } = React.createContext(null);
function Bar() {
  return <Consumer>{(color) => <div>{color}</div>}</Consumer>;
}
function Foo() {
  return <Bar />;
}
function App() {
  return (
    <Provider value={'grey'}>
      <Foo />
    </Provider>
  );
}
```

通过 React createContext 的语法，在 APP 组件中可以跨过 Foo 组件给 Bar 传递数据。而在 React Hooks 中，我们可以使用 useContext 进行改造。

```js
const colorContext = React.createContext('gray');
function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}
function Foo() {
  return <Bar />;
}
function App() {
  return (
    <colorContext.Provider value={'red'}>
      <Foo />
    </colorContext.Provider>
  );
}
```

传递给 useContext 的是 context 而不是 consumer，返回值即是想要透传的数据了。用法很简单，使用 useContext 可以解决 Consumer 多状态嵌套的问题。

```js
function HeaderBar() {
  return (
    <CurrentUser.Consumer>
      {user =>
        <Notifications.Consumer>
          {notifications =>
            <header>
              Welcome back, {user.name}!
              You have {notifications.length} notifications.
            </header>
          }
      }
    </CurrentUser.Consumer>
  );
}
```

而使用 useContext 则变得十分简洁，可读性更强且不会增加组件树深度。

```js
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}! You have {notifications.length} notifications.
    </header>
  );
}
```

## 4、useReducer

useReducer 这个 Hooks 在使用上几乎跟 Redux/React-Redux 一模一样，唯一缺少的就是无法使用 redux 提供的中间件。我们将上述的计时器组件改写为 useReducer，

```js
import React, { useReducer } from 'react';
const initialState = {
  count: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>
        -
      </button>
    </>
  );
}
```

用法跟 Redux 基本上是一致的，用法也很简单，算是提供一个 mini 的 Redux 版本。

## 5、useCallback 记忆函数

在类组件中，我们经常犯下面这样的错误：

```js
class App {
  render() {
    return (
      <div>
        <SomeComponent
          style={{ fontSize: 14 }}
          doSomething={() => {
            console.log('do something');
          }}
        />
      </div>
    );
  }
}
```

这样写有什么坏处呢？一旦 App 组件的 props 或者状态改变了就会触发重渲染，即使跟 SomeComponent 组件不相关，**由于每次 render 都会产生新的 style 和 doSomething（因为重新 render 前后， style 和 doSomething 分别指向了不同的引用）**，所以会导致 SomeComponent 重新渲染，倘若 SomeComponent 是一个大型的组件树，这样的 Virtual Dom 的比较显然是很浪费的，解决的办法也很简单，将参数抽离成变量。

```js
const fontSizeStyle = { fontSize: 14 };
class App {
  doSomething = () => {
    console.log('do something');
  };
  render() {
    return (
      <div>
        <SomeComponent style={fontSizeStyle} doSomething={this.doSomething} />
      </div>
    );
  }
}
```

在类组件中，我们还可以通过 this 这个对象来存储函数，而在函数组件中没办法进行挂载了。所以函数组件在每次渲染的时候如果有传递函数的话都会重渲染子组件。

```js
function App() {
  const handleClick = () => {
    console.log('Click happened');
  };
  return <SomeComponent onClick={handleClick}>Click Me</SomeComponent>;
}
```

> 这里多说一句，一般把**函数式组件理解为 class 组件 render 函数的语法糖**，所以每次重新渲染的时候，函数式组件内部所有的代码都会重新执行一遍。所以上述代码中每次 render，handleClick 都会是一个新的引用，所以也就是说传递给 SomeComponent 组件的 props.onClick 一直在变(因为每次都是一个新的引用)，所以才会说这种情况下，函数组件在每次渲染的时候如果有传递函数的话都会重渲染子组件。

而有了 useCallback 就不一样了，你可以通过 useCallback 获得一个记忆后的函数。

```js
function App() {
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened');
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

老规矩，第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。

这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染。

## 6、useMemo 记忆组件

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

```rust
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
```

所以前面使用 useCallback 的例子可以使用 useMemo 进行改写：

```js
function App() {
  const memoizedHandleClick = useMemo(
    () => () => {
      console.log('Click happened');
    },
    []
  ); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

唯一的区别是：**useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。**所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

当 a/b 改变时，child1/child2 才会重新渲染。从例子可以看出来，只有在第二个参数数组的值发生变化时，才会触发子组件的更新。

## 7、useRef 保存引用值

useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用，看个简单的例子：

```js
import React, { useState, useRef } from 'react';
function App() {
  let [name, setName] = useState('Nate');
  let nameRef = useRef();
  const submitButton = () => {
    setName(nameRef.current.value);
  };
  return (
    <div className="App">
      <p>{name}</p>

      <div>
        <input ref={nameRef} type="text" />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}
```

useRef 返回的值传递给组件或者 DOM 的 ref 属性，就可以通过 ref.current 值**访问组件或真实的 DOM 节点，重点是组件也是可以访问到的**，从而可以对 DOM 进行一些操作，比如监听事件等等。

注意\*\*\*：通过 useRef 也可以拿到组件，类组件和元素的一样，但是函数组件需要在函数组件的外层用 React.forwardRef(function comp(){})包一层，其中 forwardRef()的作用就是将函数组件包上一层类组件，return 出原来的函数组件，是的组件的身上有 this，从而可以使用 ref

当然 useRef 远比你想象中的功能更加强大，useRef 的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。

利用 useRef 就可以绕过 Capture Value 的特性。可以认为 ref 在所有 Render 过程中保持着唯一引用，因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 Render 间存在隔离。

React Hooks 中存在 Capture Value 的特性：

```js
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      alert('count: ' + count);
    }, 3000);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <button onClick={() => setCount(count - 1)}>减少 count</button>
    </div>
  );
}
```

先点击增加 button，后点击减少 button，3 秒后先 alert 1，后 alert 0，而不是 alert 两次 0。这就是所谓的 capture value 的特性。而在**类组件**中 3 秒后输出的就是修改后的值，因为这时候** message 是挂载在 this 变量上，它保留的是一个引用值**，对 this 属性的访问都会获取到最新的值。讲到这里你应该就明白了，useRef 创建一个引用，就可以有效规避 React Hooks 中 Capture Value 特性。

```js
function App() {
  const count = useRef(0);

  const showCount = () => {
    alert('count: ' + count.current);
  };

  const handleClick = (number) => {
    count.current = count.current + number;
    setTimeout(showCount, 3000);
  };

  return (
    <div>
      <p>You clicked {count.current} times</p>
      <button onClick={() => handleClick(1)}>增加 count</button>
      <button onClick={() => handleClick(-1)}>减少 count</button>
    </div>
  );
}
```

只要将赋值与取值的对象变成 useRef，而不是 useState，就可以躲过 capture value 特性，在 3 秒后得到最新的值。

## 8、useImperativeHandle 透传 Ref

通过 useImperativeHandle 用于让父组件获取子组件内的索引

```js
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}
const ChildInput = forwardRef(ChildInputComponent);
function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```

```js
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Child1 = (props, ref) => {
  const [childCount, setChildCount] = useState(11);
  useImperativeHandle(ref, () => {
    return {
      addChildCount: () => {
        setChildCount(childCount + 1);
      },
    };
  });
  // 通过props来传值
  return (
    <div>
      <div>父组件调用子组件的方法子{childCount}</div>
    </div>
  );
};

const Child = forwardRef(Child1);

const CreateContext = () => {
  const childMethod = () => {
    childRef.current.addChildCount();
  };
  return (
    <div>
      <button onClick={childMethod}>调用子组件方法</button>
      <Child value={count} ref={childRef}></Child>
    </div>
  );
};

export default CreateContext;
```

```js
import React, { useRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} type="text" />;
});

const App = (props) => {
  const fancyInputRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button onClick={() => fancyInputRef.current.focus()}>
        父组件调用子组件的 focus
      </button>
    </div>
  );
};

ReactDOM.render(<App />, root);
```

通过这种方式，App 组件可以获得子组件的 input 的 DOM 节点。

## 9、useLayoutEffect 同步执行副作用

大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

```js
function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const title = document.querySelector('#title');
    const titleWidth = title.getBoundingClientRect().width;
    console.log('useLayoutEffect');
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log('useEffect');
  });
  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}
```

在上面的例子中，useLayoutEffect 会在 render，DOM 更新之后同步触发函数，会优于 useEffect 异步触发函数。

### (1) useEffect 和 useLayoutEffect 有什么区别？

**简单来说就是调用时机不同，`useLayoutEffect`和原来`componentDidMount`&`componentDidUpdate`一致，在 react 完成 DOM 更新后马上**同步**调用的代码，会阻塞页面渲染。而`useEffect`是会在整个页面渲染完才会调用的代码。**

官方建议优先使用`useEffect`

> However, **we recommend starting with useEffect first** and only trying useLayoutEffect if that causes a problem.

在实际使用时如果想避免**页面抖动**（在`useEffect`里修改 DOM 很有可能出现）的话，可以把需要操作 DOM 的代码放在`useLayoutEffect`里。关于使用`useEffect`导致页面抖动。

不过`useLayoutEffect`在服务端渲染时会出现一个 warning，要消除的话得用`useEffect`代替或者推迟渲染时机。

# 二十、路由 React-router

### 1.简介

```
1.我们使用里面的react-router-dom来实现路由功能
模式：
	HashRouter模式   #/home	底层原理：通过监听hashChange事件
	BrowserRouter模式	/home	  底层原理：H5的popState＋H5的history api
```

### 2.使用

```
1. 安装包 yarn add react-router-dom    (可以直接参照官网)
2. 在项目中找入口文件，然后确定模式，HashRouter模式BrowserRouter模式
	import {BrowserRouer} form "react-router-dom" 然后包裹在组件的最外层
```

### 3.案例

```jsx
// ---------常用模式
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Home from '../home/index.js';
//Switch 组件表示里面的只会渲染一个，不会全部渲染出来     exact表示严格匹配
const AppRouter = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Redirect from='/' to='/login' exact></Redirect>
                    <Route path='/login' component={Login2}></Route>
                    <Route path='/admin' component={()=><Home>
                        <Switch>
                            <Redirect from='/admin' to='/admin/home' exact></Redirect>
                            <Route path='/admin/home' component={Welcome}></Route>
                            <Route path='/admin/ui/buttons' component={Buttons}></Route>
                            <Route path='/admin/ui/modals' component={Modals}></Route>
                            <Route path='/admin/ui/loadings' component={Spin}></Route>
                            <Route path='/admin/city' component={City}></Route>
                            <Route path='/admin/order' component={Order}></Route>
                            <Route path='/admin/bikeMap' component={()=><BikeMap></BikeMap>}></Route>
                            <Route path='/admin/charts/bar' component={Interval}></Route>
                    </Home>}>
                    </Route>
                </Switch>
        </BrowserRouter>
    );
}
// component可以渲染类组件和函数组件(可以拿到this.props)
// render只能接受函数组件，如果非要传入类组件，则用箭头函数，返回值是函数组价的标签(函数组件可以拿到	      props，类组件需要处理后拿到props)
// children不管路径有没没有匹配，都会被渲染，不能使用类组件，不在switch中，要不然是排他性，就失效了(函数    组件可以拿到props，类组件需要处理后拿到props)
// 在<Route></Route>标签的中间直接写入一个标签 拿不到props


// ---------页面懒加载
import react {lazy,Suspense} from "react";
const Home = lazy(()=>import("./pages/Home"))

return (
    <Suspense fallback={<div>页面切换加载中。。。</div>}>
        <Route path="/home" component={HOme}></Route>
    </Suspense>
)


// --------页面跳转
   -------方式一
import {NavLinnk,Link} form "react-router-dom";
- react-router-dom 中提供了两种导航组件  --Link  普通导航		--NavLink  激活导航
<NavLink to="./path" activeClassName="active"></NavLink>
   -------方式二
import {useHistory} from 'react-router-dom';
const history=useHistory();
history.push('/admin')
```

# 二十一、状态管理（Redux）(与十五重复)

### 1.React 状态管理的历程

```
-	Flux 和reatc同期发布的状态管理工具------基本不用
-	Redux Flux升级版-----主流使用
-	Mobx Mobx是为了弥补Redux的缺陷-----小部分使用
```

### 2.Redux 的使用

##### 2.1Redux 基础点

```
1.Redux的构成部分，将一个应用分成了四个部分
	- store		用户存储和管理数据
	- actionCreators	创建动作，发送动作，类似于Vue的 actions
	- redurces		用于修改数据
	- view		视图就是react的组件

2.Redux的注意事项（三大原则）
	- Redux要求唯一数据源
	- Redux状态是只读的（不可修改，如果你要修改，需要先拷贝）
	- Redux要求数据的修改必须是一个纯函数（纯函数：只做数据修改这样一个业务）

3.Redux 使用 yarn add redux
	中文网：https://www.redux.org.cn/
	官网：https://redux.js.org/
```

![1644672128647](C:\Users\xiagu\AppData\Roaming\Typora\typora-user-images\1644672128647.png)

##### 2.2Redux 数据不分块使用

````markdown
### 使用：

1.建立 reducers 文件，用于修改写纯函数修改数据
​```js
const initState = {
num: 1,
};
export default function reducers(prevState = initState, action) {
let newState = JSON.parse(JSON.stringify(prevState));
const add = () => {
return (newState.num += action.payload);
};
switch (action.type) {
case 'ADD':
add();
break;
default:
console.log('未匹配到相关 type');
}
return newState;
}

​```

2.建立 store 文件用于存储数据
​`js import { createStore } from 'redux'; import reducer from '../reducers'; const store = createStore(reducer); export default store; ​`

3.建立 actionCreates 用于派发动作
​`js import store from '../store/index'; export const addClick = (payload) => { const action = { type: 'ADD', payload, }; store.dispatch(action); }; ​`

4.页面使用数据
通过 store.getState()方法获得整个数据对象，然后从中取出自己想要的数据
通过 store.subScribe()方法注册监听事件

​```js
const [num, setNum] = useState(store.getState().num);
useEffect(() => {
const ev = store.subscribe(() => {
setNum(store.getState().num);
});
return () => {
ev();
};
}, []);
````

##### 2.3Redux 数据分块使用

<img src="/Users/xiaguikun/Library/Application Support/typora-user-images/image-20220515180341437.png" alt="image-20220515180341437" style="zoom:50%;" />

准备：yarn add redux && yarn add react-redux

1.建立 reducers 文件夹，用来写纯函数修改数据，数据分块使用每个文件代表一个模块页面，最后通过 combineReducer,合并成一个总的 rootReducers

- 建立首页的模块 reducers

```js
const initState = {
  list: [],
};
export default function reducer(state = initState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_USER_LIST:
      if (action.payload.data.data)
        newState.list = action.payload.data.data.users;
      break;
    default:
      break;
  }
  return newState;
}
```

- 总的 reducers

```js
import { combineReducers } from 'redux';
import user from './user';
const rootReducer = combineReducers({
  user,
});
export default rootReducer;
```

2.建立 store 文件

```js
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootReducer, composeWithDevTools());
export default store;
```

3.建立 actionCreators 文件夹，该文件夹也可以创建多个模块页面的文件，在不同页面引入不同的文件即可

```js
import { INCREMENT } from '../constants';
export default {
  increment(payload) {
    const action = {
      type: INCREMENT,
      payload,
    };
    return action;
  },
};
```

4.页面中数据的使用,通过 react-redux 中的 connect(mapStateFromProps,mapDispatchFromProps)这个函数来取数据，发动作，

```jsx
import React from 'react';
/*
 * 1. 我们现在redux是做了数据分块的
 * 2. 组件中要想拿到store中的数据，要通过react-redux提供的api   connect函数【高阶组件】
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actionCreators/home';
/*
  connect(mapStateFromProps,mapDispatchFromProps)
    * 1. 参数
      * mapStateFromProps
        * 从store中取出来state作为属性绑定到我们的组件身上，这样我们的组件就得到了props
      * mapDispatchFromProps
        * 1. 可以将actionCreators中的方法取出来绑定到我们组件上
        * 2. 可以主动将actionCreators中创建的action发送给reducer
    * 2. connect还可帮助我们更新视图
    * 3. 底层原理
      *  合并分发
*/

function App(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.increment(10);
        }}
      >
        {' '}
        +{' '}
      </button>
      {props.n}
    </div>
  );
}

const mapStateFromProps = (state) => {
  // state 就是store中的全部数据  {count: {n: 0}}
  return state.home; // 只要count的数据
};

const mapDispatchFromProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateFromProps, mapDispatchFromProps)(App);
```

##### 2.4Redux 数据分块使用异步请求

准备：yarn add redux && yarn add react-redux && yarn add redux-thunk

1.建立 reducers 文件夹（同上），用来写纯函数修改数据，数据分块使用每个文件代表一个模块页面，最后通过 combineReducer,合并成一个总的 rootReducers
​```js

- 建立首页的模块 reducers
```js
  const initState = {
  list: []
  }
  export default function reducer (state=initState,action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
  case GET_USER_LIST:
  if (action.payload.data.data) newState.list = action.payload.data.data.users
  break;
  default:
  break;
  }
  return newState
  }
```

- 总的 reducers
```js
  import {combineReducers} from 'redux'
  import user from './user'
  const rootReducer = combineReducers({
  user
  })
  export default rootReducer

```

2.建立 store 文件夹,通过 applyMiddleware 来使用中间件

```js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
/*
    redux的中间件
        * redux-log
        * redux-promise
        * redux中异步数据请求
            * redux-thunk
            * redux-saga  升级版
    redux的中间件是通过redux的api来调用的，这个api就是  appliMiddleWare(中间1，中间件2)
*/
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
```

3.建立 actionCreaters 文件，也可以根据不同的页面模块来建立不同的文件，只需要在页面使用的时候引入不同的文件即可,这里 return，不再是一个对象，而是一个异步函数，函数中可以做异步请求

```js
import { getUserListReq, delUserListReq } from '../api';
import { GET_USER_LIST, DEL_USER_LIST } from '../constant';
export default {
  getUserList(payload) {
    // 没有带异步数据请求写法
    // return {
    //     type: '',
    //     payload
    // }
    //!!! 带了异步数据请求写法
    return async (dispatch) => {
      // 发送数据请求，发送action
      dispatch({
        type: GET_USER_LIST,
        payload: await getUserListReq(payload),
      });
    };
  },
};
```

4.页面数据使用与触发(同上)

```js
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './actionCreators/user';
import { Button } from 'antd';
export default connect(
  // 两个参数
  ({ user }) => user,
  (dispatch) => bindActionCreators(actions, dispatch)
)(function App({ list, getUserList, delUserList }) {
  useEffect(() => {
    getUserList({
      query: '',
      pagenum: 1,
      pagesize: 4,
    });
  }, []);

  if (!list.length) return <div> 数据加载中... </div>;

  const renderList = () =>
    list.map((v) => (
      <li key={v.id}>
        {v.username}
        <Button
          type="primary"
          danger
          onClick={() => {
            delUserList(v.id);
          }}
        >
          {' '}
          删除{' '}
        </Button>
      </li>
    ));

  return (
    <div>
      <ul>{renderList()}</ul>
    </div>
  );
});
```

# 二十二、Mobx

Mobx 是一个功能强大，上手非常容易的状态管理工具。redux 的作者也曾经向大家推荐过它，在不少情况下可以使用 Mobx 来替代掉 redux。

![MobX unidirectional flow](./images/mobx-flow.png)

这张图来自于官网，把这张图理解清楚了。基本上对于 mobx 的理解就算入门了。

官网有明确的核心概念使用方法，并配有[egghead](https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx)的视频教程。这里就不一一赘述了。

要特别注意当使用 `mobx-react` 时可以定义一个新的生命周期钩子函数 `componentWillReact`。当组件因为它观察的数据发生了改变，它会安排重新渲染，这个时候 `componentWillReact` 会被触发。这使得它很容易追溯渲染并找到导致渲染的操作(action)。

- `componentWillReact` 不接收参数

- `componentWillReact` 初始化渲染前不会触发 (使用 `componentWillMount` 替代)

- `componentWillReact` 对于 mobx-react@4+, 当接收新的 props 时并在 `setState` 调用后会触发此钩子

- 要触发`componentWillReact`必须在 render 里面用到被观察的变量

- 使用 Mobx 之后不会触发`componentWillReceiveProps`

## 1、搭建环境

```bash
mkdir my-app
cd my-app
npm init -y
npm i webpack webpack-cli webpack-dev-server -D
npm i html-webpack-plugin -D
npm i babel-loader @babel/core @babel/preset-env -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
npm i mobx -S
mkdir src
mkdir dist
touch index.html
touch src/index.js
touch webpack.config.js

````

编写 webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              //支持装饰器
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'inline-source-map',
};
```

编写 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## 2、Mobx 入门

### (1) observable 可观察的状态

- map

```js
import { observable } from 'mobx';
// 声明
const map = observable.map({ a: 1, b: 2 });
// 设置
map.set('a', 11);
// 获取
console.log(map.get('a'));
console.log(map.get('b'));
// 删除
map.delete('a');
console.log(map.get('a'));
// 判断是否存在属性
console.log(map.has('a'));
```

- object

```js
import { observable } from 'mobx';
// 声明
const obj = observable({ a: 1, b: 2 });
// 修改
obj.a = 11;
// 访问
console.log(obj.a, obj.b);
```

- array

```js
import { observable } from 'mobx';
const arr = observable(['a', 'b', 'c', 'd']);
// 访问
console.log(arr[0], arr[10]);
// 操作
arr.pop();
arr.push('e');
```

- 基础类型

```js
import {observable} from 'mobx'/
const num = observable.box(10);
const str = observable.box('hello');
const bool = observable.box(true);
// 获得值
console.log(num.get(), str.get(), bool.get());
// 修改值
num.set(100);
str.set('hi');
bool.set(false);
console.log(num.get(), str.get(), bool.get());
```

### (2) observable 装饰器

```js
import { observable } from 'mobx';

// observable这个函数可以识别当成普通函数调用还是装饰器调用
// 如果是装饰器，会自动识别数据类型，使用不同的包装转换方案。
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();
  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;
}

const store = new Store();

console.log(store);
console.log(store.obj.a);
```

注意：vscode 编译器中，js 文件使用装饰器会报红。解决方式：

在根目录编写 jsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

### (3) 对 observables 作出响应

- 基础代码：

```js
import { observable } from 'mobx';
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();
  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;
}
const store = new Store();
```

- computed

计算值是可以根据现有的状态或其它计算值衍生出的值, 跟 vue 中的 computed 非常相似。

```js
const result = computed(() => store.str + store.num);
console.log(result.get());
// 监听数据的变化
result.observe((change) => {
  console.log('result:', change);
});
//两次对store属性的修改都会引起result的变化
store.str = 'world';
store.num = 220;
```

computed 可作为装饰器， 将 result 的计算添加到类中：

```js
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result() {
    return this.str + this.num;
  }
}
```

- autorun

当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 `mobx.autorun`

所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。

经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用`autorun`。 其余情况都应该使用 `computed`。

```js
//aotu会立即触发一次
autorun(() => {
  console.log(store.str + store.num);
});

autorun(() => {
  console.log(store.result);
});
//两次修改都会引起autorun执行
store.num = 220;
store.str = 'world';
```

- when

```
when(predicate: () => boolean, effect?: () => void, options?)
```

`when` 观察并运行给定的 `predicate`，直到返回 true。 一旦返回 true，给定的 `effect` 就会被执行，然后 autorunner(自动运行程序) 会被清理。 该函数返回一个清理器以提前取消自动运行程序。

对于以响应式方式来进行处理或者取消，此函数非常有用。

```js
when(
  () => store.bool,
  () => {
    console.log('when function run.....');
  }
);
store.bool = true;
```

- reaction

用法: `reaction(() => data, (data, reaction) => { sideEffect }, options?)`。

`autorun` 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，第一个(_数据_ 函数)是用来追踪并返回数据作为第二个函数(_效果_ 函数)的输入。 不同于 `autorun` 的是当创建时*效果* 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。 在执行 _效果_ 函数时访问的任何 observable 都不会被追踪。

```js
// reaction
reaction(
  () => [store.str, store.num],
  (arr) => {
    console.log(arr.join('/'));
  }
);
//只要[store.str, store.num]中任意一值发生变化，reaction第二个函数都会执行
store.num = 220;
store.str = 'world';
```

### (4) 改变 observables 状态

- action

接上面案例，添加 action 到类中：

```js
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result() {
    return this.str + this.num;
  }

  @action bar() {
    this.str = 'world';
    this.num = 40;
  }
}
const store = new Store();

//调用action，只会执行一次
store.bar();
```

- action.bound

`action.bound` 可以用来自动地将动作绑定到目标对象。

```js
class Store {
  @observable arr = [];
  @observable obj = { a: 1 };
  @observable map = new Map();

  @observable str = 'hello';
  @observable num = 123;
  @observable bool = false;

  @computed get result() {
    return this.str + this.num;
  }

  @action bar() {
    this.str = 'world';
    this.num = 40;
  }

  //this 永远都是正确的
  @action.bound foo() {
    this.str = 'world';
    this.num = 40;
  }
}

const store = new Store();
setInterval(store.foo, 1000);
```

- runInAction

`action` 只能影响正在运行的函数，而无法影响当前函数调用的异步操作。如果你使用 async function 来处理业务，那么我们可以使用 `runInAction` 这个 API 来解决这个问题。

```js
@action async fzz() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        num: 220,
        str: 'world'
      })
    }, 1000)
  })
  runInAction(()=>{
    store.num = 220
    store.str = 'world'
  })
}
```

## 3、应用

### (1) 在 react 中使用 mobx

在 react 中使用 mobx，需要借助 mobx-react。

它的功能相当于在 react 中使用 redux，需要借助 react-redux。

首先来搭建环境：

```bash
create-react-app react-app
cd react-app
npm run eject
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
npm i mobx mobx-react -S
```

修改 package.json 中 babel 的配置：

```json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  }
```

注意：vscode 编译器中，js 文件使用装饰器会报红。解决方式：

在根目录编写写 jsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

# 附加

## 一、create-react-app 支持 decorators

```shell
yarn add @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

**创建 .babelrc**

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```

**创建 config-overrides.js**

```javascript
const path = require('path');
const { override, addDecoratorsLegacy } = require('customize-cra');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src');
  if (env === 'production') {
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM',
    };
  }

  return config;
};

module.exports = override(addDecoratorsLegacy(), customize());
```

**安装依赖**

```
yarn add customize-cra react-app-rewired
```

**修改 package.json**

```
...
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
...
```

# 补充

## 生命周期![生命周期](F:\浩鲸新智能\学习\notes\images\生命周期.png)

````

```

```

```

```

```

```
````
