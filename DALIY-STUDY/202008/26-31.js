{
  // Dep 订阅发布中心 即消息管理员（Dep）,它负责储存订阅者和消息的分发,不管是订阅者还是发布者都需要依赖于它
  class Dep {
    constructor() {
      this.subs = []
    }
    addSub(sub) {
      this.subs.push(sub)
    }
    notify() {
      this.subs.forEach(sub => {
        sub.update()
      })
      console.log(`notify:`, this.subs) // notify: [Wathcher]
    }
  }

  // 为 Dep 类设置一个静态属性,默认为 null,工作时指向当前的 Watcher
  Dep.target = null

  // 依赖收集
  function defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function reactiveGetter() {
        dep.addSub(Dep.target)
        return val
      },
      set: function reactiveSetter(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        dep.notify()
      }
    })
  }

  function observe(value) {
    if (!value || (typeof value !== 'object')) {
      return
    }
    return new Observer(value)
  }
  // Observer 监听者 用于监听属性值的变化
  class Observer {
    constructor(target) {
      this.target = target
      this.walk(target)
    }
    // 遍历属性值并监听
    walk(target) {
      Object.keys(target).forEach(key => this.convert(key, target[key]))
    }
    // 
    convert(key, val) {
      defineReactive(this.target, key, val)
    }
  }

  // Wathcher 订阅者
  class Wathcher {
    constructor() {
      Dep.target = this
    }
    update() {
      console.log('updata over')
    }
  }

  class Vue {
    constructor(options) {
      this._data = options.data
      observe(this._data)
      new Wathcher()
      /* **** 重点 在这里模拟 render 的过程，为了触发 属性的 get 函数 */
      Object.keys(this._data).forEach(key => this._data[key])
      console.log('render~~')
    }
  }
  let demo = new Vue({
    data: {
      name: 'qkr',
      test: 'test something'
    }
  })
  // console.log(demo._data.name)
  demo._data.name = 'qkr007' // 视图更新
  demo._data.test = { next: 1221 } // 视图更新
  demo._data.test.next = 521 // 没有深度监听 视图不更新
}
// todo 尝试 存一个 [watcher] 失败

// recode
{
  // 发布中心
  class Dep {
    constructor() {
      this.subs = []
    }
    addSub(sub) {
      this.subs.push(sub)
    }
    notify() {
      this.subs.forEach(listener => listener.update())
    }
  }
  Dep.target = null
  // 订阅者 订阅 Dep 的信息
  class Watcher {
    constructor() {
      Dep.target = this
    }
    update() {
      console.log('update now')
    }
  }
  function defineReactive(obj, key, val) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function Getter() {
        // 添加订阅
        dep.addSub(Dep.target)
        return val
      },
      set: function Setter(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        // 更新
        dep.notify()
      },
    })
  }
  // 监听者 监听属性值变化
  class Observer {
    constructor(target) {
      this.target = target
      this.walk(target)
    }
    walk(target) {
      Object.keys(target).forEach(key => this.convert(key, target[key]))
    }
    convert(key, val) {
      defineReactive(this.target, key, val)
    }
  }
  function observe(target) {
    if (!target || typeof target !== 'object') {
      return
    }
    return new Observer(target)
  }
  class Vue {
    constructor(options) {
      this._data = options.data
      observe(this._data)
      new Watcher()
      Object.values(this._data).forEach(value => console.log(value))
      console.log('render')
    }
  }
  let demo = new Vue({
    data: {
      test: '123',
      name: 'qkr'
    }
  })
  demo._data.test = '122'
  demo._data.name = 'none'
}
