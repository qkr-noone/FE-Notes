# MVVM 双向绑定原理&实现 --- Vue
几种实现双向绑定的做法
实现数据绑定的做法有大致如下几种：

* 发布者-订阅者模式（backbone.js）
* 脏值检查（angular.js）
* 数据劫持（vue.js）

** 数据劫持:** vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
要实现mvvm的双向绑定，就必须要实现以下几点：
1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2. 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4. mvvm入口函数，整合以上三者
上述流程如图所示：
![MVVM的双向绑定](./MVVM-binding.png)
[参考：剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)

### Vue 三要素

[参考：实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.im/post/6844903601416978439)

* 响应式: 例如如何监听数据变化,其中的实现方法就是我们提到的双向绑定
* 模板引擎: 如何解析模板
* 渲染：Vue 如何将监听的数据变化和解析后的 HTML 进行渲染

### 基于数据劫持的双向绑定 --- Proxy 与 Object.defineProperty
Proxy 与 Object.defineProperty对对象/对象的属性进行“劫持”，在其发生变化后通知订阅者

1. Object.defineProperty生成的 Observer 针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者

2. 解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染

3. Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

先实现一个订阅发布中心，即消息管理员（Dep）,它负责储存订阅者和消息的分发,不管是订阅者还是发布者都需要依赖于它。


[具体实现](./read-vue-2.6.11/mycode.js)
[更加具体实现细节](https://juejin.im/post/6844903601416978439)
[Vue2.0响应式原理机制 - defineProperty 不用 class & 数组方法劫持 & 实例](https://www.cnblogs.com/fs0196/p/12691407.html)
### Vue 中 Object.defineProperty 缺陷
1. Object.defineProperty 只能对遍历过对象属性直接修改，无法监听对象
2. Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历

Vue 只针对了以上八种方法进行了hack处理,所以其他数组的属性也是检测不到的，还是具有一定的局限性
Vue 监听 push() pop() shift() unshift() splice() sort() reverse() 实现

### Proxy 取代它的优缺点
优点
1. 可以劫持整个对象，并返回一个新对象
2. Proxy 可以直接监听数组的变化
3. 有13种劫持操作

缺点：
1. 不能深度劫持对象属性
2. 可能会触发多次的数据劫持调用
### (如何实现一个 Event)[https://juejin.im/post/6844903587043082247]