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

**响应数据**

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

### 1.基本指令与 options

##### 2.1 基本指令

```
v-if	v-else-if	v-else
v-for
v-bind :
v-on   @
v-model
v-html
v-text
v-once
v-show (同v-if，不同点，v-if是控制元素的渲染与不渲染，v-show是控制元素的display属性，当未false的时候		   元素会被设置为display:none；当元素频繁显示隐藏使用v-show，具有更小的切换开销，初始就不渲染的时		   候，使用v-if,具有更小的初始开销)
```

\*\*1.声明式渲染，模板语法

- 如果对文本节点声明式渲染，用{{}}的插值语法

- 如果对属性进行声明式渲染，使用 v-bind:title="xxx" (xxx-data 中的响应式变量)

- 模板语法中可以写基本表达式

  ```
  <p v-bind:title="message">{{ message }}</p >
  ```

\*\*2. 条件渲染 v-if v-else-if v-else

- 使用 v-if 指令，里面可以直接使用响应式数据,也可以写语句

  ```
  <p v-if="flag">是否显示该标签</p >
  ```

\*\*3.循环渲染 v-for

- 使用 v-for 指令， <p v-for="item in arr">{{item}}</p >

  ```
   //遍历数组的时候
   <p v-for="(value,index) in arr" :key="index">{{item}}</p >
   //遍历对象的时候
    <p v-for="(value，key,index) in obj" :key="index">{{item}}</p >
  ```

*\*4.绑定事件 v-on (@)

- 使用 v-on 指定， <p v-on:click="handleClick">hello</p >

- 事件处理函数要写在 methods 的 option 里面

  ```
  <a v-on:click="doSomething">...</ a>
  <a @click="doSomething">...</ a>
  
  <!-- 动态参数的缩写 (2.6.0+) -->
  <a @[event]="doSomething"> ... </ a>
  ```

\*\*5. 数据双向绑定 v-model

- v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。（相当与 v-bind 绑定 input 的 value 属性和 v-on 的结合）

  ```
  <input v-model="value"></input>
  ```

\*\*6. 声明变量 v-bind (:)

- 属性值及属性变为响应式数据中的变量

  ```
  <a v-bind:href="url">...</ a>
  
  <a :href="url">...</ a>
  
  <!-- 动态参数的缩写 (2.6.0+) -->
  <a :[key]="url"> ... </ a>
  ```

\*\*7. v-html

- 相当于 innerHTML，可以解析 html 语句

\*\*8. v-text

- 相当于 innerTEXT，可以解析 html 语句

\*\*9. v-once

- DOM 元素只会渲染一次，及时响应式数据发生变化也不会再渲染

##### 2.2option 选项

- el：绑定 DOM 元素
- data：响应式数据
- methods：定义方法
- computed：计算属性
- watch：监听器
- components：注册组件
- template：模板
- props：父级传下来的 props 属性
- mixins
- directives
- filters

### 2.生命周期

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

### 3.组件开发

##### 3.1 组件基础

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

#####	3.2组件传参

- 父子组件传参：通过自定义属性传参

  ```
  1.父组件将数据通过自定义属性绑定到子组件的标签上
  2.子组件通过props:["arr"]去接收父组件传下来的参数,如果需要校验数据类型，则为props:{arr:Array}
  ```

- 子父组件通信：通过自定义事件传参

  ```
  1.父组件将自定义的事件绑定到子组件的标签上
  2.子组件通过this.$emit("自定义事件名",传递父组件的参数)；可以直接触发也可以在需要的事件中触发
      <div id="app">
          <p>从子组件获取来的msg：{{parentMsg}}</p>
          <comp-box @changeP="change"></comp-box>
      </div>
       methods: {
       handleClick() {
       		this.childMsg = this.childMsg + '$';
       		this.$emit('changP', this.childMsg);
       	},
       },
       mounted() {
       	this.$emit('changep', this.childMsg);
       },
  ```

  



### 4.计算属性和监听器

##### 4.1 计算属性

- computed 是一个 option，是一个对象包含多个属性，属性值为函数，函数必须有返回值

- 当模板中需要多次使用相同逻辑或者复杂的逻辑运算的时候使用计算属性
- 当所依赖的响应式数据发生变化的时候会重新计算渲染页面

##### 4.2 监听器

- 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
- watch 是一个 option，是一个对象，对象的属性为函数，函数有两个入参，分别是 newValue,oldValue

##### 4.3.VS

- 计算属性 VS 方法
  - 1.模板中使用方法不同，方法需要加括号调用一次，计算属性可以直接使用
  - 2.计算属性是有缓存的，模板中多次使用只会执行一次，但是方法多次使用会执行多次
- 计算属性 VS 监听属性
  - 1.计算属性是通过所依赖的响应式数据而计算处理自身数据，监听器是通过监听自身数据变化而计算处理其他数据
  - 2.一般计算属性比较方便，但是如果需要执行异步，或者计算开销比较大，那么用监听器比较好

### 5.class 和 style 绑定

##### 5.1class 类名的绑定

- 1.class 和 v-bind:class 可以共存

  ```
  <div
    class="static"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
  ></div>
  ```

- 2. 使用对象绑定，对象的属性就是类名，属性值是变量或者表达式；这个对象也可以放在响应式数据和计算属性中

  ```
  <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
  ```

- 3.使用数组绑定

  ```
  <div v-bind:class="[activeClass, errorClass]"></div>
  data: {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
  ```

##### 5.2style 属性绑定

- 1.使用对象绑定

  ```
  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  <div v-bind:style="styleObject"></div>
  ```

- 2.通过数组绑定多个对象  

  ```
  <div v-bind:style="[baseStyles, overridingStyles]"></div>
  ```
  



###	6.事件处理

#####	6.1事件传参

​	但事件不进行传参的时候，我们可以在methods中定义的事件中默认得到一个event的默认参数，当我们需要传参的时候，我们只需要在后面的括号里一次传参即可，如果此时我们的事件处理函数中还需要用到默认事件event的时候，我们需要在事件event当做参数传下来即$event就是event

```
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

#####	6.2修饰符

- 1.事件修饰符***

```
1.stop阻止单击事件继续传播，阻止事件冒泡
<a v-on:click.stop="doThis"></a>

2.prevent提交事件不再重载页面，阻止默认事件 
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

3.capture添加事件监听器时使用事件捕获模式
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

4.self只当在 event.target 是当前元素自身时触发处理函数
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

5.once 点击事件将只会触发一次
<a v-on:click.once="doThis"></a>

6.passive 会告诉浏览器你不想阻止事件的默认行为.passive 修饰符尤其能够提升移动端的性能。
<!--  滚动事件的默认行为 (即滚动行为) 将会立即触发而不会等待 `onScroll` 完成这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

- 2.按键修饰符***

```
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```

- 3.系统修饰符***

```
.ctrl
.alt
.shift
.meta
```

- 4..exact修饰符`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件***

```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

- 5.鼠标修饰符***

```
.left
.right
.middle
```

###	7.插槽

#####	 7.1.基本使用

1.slot标签 <slot></slot> 标签来承接my-comp2组件

```
<my-comp>
	<my-comp2></my-comp2>
</my-comp>

Vue.component('myComp', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

2.插槽后背内容

直接在slot标签中写内容，会被用来当做后备内容，只有当未传入内容的时候（即该插槽未被使用的时候显示后备内容）

#####		7.2.具名插槽

具名插槽的使用：

​	（1）子组件中的<slot name="插槽名"></slot>，添加name属性

​	（2）父组件传下来的元素单元使用template标签包裹 <template v-slot:插槽名></template>   v-slot:简写#

```html
<child>
  <template #name>
    <span>小明</span>
  </template>
  <template v-slot:age>
    <span>18</span>
  </template>
</child>

<div>
  <div>
    姓名：
    <slot name="name"></slot>
  </div>
  <div>
    年龄：
    <slot name="age"></slot>
  </div>
</div>
```

补充，动态插槽名

[动态指令参数](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)也可以用在 `v-slot` 上，来定义动态的插槽名：

```
<base-layout>
  <template v-slot:[dynamicSlotName]>
  </template>
</base-layout>
```



### 8.动态组件与缓存组件

#####	8.1.动态组件

1.动态组价常用于在不同组件之间进行动态切换是非常有用的

```
currentComp 为data里面的响应式数据存储当前要展示的组件名称
<component is="currentComp"></component>
```

2.is属性

is属性接收一个组件名 将这个标签指向我们想要的组件

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部

所以如果我们要在table标签中使用组件，就必须要用到is属性,将我们的标签指向我们的组件

```html
<div id="app">
  <select name="" id="">
    <option is="op" v-for="(item,index) in list" :key="index" :item="item"></option>
  </select>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script>
  const op={
    props:["item"],
    template:`<option>{{item}}</option>`
  }
  const Vm=new Vue({
    el:"#app",
    data:{
      list:["a","b","c"]
    },
    components:{
      op
    }
  })
</script>
```

#####	8.2.缓存组件

缓存组价<keep-alive></keep-alive>,通过keep-alive标签缓存我们的组件，保证我们在切换组件的时候组件不会被销毁掉

如果我们想销毁掉一个缓存组件可以使用this.$destroy()，调用一次就可以销毁掉这个组件

缓存组件可以通过生命周期 activated(){} 和 deactivated(){} 两个生命周期捕获到

```html
<keep-alive>
  <component :is="compName"></component>
</keep-alive>

<script>
  const AddAge = {
    data() {
      return {
        num: 1,
        timer: null,
      };
    },
    template: `<div>{{num}}</div>`,
    mounted() {
      setInterval(() => {
        this.num = this.num + 1;
      }, 1000);
    },
    activated() {
      clearTimeout(this.timer);
    },
    deactivated() {
      this.timer = setTimeout(() => {
        this.$destroy();
      }, 5000);
    },
  };
</script>
```



###	9.过度与动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：在 CSS 过渡和动画中自动应用 class；可以配合使用第三方 CSS 动画库，如 Animate.css；在过渡钩子函数中使用 JavaScript 直接操作 DOM；可以配合使用第三方 JavaScript 动画库，如 Velocity.js；

详细参考官方文档

#####	9.1基本使用

使用transition标签包裹我们需要过度的组件或者标签元素



- 1.使用Vue自带的类名（其中v就是我们的transition标签上的name属性，通过这些类名写我们的css样式）

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

```html
<transition name="v">
  <h3 v-if="show">hello world</h3>
</transition>
```



- 2.自定义过度标签名，以此配合使用第三方库的css样式

我们可以通过以下 attribute 来自定义过渡类名：

`enter-class`

`enter-active-class`

`enter-to-class` (2.1.8+)

`leave-class`

`leave-active-class`

`leave-to-class` (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```



##### 9.2js钩子函数

可以在methods中定义这些方法，获取到动画的每一步的执行函数

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

注意：当只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。



###	10.混入

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

使用：首先自定义mixin，然后在使用的时候通过Vue的option选项mixins:[mixin]，来将自定义的mixin引入到我们的组件中，mixin时通过递归合并的方式合并到我们的组件中的

数据合并：当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。（mixin会先执行）

```html
<script>
var mixin = {
  dada(){
    return {
      a:1111,
      c:3
    }
  }
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  data(){
    return {
      a:2,
      b:2
    }
	}
  created: function () {
    console.log('组件钩子被调用')
  }
})

</script>
//data:{a:1,b:2,c:3}
//log : 混入对象的钩子被调用  --->   组件钩子被调用
```



###	11.自定义指令

  - 除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令,在directives这个option中去注册
  - 有5个钩子函数 bind inserted update componentUpdated unbind
  - 函数的简写
    指令名 () {
      // 相当于bind和update
    }    

```html
<div id="app">
  <div v-demo:style.50.red>你好</div>
  <div v-demo:style.30.green>hello</div>
</div>

<script>
  new Vue({
    el: '#app',
    data() {
      return {
        d: 111
      }
    },
    directives: {
      // focus: {
      //   // 指令的定义
      //   inserted: function (el) {
      //     el.focus()
      //   }
      // }
      // demo: {
      //   bind(el, binding, vnode, oldVnode) {
      //     // 只调用一次，指令第一次绑定到元素时调用
      //     console.log('bind')
      //   },
      //   inserted(el, binding, vnode, oldVnode) {
      //     // 被绑定元素插入父节点时调用
      //     console.log('inserted')
      //   },
      //   update(el, binding, vnode, oldVnode) {
      //     // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
      //     console.log('update')
      //   },
      //   componentUpdated(el, binding, vnode, oldVnode) {
      //     // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      //     console.log('componentUpdated')
      //   },
      //   unbind(el, binding, vnode, oldVnode) {
      //     // 只调用一次，指令与元素解绑时调用。
      //     console.log('unbind')
      //   }
      // }
      
      // 对象的形式简写成函数的形式
      demo(el, binding) {
        // console.log('el', el)
        // console.log('binding', binding)
        // binding.arg: 传给指令的参数，可选。  a
        // binding.expression: 字符串形式的指令表达式.   d
        // binding.modifiers: 一个包含修饰符的对象  {b: true, c: true}
        // binding.name: 指令名，不包括 v- 前缀     demo
        // binding.value: 指令的绑定值     111
        const obj = binding.modifiers
        const [fontSize, color] = Object.keys(obj)
        el[binding.arg].fontSize = fontSize + 'px'
        el[binding.arg].color = color
      }
    }
  })
</script>
```



###	12.过滤器

Vue.js 允许你自定义过滤器(filters选项中)，可被用于一些常见的  文本格式化，过滤器可以串联 ，串联时候接收的value入参值为上一个过滤器返回的值

```html
<div id="app">
  <div>{{sex}}</div>
  <div>{{sex | formatSex}}</div>
  <div>{{sex | formatSex | formatSexTwo}}</div>
</div>

<script>
  const vm = new Vue({
    el: "#app",
    data: {
      sex: 1,
    },
    filters: {
      formatSex(value) {
        if (value === 1) {
          return "男";
        } else {
          return "女";
        }
      },
      formatSexTwo(value) {
        if (value === "男") {
          return "♂";
        } else {
          return "♀";
        }
      },
    },
  });
</script>
```



# 二、Vue项目



###	1.脚手架 VueCLI

#####	1.1创建项目

安装 npm install @vue/cli -g

创建项目 vue create 项目名( 不要用git bash去装， 用cmd或者vscode )

Please pick a preset    ->    Manually select features

Check the features needed for your project
(*) Choose Vue version
(*) Babel
( ) TypeScript
( ) Progressive Web App (PWA) Support
(*) Router
(*) Vuex
(*) CSS Pre-processors
(*) Linter / Formatter
( ) Unit Testing
( ) E2E Testing

Use history mode for router       ->   no

Pick a CSS pre-processor     ->    sass

Pick a linter / formatter config   

##### 1.2项目目录

  - node_modules       项目的依赖
  - public             静态资源文件（不会被打包进去的）
  - src                源目录，开发目录
    - assets              静态资源文件（会被打包的）
    - components          存放组件的文件夹
    - router              存放路由的文件夹
    - store               存放vuex的文件夹
    - views               存放页面的文件夹
    - app.vue             项目的根组件
    - main.js             项目的入口的js文件
  - .browserslistrc    浏览器支持
  - .eslintrc.js       做eslint的代码风格检查
  - babel.config.js    用于编译babel
  - package-lock.json  锁定版本
  - package.json       项目依赖的记录文件
  - README.md          说明文档



###	2.项目开发配置

#####	2.1 Vue.config.js

具体配置项参考官网：https://cli.vuejs.org/zh/config/

  - 用于webpack的配置，手动创建在项目的根目录
  - 因为webpack配置放在了node_modules里面
  - 修改完需要重启，除了src文件夹以外，修改了都要重启

#####	2.2移动端适配

######	2.2.1 rem适配

  - 使用postcss的postcss-pxtorem，lib-flexible插件
  - npm i amfe-flexible -S  安装amfe-flexible,用来设置根元素字体大小的，安装完成后在main.js里面引入 import "amfe-flexible" 
  - npm i postcss-pxtorem -D  安装postcss-pxtorem
  - 在根目录创建文件 .postcssrc.js

```js
  module.exports = {
    plugins: {
      autoprefixer: {
        browsers: ['Android >= 4.0', 'iOS >= 8'],
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*'],
      },
    },
  };
```

######	2.2.2 VW VH适配

Vant 默认使用 `px` 作为样式单位，如果需要使用 `viewport` 单位 (vw, vh, vmin, vmax)，推荐使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 进行转换。

[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。

PostCSS PostCSS 示例配置

下面提供了一份基本的 PostCSS 示例配置，可以在此配置的基础上根据项目需求进行修改。

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
```

> Tips: 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 Vant 样式无法被编译。



#####	2.3 样式隔离

在style标签上添加 scoped 表示单文件组件的css单独作用域



###	3.Vue Router

官网网址 ：https://router.vuejs.org/zh/guide/#router-link

#####	3.1基本使用

  - 特点
    - 嵌套的路由/视图表
    - 模块化的、基于组件的路由配置
    - 路由参数、查询、通配符
    - 基于 Vue.js 过渡系统的视图过渡效果
    - 细粒度的导航控制
    - 带有自动激活的 CSS class 的链接
    - HTML5 历史模式或 hash 模式，在 IE9 中自动降级
    - 自定义的滚动条行为

  - router和route
    - 我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由


  - router-link
    - to  相当于href
    - active-class  设置链接激活时使用的 CSS 类名,默认值: "router-link-active"
    - exact     表示精准匹配
    - exact-active-class   前两个结合,默认值: "router-link-exact-active"
  - router-view
    - 路由的出口
  - 编程式导航
    - 用js来做跳转
    - 有复杂逻辑的时候（除了跳转还要做其他的事情）， 在布局里不方便使用router-link的时候
    - this.$router.push(url)      跳转到新页面，有跳转记录
    - this.$router.replace(url)   跳转到新页面，替换当前页面，没有记录，不能后退
    - this.$router.router.go(n)   前进或者后退几步
  - 命名路由
    - 给route添加name属性
    - <router-link to="/detail/456"></router-link>
    - <router-link :to="{name: 'detail', params: {id: 456}}"></router-link>
    - this.$router.push('/detail/456')
    - this.$router.push({name: 'detail', params: {id: 456}})
  - 重定向和别名
    - 重定向： 当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b
    - { path: '/a', redirect: '/b' }
    - 别名： /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
    - { path: '/a', component: A, alias: '/b' }


  - vue-router有几种模式

    - hash        

      - /#       
      - 比较难看
      - 比较好操作

    - history

      - 不带#

    - abstract

      

#####	3.2 路由守卫

  - 全局路由守卫

    ```
      router.beforeEach((to, from, next) => {
        if (to.meta.requiresAuth) {
          if (localStorage.getItem('token')) {
              如果有token，说明登录过了
            next()
          } else {
              如果没有token，那么跳到登录页
            next('/login')
          }
        }
        next()
      })
    ```

  - 路由独享守卫

    ```
      {
        path: '/mini-video',
        component: () => import('../views/MiniVideo.vue'),
        // meta: { requiresAuth: true }
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/login')
          }
        }
      },
    ```

  - 组件内守卫

    - beforeRouteEnter
      - 取不到this
    - beforeRouteUpdate
    - beforeRouteLeave







页面引入使用

承载者<router-view>  

跳转者<router-link>

路由表

actived样式

动态路由 /:id，页面传参













### 	记录

```


3-7自定义事件
props校验数据类型   自定义事件
3-8 插槽
slot 备用内用
3-9缓存组件
4-1,2 动画
```

###	问题

```
1.vue修改data是同步的还是异步的  同步
2.组件命名大驼峰或者连字符命名
3.sesstion和cookie的区别
4.组件的name属性
    1.组件自身调用，递归组件
    当在组件中需要调用自身的时候，可以通过name属性来使用
    2.使用vue-tools工具时的组件名称
    当使用调式工具时，组件的名称是通过name属性来设置的
    3.移除keep-alive状态下组件自动缓存功能
    我们知道，在组件外使用了keep-alive导致我们第二次进入的时候页面不会重新请求ajax，即mounted() 钩子函数只会执行一次
    解决的办法一个增加activated()函数,每次进入新页面的时候再获取一次数据（此处可以了解一下keep-alive状态下的activated()函数和			deactivated()函数）
    另外一个办法就是keep-alive中增加 exclud=“name”，移除选中页面的缓存
    <keep-alive exclude="name">
      <router-view />
    </keep-alive>
```









































































