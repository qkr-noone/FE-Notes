/* 修改 data 中的数据后修改视图了。这里面其实就是一个“setter -> Dep -> Watcher -> patch -> 视图” 的过程。 */

/*
  Vue.js在默认情况下，每次触发某个数据的 setter 方法后，
  对应的 Watcher 对象其实会被 push 进一个队列 queue 中，
  在下一个 tick 的时候将这个队列 queue 全部拿出来 run （ Watcher 对象的一个方法，用来触发 patch 操作） 一遍
  */
let uid = 0
let test = 1
class Watcher {
  constructor() {
    this.id = ++uid
  }
  // 源码
  /* if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  */
  // 初始设定this.deep = this.user = this.lazy = this.sync = false，
  // 也就是当触发update更新的时候，会去执行queueWatcher方法
  update() {
    console.log('代码逻辑上的更新，储存到队列')
    queueWatcher(this)
  }

  run() {
    console.log('更新视图', test)
  }
}

let callbacks = []
let pending = false

function nextTick(cb) {
  callbacks.push(cb)

  if(!pending) {
    pending = true
    setTimeout(flushCallbacks, 0);
  }
}

function flushCallbacks() {
  console.log('开始执行异步队列')
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let has = {}
let queue = []
let waiting = false

// 刷新调度程序队列   就是 watcher 的视图更新
function flushSchedulerQueue() {
  let watcher, id

  for (let index = 0; index < queue.length; index++) {
    watcher = queue[index]
    console.log(queue)
    id = watcher.id
    has[id] = null
    watcher.run()
  }

  waiting = false
}
function queueWatcher(watcher) {
  const id = watcher.id

  // 把watcher push 进 queue
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)

    console.log(waiting)
    if (!waiting) {
      waiting = true
      console.log('tag')
      nextTick(flushSchedulerQueue)
    }
  }
}

(function () {
  let watch1 = new Watcher()
  let watch2 = new Watcher()

  for (let i = 0; i < 4; i++) {
    watch1.update()
    test++
  }
  watch2.update()
})()

/* 
microtast（微任务）：Promise， process.nextTick， Object.observe， MutationObserver

macrotask（宏任务）：script整体代码、setTimeout、 setInterval等
 */
/* 
vue中的nextTick是什么
官方定义
  在下次DOM更新循环结束之后执行的延迟回调。
  在修改数据之后立即使用该方法，获取更新后的DOM。
 */
// 解析 nextTick1 https://juejin.im/post/6844903599655370765
// 解析 nextTick2 https://juejin.im/book/6844733705089449991/section/6844733705236283405
// 官方代码解析 ../../DALIY-STUDY/202007/30-31.js line 170 ~ 260

// recode

let uuid = 0
let map = new Map() // 判断当前是否有 watcher 比遍历 store 效率上会高很多
let store = [] // 存放 watcher 队列
let waiting = false
let pending = false
let callbacks = [] // 存放 回调 队列
class Watcher {
  constructor() {
    this.id = uuid++
  }
  update() {
    // 这里更新有 同步异步策略 默认是异步
    console.log('adddddWatcher')
    addWatcher(this)
  }
  run() {
    console.log('runn')
  }
}
// nextTick 回避策略 把回到添加到回调数组
/* 异步队列 waiting 目的是保证一次执行一个 pending 的目的是保证当前异步执行完毕 */
function nextTick(cb) {
  callbacks.push(cb)
  // 检查上一个异步任务队列（即名为callbacks的任务数组）是否派发和执行完毕了。pending此处相当于一个锁
  if (!pending) {
    // 若上一个异步任务队列已经执行完毕，则将pending设定为true（把锁锁上）
    pending = true
    setTimeout(handleUpdate, 0)
  }
}
// 执行的回调数组
function callback() {
  pending = false
  const funs = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < funs.length; i++) {
    funs[i]()
  }
}
// 更新视图
function handleUpdate() {
  let watcher, id
  
  for (let i = 0; i < store.length; i++) {
    watcher = store[i]
    id = watcher.id
    map.delete(id)
    watcher.run()
  }

  console.log(store)
  waiting = false
}
// 添加 一个 id 对应的 Watcher 对象 到队列 store
function addWatcher(watcher) {
  
  if (!map.get(watcher.id)) {
    map.set(watcher.id, true)
    store.push(watcher)
    if (!waiting) {
      waiting = true
      nextTick(callback)
    }
  }
}
(function () {
  let watch1 = new Watcher()
  let watch2 = new Watcher()

  for (let i = 0; i < 4; i++) {
    watch1.update()
  }
  watch2.update()
})()