## 项目知识积累

### css篇

1.  多行省略号
```css
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
``` 
    多行省略号兼容：显示出来多一点点（兼容iphone手机）添加行高line-height，写max-height

2. 强制换行终极版
```css
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
```
3.  
8.底部按钮兼容安卓和iPhoneX的底部
```css
    border-top: 1rpx solid #E6E7EB;
    box-sizing: content-box;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    left:20rpx;
    bottom: 0rpx;
    height: 90rpx;
    width: 710rpx;
```
```css
  {
    height: calc(60px(假设值) + constant(safe-area-inset-bottom));
    height: calc(60px(假设值) + env(safe-area-inset-bottom));
  }
```
  env() 和 constant()
  iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，有四个预定义的变量：

  safe-area-inset-left：安全区域距离左边边界距离
  safe-area-inset-right：安全区域距离右边边界距离
  safe-area-inset-top：安全区域距离顶部边界距离
  safe-area-inset-bottom：安全区域距离底部边界距离

4.  使用calc计算属性时候，运算符号之间要有空格

5.  文本超出省略号，需要再块级元素下，display：block


### js篇

1. 一个类中 用punlic关键字，设置共有属性，private关键字，设置私有属性

2. for-in循环，for-in循环遍历自身属性以及继承属性（可枚举属性）
   for-of循环,for-of循环只会遍历自身属性（可枚举）
   Object.assign({},{})将所有的可枚举属性从一个源对象或者多个源对象中分配到目标对象中，返回目标对象（可用来做浅拷贝）

3. async定义一个异步函数，里面可以使用await，await后面跟一个异步函数（例如promise或者async函数）可以将这个异步操作转化为类似同步执行

4. 赋值和深浅拷贝（见深浅拷贝.html）
如果是一个object数据，那么它的栈中存放的是一个指向堆的地址指针，数据的value存放在堆中，进行赋值操作的时候，赋值的是一个地址指针，数据更改会相互影响；浅拷贝的话是只复制数据的第一层，修改值只有第一层不会相互影响，深拷贝会复制多层，修改值时不会相互影响


### react篇

1. 在componentWillReceiveProps等等容易造成死循环的生命周期中修改数据方案
    （1）通过添加一个状态来控制数据的渲染，当修改完数据同时将状态变为false，然后就
      不会继续修改数据，避免死循环
    （2）通过比较nextProps与this.props，来控制数据修改，避免一直修改造成死循环


### 小程序篇

1.  浏览器端和微信小程序页面跳转，兼容小程序页面跳转
```js
  public goToDetail() {
    console.log(this.props.fields)
    const { id,themeId } = this.props.fields;
    window.location.href=`/pages/activity_detail/index?articleId=${id}&activityType=${themeId}`;
    if (isWeChatMiniProgram) {
      const { id } = this.props.fields;
      wx.navigateTo({
        url: `/pages/activity_detail/index?id=${id}`,
      });
    }
  }

mport {authUser} from "@aliretail/cloud-retail-npm/lib/auth"
const res=await authUser(this
```
2.  小程序图片,循环遍历渲染多张图片控制控制宽高
    在小程序原生方法图片加载完成函数中通过传进去index，用数组接收，widthArr[index]=e.detail.width heightArr[index]=e.detail.height



### 经验篇

1. 数据的添加修改注入，如果是异步，而且没有同步方法的话，可以利用setTimeout解决（组件卸载需要删除定时器）

2. lodash库使用
lodash.isEqual(value, other)

3.  react生命周期各部分参数
  1. 挂载卸载过程
  1.1.constructor()
  1.2.componentWillMount()
  1.3.componentDidMount()
  1.4.componentWillUnmount ()
  2. 更新过程
  2.1. componentWillReceiveProps (nextProps)
  2.2.shouldComponentUpdate(nextProps,nextState)
  2.3.componentWillUpdate (nextProps,nextState)
  2.4.componentDidUpdate(prevProps,prevState)
  2.5.render()
  3. React新增的生命周期(个人补充)
  3.1. getDerivedStateFromProps(nextProps, prevState)
  3.2. getSnapshotBeforeUpdate(prevProps, prevState)

  4. 需求：文本不超过四行，正常显示，超过四行显示展开更多，点击展开更多可以展开所有，并有收起展开
      方案一：父组件position:relative，文本内容设置line-height等使其高度可知;展开更多组件position:absolute,定位到父组件top值设置为想展示的高度，然后父组件的动态设置overflow:hidden;max-height。当未超过四行时，max-height生效，overflow:hidden生效，就展示不出加载更多，当超过四行时自然就展示出了展开更多选项，点击展开更多控制max-height和overflow:visible，高度自然撑开；点回去同理。



### 报错篇

1.  在编译的时候报找不到某个东西的情景，解决方案，有可能是路径有错误，检查路径，或者文件里面有些模块快未安装依赖，如果需要用就安装依赖，如果不需要用就直接删掉就好了，或者重新安装依赖



