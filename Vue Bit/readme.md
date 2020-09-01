### Vue 响应式原理
1. 文字表述
> * - 通过 Object.defineProperty(obj, prop, descriptor) 进行对象属性依赖收集以及在 Dep 对象中增加一个 Watcher 的订阅
> * - 在属性值 set 的时候，触发 dep 的 notify 
* - Dep 的 notify 来通知所有的 Watcher 对象 ->  更新视图->  nextTick 更新循环结束之后执行的延迟回调