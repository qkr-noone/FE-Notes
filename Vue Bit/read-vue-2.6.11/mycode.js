
/* 响应式系统 */
{  // Vue 是基于 Object.defineProperty 实现的响应式系统
  
    // 实现 observer (可观察的)
    
    // 模拟视图更新
    function cb(val) {
        /* 渲染视图 */
        console.log('视图更新了')
    }
    function defineReactive (obj, key, val) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter () {
                return val
            },
            set: function reactiveSetter (newVal) {
                if (newVal === val) {
                    return
                }
                val = newVal
                cb(newVal)
            }
        })
    }
    
    // 传入需要 响应式 的对象， 让属性通过 defineReactive 处理 （observer 会进行递归调用，这里去掉了）
    function observer (target) {
        if (!target || (typeof target !== 'object')) {
            return
        }
    
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key])
        })
    }
    
    // Vue 构造函数 对 options 的 data 进行处理
    class Vue {
        constructor (options) {
            this._data = options.data // options.data，就是平时我们在写 Vue 项目时组件中的 data 属性（实际上是一个函数，这里当作一个对象来简单处理）
            console.log('data', this._data, options)
            observer(this._data)
        }
    }
    
    // new 一个 Vue 对象 将会 data 中的数据进行「响应式」化
    let objVue = new Vue({
        data: {
            test: 'a test',
            name: 'qkr'
        }
    })
    // 视图更新
    objVue._data.test = 'hello' // 这里的 _data 和 构造函数的 this._data 是一致的，可以一起改为 new Vue() 中的 data，就会看起来是一致的
    objVue._data.name = 'qkrnoone、2020/4/14'
    console.log(objVue, 90)
}

/* 响应式系统的依赖收集追踪原理 */

{
    // 订阅者 Dep 主要作用是用来存放 Watcher 观察者对象
    /**
     * src\core\observer\dep.js
     * A dep is an observable that can have multiple
     * directives subscribing to it. 一个 dep 是一个可观察的对象，可以有多个订阅它的指令
     */
    class Dep {
        constructor () {
            // 用来存放 Watcher 对象的数组
            this.subs = []
        }

        // 在 subs 中添加一个 Watcher 对象
        addSub (sub) {
            this.subs.push(sub)
        }

        // 通知所有 Watcher 对象更新视图
        notify () {
            this.subs.forEach(sub => {
                sub.update()
            })
        }
    }
    function observer(target) {
        // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
        if (!target || (typeof target !== 'object')) {
            return
        }

        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key])
        })
    }

    /* 1. 用 addSub 方法可以在 Dep 对象中增加一个 Watcher 的订阅操作
       2. 用 notify 方法通知目前 Dep 对象的 subs 中所有 Watcher 对象触发更新操作
     */

    // 观察者 Watcher
    class Watcher {
        constructor () {
            // new 一个 Watcher 对象时 将该对象复制给 Dep.target, 在 get 中会用到
            Dep.target = this
        }

        // 更新视图的方法
        update () {
            console.log('视图更新了')
        }
    }

    // 为 Dep 类设置一个静态属性,默认为 null,工作时指向当前的 Watcher
    Dep.target = null

    // 依赖收集
    // 修改 defineReactive 以及 Vue 构造函数 来完成依赖收集
    function defineReactive (obj, key, val) {
        // 一个 Dep 类对象
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter () {
                // 将 Dep.target 即 当前 Watcher 对象存入 dep 的 subs 中
                dep.addSub(Dep.target)
                return val
            },
            set: function reactiveSetter (newVal) {
                if (newVal === val) {
                    return
                }
                val = newVal
                // 在 set 的时候触发 dep 的 notify 来通知所有的 Watcher 对象更新视图
                dep.notify()
            }
        })
    }

    class Vue {
        constructor (options) {
            this._data = options.data
            observer(this._data)
            /* 新建一个 Watcher 观察者对象，这时候 Dep.target 会指向这个Watcher对象 */
            new Watcher()
            /* 在这里模拟 render 的过程，为了触发 test 属性的 get 函数 */
            console.log('render~', this._data.test)
        }
    }

    let isVue = new Vue({
        data: {
            test: 'i am test',
            name: 'noone'
        }
    })
    isVue._data.test = 'Helloween'
    isVue._data.name = 'qkrnoone'

    Dep.target = null
}

