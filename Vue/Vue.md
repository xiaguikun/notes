# 一、初识 Vue

### 1、什么是 Vue.js?

Vue 是一套用于构建用户界面的渐进式框架。

官网： https://cn.vuejs.org/ 作者： 尤雨溪
特点：
易用：已经会了 HTML、CSS、JavaScript？即刻阅读指南开始构建应用！
灵活：不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩。
高效：20kB min+gzip 运行大小，超快虚拟 DOM，最省心的优化
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。
Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
core -> 引入自身的周边库（vue-router/vuex） -> 第三方的库（axios） -> 测试工具/typescript/服务端渲染

### 2、 Vue 的引入使用方式

**1.通过 CDN 的方式使用**

对于制作原型或学习，你可以这样使用最新版本：

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
```

如果你使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件：

```html
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';
</script>
```

**2.通过 npm 包的形式使用**

在用 Vue 构建大型应用时推荐使用 NPM 安装[[1\]](https://cn.vuejs.org/v2/guide/installation.html#footnote-1)。NPM 能很好地和诸如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 模块打包器配合使用。同时 Vue 也提供配套工具来开发[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)。

```js
# 最新稳定版
$ npm install vue
```

**3.通过脚手架使用**

Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI 的文档](https://cli.vuejs.org/)。

### 3、代码简单使用 demo

![image-20220302155528261](/Users/xiaguikun/Library/Application Support/typora-user-images/image-20220302155528261.png)

```html
<body>
  <div id="app">
    <ul>
      <li v-for="item in studentsMessage">
        {{item.name}}的年龄是{{item.age}}
        <input type="number" v-model="item.age" />
        <span v-if="item.age > 18">成年了</span>
      </li>
    </ul>
    <div>{{totalAge}}</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        studentsMessage: [
          {
            name: '小明',
            age: '18',
          },
          {
            name: '小红',
            age: '22',
          },
        ],
      },
      created() {
        fetch('https://www.xxxxx.com/xxxx')
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            let re = { name: '小花', age: '18' };
            this.studentsMessage.push(re);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      computed: {
        totalAge() {
          let total = 0;
          this.studentsMessage.forEach((item) => {
            total += Number(item.age);
          });
          return total;
        },
      },
    });
  </script>
</body>
```

### 4、基本语法

**4.1.声明式渲染**

- 如果对文本节点声明式渲染，用{{}}的插值语法

- 如果对属性进行声明式渲染，使用 v-bind:title="xxx" (xxx-data 中的响应式变量)

  ```
  <p v-bind:title="message">{{ message }}</p >
  ```

**4.2 条件渲染**

- 使用 v-if 指令，里面可以直接使用响应式数据,也可以写语句

  ```
  <p v-if="flag">是否显示该标签</p >
  ```

**4.3.循环渲染**

- 使用 v-for 指令， <p v-for="item in arr">{{item}}</p >

  ```
   <p v-for="item in arr">{{item}}</p >
  ```

**4.4.绑定事件**

- 使用 v-on 指定， <p v-on:click="handleClick">hello</p >

- 事件处理函数要写在 methods 的 option 里面

  ```
   <p v-on:click="handleClick">hello</p >
  ```

**4.5 数据双向绑定**

- v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。（相当与 v-bind 绑定 input 的 value 属性和 v-on 的结合）

  ```
  <input v-model="value"></input>
  ```

**6.应用&组件实例**

1.全局组件

```js
//通过Vue.component('组件名',{除el项不可用，其余的所有项都可以使用})
//1.页面标签写在template项上
//2.data响应数据为函数，返回一个对象
Vue.component('VHeader', {
  data() {
    return {
      msg: '这是头部信息啊',
    };
  },
  template: `
        <div>{{msg}}</div>
      `,
});
```

2.局部组件

```js
//直接写一个对象就可以，但是需要先在component中注册才能使用
const VHeader = {
  props: ['fms'],
  data() {
    return {
      msg: '这是头部啊',
    };
  },
  template: `
          <div>
            <div>{{msg}}</div>
            <div>接受父组件的信息-->
              <span>{{fms}}</span>
              </div>
            </div>
        `,
};

const vm = new Vue({
  el: '#app',
  data: {
    msg: '这是父组件的msg信息',
  },
  components: {
    VHeader,
  },
  template: `
        <div>
            <v-header v-bind:fms="msg"></v-header>
          </div>
        `,
});
```

**7.响应数据**

Vue 中的 data 中的数据会在这个实例被创建的时候注入到 vue 的响应式系统中，data 中的各个数据会被平铺到 vue 实例的属性上

```html
<script>
  const data = {
    msg: 'mmm',
  };
  const vm = new Vue({
    el: '#app',
    data,
  });
</script>
// 控制台输出 data.msg和vm.msg都为'mmm'，修改任意一方数据都会触发页面响应
```

# 二、Vue 基础

### 1.生命周期

##### 1.1 实例生命周期运行

![image-20220311163750873](./images/Vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.jpg)

##### 1.2 生命周期钩子函数

- beforeCreate

  在实例初始化(初始化事件和生命周期)之后,进行数据侦听和事件/侦听器的配置之前同步调用

- created

  在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 `$el` property 目前尚不可用

- beforeMount

  在挂载开始之前被调用：相关的 `render` 函数首次被调用；

  \*\*该钩子在服务器端渲染期间不被调用

- mounted

  实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

  注意 `mounted` **不会**保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 `mounted` 内部使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)：

  ```js
  mounted: function () {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
    })
  }
  ```

  该钩子在服务器端渲染期间不被调用

- beforeUpdate

  在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

  \*\*该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行

- updated

  在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

  当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或 [watcher](https://cn.vuejs.org/v2/api/#watch) 取而代之。

  注意，`updated` **不会**保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 `updated` 里使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)：

  ```js
  updated: function () {
    this.$nextTick(function () {
      //  仅在整个视图都被重新渲染之后才会运行的代码
    })
  }
  ```

  \*\*该钩子在服务器端渲染期间不被调用

- activated

  被 keep-alive 缓存的组件激活时调用。

  \*\*该钩子在服务器端渲染期间不被调用。

- deactivated

  被 keep-alive 缓存的组件失活时调用。

  \*\*该钩子在服务器端渲染期间不被调用。

- beforDestroy

  实例销毁之前调用。在这一步，实例仍然完全可用。

  \*\*该钩子在服务器端渲染期间不被调用。

- destroyed

  实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

  \*\*该钩子在服务器端渲染期间不被调用。
