### 响应式系统的基本原理
  #### Object.defineProperty
    Vue.js 基于其实现响应式系统
    <p>
      Object.defineProperty(obj, prop, descriptor)
      desciptor 一些属性
        enumerable 是否可可枚举 默认false
        configurable 属性是否可以被修改或者删除 默认false
        get 获取属性的方法
        set 设置属性的方法
    </p>
  #### 实现 observer (可观察的)
  `
    function cb (val) {
        // 渲染视图
        console.log('更新了')
    }
  `
  function defineReative (obj, key, val) {
      Object.defineProperty(obj, key, {
          enumberable: true,
          configurable: true,
          get: function reactiveGetter () {
              return val
          },
          set: function reactiveSetter (newVal) {
              if (newVal === val) return
              cb(newVal)
          }
      })
  }

  function observer (target) {
      if (!target|| (typeof target !== 'object')) {
          return;
      }
      Object.keys(target).forEach(key => {
          defineReative(target, key, value[key])
      })
  }

  class Vue {
      // Vue构造类
      constructor(options) {
          this._data = options.data
          observer(this._data)
      }
  }

  let o = new vue({
      data: {
          test: "asdfa"
      }
  })
  o.data.test = "hello,world."

<img src="./Vue 概述.jpg" width="400" height="auto"/>