## 项目知识积累

### css 篇

1.  多行省略号

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

    元素需要设置为块状元素，display:block;
    多行省略号兼容：显示出来多一点点（兼容iphone手机）添加行高line-height，写max-height

2. 强制换行终极版

```css
overflow-wrap: break-word;
word-break: break-word;
word-wrap: break-word;
```

3.  8.底部按钮兼容安卓和 iPhoneX 的底部

```css
border-top: 1rpx solid #e6e7eb;
box-sizing: content-box;
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
position: fixed;
left: 20rpx;
bottom: 0rpx;
height: 90rpx;
width: 710rpx;
```

```css
 {
  height: calc(60px (假设值) + constant(safe-area-inset-bottom));
  height: calc(60px (假设值) + env(safe-area-inset-bottom));
}
```

env() 和 constant()
iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，有四个预定义的变量：

safe-area-inset-left：安全区域距离左边边界距离
safe-area-inset-right：安全区域距离右边边界距离
safe-area-inset-top：安全区域距离顶部边界距离
safe-area-inset-bottom：安全区域距离底部边界距离

4.  使用 calc 计算属性时候，运算符号之间要有空格

5.  input 框的光标和 placeholder 文字不对齐
    input 框的光标和 placeholder 文字不对齐，添加一个 line-height:nomal 解决

6.  文本超出省略号，需要再块级元素下，display：block

### js 篇

1. 一个类中 用 punlic 关键字，设置共有属性，private 关键字，设置私有属性

2. for-in 循环，for-in 循环遍历自身属性以及继承属性（可枚举属性）
   for-of 循环,for-of 循环只会遍历自身属性（可枚举）
   Object.assign({},{})将所有的可枚举属性从一个源对象或者多个源对象中分配到目标对象中，返回目标对象（可用来做浅拷贝）

3. async 定义一个异步函数，里面可以使用 await，await 后面跟一个异步函数（例如 promise 或者 async 函数）可以将这个异步操作转化为类似同步执行

4. 赋值和深浅拷贝（见深浅拷贝.html）
   如果是一个 object 数据，那么它的栈中存放的是一个指向堆的地址指针，数据的 value 存放在堆中，进行赋值操作的时候，赋值的是一个地址指针，数据更改会相互影响；浅拷贝的话是只复制数据的第一层，修改值只有第一层不会相互影响，深拷贝会复制多层，修改值时不会相互影响

5. 进程
   process.nextTick(callback)是为事件循环设置一项任务，node.js 会在下次事件循环调响应时调用 callback”.
   process.nextTick() 在同一个阶段立即执行
   setImmediate() 在事件循环的接下来的迭代或 'tick' 上触发。
   执行顺序
   process.nextTick----setImmediate()---setTimeout/setInterval
   这在开发 API 时非常重要，可以在构造对象之后但在发生任何 I/O 之前，为用户提供分配事件句柄的机会

6. 一个 url 解析
   https://www.example.com:80/path/to/myfile.html?key=1&&value=1#somnewhere
   https://是协议部分（scheme）
   www.example.com是域名部分，主机名（host）
   :80 是端口部分（port）
   /path/to/myfile.html 是路径部分（path）
   ?key=1&&value=1 是查询部分（search，query）
   #somewhere 是锚点部分（fragment）

### react 篇

1. 在 componentWillReceiveProps 等等容易造成死循环的生命周期中修改数据方案
   （1）通过添加一个状态来控制数据的渲染，当修改完数据同时将状态变为 false，然后就
   不会继续修改数据，避免死循环
   （2）通过比较 nextProps 与 this.props，来控制数据修改，避免一直修改造成死循环

### 经验篇

1. 数据的添加修改注入，如果是异步，而且没有同步方法的话，可以利用 setTimeout 解决（组件卸载需要删除定时器）

2. lodash 库使用
   lodash.isEqual(value, other)

3. react 生命周期各部分参数
4. 挂载卸载过程
   1.1.constructor()
   1.2.componentWillMount()
   1.3.componentDidMount()
   1.4.componentWillUnmount ()
5. 更新过程
   2.1. componentWillReceiveProps (nextProps)
   2.2.shouldComponentUpdate(nextProps,nextState)
   2.3.componentWillUpdate (nextProps,nextState)
   2.4.componentDidUpdate(prevProps,prevState)
   2.5.render()
6. React 新增的生命周期(个人补充)
   3.1. getDerivedStateFromProps(nextProps, prevState)
   3.2. getSnapshotBeforeUpdate(prevProps, prevState)

7. 需求：文本不超过四行，正常显示，超过四行显示展开更多，点击展开更多可以展开所有，并有收起展开
   方案一：父组件 position:relative，文本内容设置 line-height 等使其高度可知;展开更多组件 position:absolute,定位到父组件 top 值设置为想展示的高度，然后父组件的动态设置 overflow:hidden;max-height。当未超过四行时，max-height 生效，overflow:hidden 生效，就展示不出加载更多，当超过四行时自然就展示出了展开更多选项，点击展开更多控制 max-height 和 overflow:visible，高度自然撑开；点回去同理。

### 报错篇

1.  在编译的时候报找不到某个东西的情景，解决方案，有可能是路径有错误，检查路径，或者文件里面有些模块快未安装依赖，如果需要用就安装依赖，如果不需要用就直接删掉就好了，或者重新安装依赖

### 配置篇

1. 安装依赖包
   -g --global 表示全局安装，安装到操作系统中，任何项目中都可以使用
   -D --save-dev 表示局部安装，模块写到 devDependencies 中，表示开发环境依赖，不会发到线上去，例如打包的包之类的只需要在开发打包使用，不需要发到线上
   -S --save 表示局部安装，模块写到 dependencies 中，表示生产环境依赖，需要发布到生产环境中

关于自动格式化代码，vscode 下载插件，ESlint 和 Prettier
然后配置 vscode 的设置，打开 settings.json(设置里面)配置代码如下

```json
{
    "workbench.iconTheme": "vscode-icons",
    "editor.fontSize": 13,
    "css.completion.completePropertyWithSemicolon": false,
    "eslint.format.enable": true,
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    //配置prettier++
     // tab 大小为2个空格
    "editor.tabSize": 2,
     // 100 列后换行
    "editor.wordWrapColumn": 100,
     // 保存时格式化
    "editor.formatOnSave":true,
    // 开启 vscode 文件路径导航
    "breadcrumbs.enabled": true,
    // prettier 设置强制单引号
    "prettier.singleQuote": true,
    // prettier 设置语句末尾加分号
    "prettier.semi":true,
    // 选择 vue 文件中 template 的格式化工具
    "vetur.format.defaultFormatter.html": "prettyhtml",
    // 显示 markdown 中英文切换时产生的特殊字符
    "editor.renderControlCharacters": true,
    // 让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // 让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    // vetur 的自定义设置
    "vetur.format.defaultFormatterOpti
```

```json
{
  //主题设置
  "workbench.colorTheme": "Monokai",
  // 默认编辑器字号
  "editor.fontSize": 14,
  //是否自动换行
  "editor.wordWrap": "on",
  // tab几个缩进
  "editor.tabSize": 2,
  // 文件自动保存
  "files.autoSave": "afterDelay",
  // 自动格式化粘贴的代码
  "editor.formatOnPaste": true,
  // 在资源管理器删除内容时候是否进行用户提醒
  "explorer.confirmDelete": false,
  // 控制在资源管理器内拖放移动文件或文件夹时是否进行确认
  "explorer.confirmDragAndDrop": false,
  // 在资源管理器拖拽文件是否进行用户提醒
  "workbench.statusBar.visible": true,
  // 工作区缩放级别
  "window.zoomLevel": 0,
  // 重命名或移动文件时，启用或禁用自动更新导入路径
  "javascript.updateImportsOnFileMove.enabled": "always",
  // 启用/禁用导航路径
  "breadcrumbs.enabled": true,
  // 终端cmd字号
  "terminal.integrated.fontSize": 16,
  // 不检查缩进，保存后统一按设置项来设置
  "editor.detectIndentation": false,
  // 编辑器初始界面
  "workbench.startupEditor": "newUntitledFile",
  // 工作台状态栏是否可见
  "workbench.statusBar.feedback.visible": false,
  // 添加多个光标时候需要的快捷键
  "editor.multiCursorModifier": "ctrlCmd",
  // 自定义代码片段显示的位置
  "editor.snippetSuggestions": "top",
  "window.menuBarVisibility": "toggle",
  // 启用后，按下 TAB 键，将展开 Emmet 缩写。
  "emmet.triggerExpansionOnTab": true,
  // 控制编辑器在空白字符上显示符号的方式
  "editor.renderWhitespace": "all",
  // 控制编辑器是否应呈现空白字符
  "editor.renderControlCharacters": false,
  // 在文件和文件夹上显示错误和警告
  "problems.decorations.enabled": false,
  // html文件格式化程序
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.codeActionsOnSave": {
      // 禁止eslint对html进行校验
      "source.fixAll.eslint": false,
      // 禁止stylelint对html进行校验
      "source.fixAll.stylelint": false
    }
  },
  // 编辑器文件保存时的操作(MacOS：快捷键是 command + s ),并不能修复所有问题，多数还是需要手动修复
  //
  "editor.codeActionsOnSave": {
    // 文件保存时开启eslint自动修复程序
    "source.fixAll.eslint": true,
    // 文件保存时开启stylelint自动修复程序
    "source.fixAll.stylelint": true
  },
  // "[javascript]": {
  //     "editor.defaultFormatter": "vscode.typescript-language-features"
  // },

  // vscode-fileheader  -----settings begin-----

  // 文件作者
  "fileheader.Author": "JiaoShouf2e",
  // 文件最后修改者
  "fileheader.LastModifiedBy": "JiaoShouf2e",

  // vscode-fileheader  -----settings end-----

  //stylelint   -----settings begin-----

  // 防止编辑器内置linter与插件冲突设置
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  // 启用stylelint插件
  "stylelint.enable": true,

  //stylelint   -----settings end-----

  // eslint   -----settings begin-----

  // 是否为JavaScript文件开启eslint检测
  "eslint.enable": true,
  // 保存之后进行lint
  "eslint.run": "onSave",
  // 是否启用eslint的调试模式
  "eslint.debug": true
  // eslint   -----settings end-----
}
```
