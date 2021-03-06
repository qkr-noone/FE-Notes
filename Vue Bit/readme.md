### Vue 响应式原理

1. 文字表述
> * 通过 Object.defineProperty(obj, prop, descriptor) 进行对象属性依赖收集以及在 Dep 对象中增加一个 Watcher 的订阅
> * 在属性值 set 的时候，触发 Dep 的 notify (触发派发更新)
> * 将所有 Watcher 都放入 nextTick 中进行更新
> * nextTick 回调中执行用户 Watch 的回调函数并且渲染组件。

2. 具体实现细节
> * @import "./base-vue.md"
> * [mycode.js](./read-vue-2.6.11/mycode.js)
> * [26-31.js](../DALIY-STUDY/202008/26-31.js)
> * [26-31.js](../DALIY-STUDY/202008/26-31.js)
> * ![MVVM的双向绑定](./MVVM-binding.png)

### VueRouter 源码深度解析

#### 路由原理 (https://juejin.im/post/6844903647378145294)
在解析源码前，先来了解下前端路由的实现原理。 前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式

* hash 模式
* history 模式

#### Virtual Dom (https://juejin.im/post/6844903615652610055)

### 待查题目-解析
  * B. 祖孙组件之间可以使用 provide 和 inject 方式跨层级相互传值 （错误）
  * C. 若子组件使用 $emit('say') 派发事件，父组件可使用 @say 监听 （正确）
  * C. 可通过 beforeEnter 对单个组件进行路由守卫 （错误）
  * C. 可使用 this.$children 按顺序查找当前组件的直接子组件 （错误）
  * C. v-model 是内置指令，不能用在自定义组件上 （错误）