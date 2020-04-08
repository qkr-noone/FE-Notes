{

  // 如何实现一个 Promise
  // https://juejin.im/post/5d0da5c8e51d455ca0436271
  // https://juejin.im/post/5bc5e114e51d450e632277aa
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function SetPromise(fn) {
    let _this = this
    _this.currentState = PENDING
    _this.value = undefined
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []

    _this.resolve = function (value) {
      if (value instanceof SetPromise) {
        // 待续
      }
    }
  }

  function spawn(genF) {
    return new Promise((resolve, reject) => {
      const gen = getF()
      function tem(nextF) {
        let next
        try {
          next = nextF()
        } catch (e) {
          return reject(e)
        }
        if (next.done) {
          return resolve(next.value)
        }
        Promise.resolve(next, value).then(
          function (v) {
            step(function () {
              return gen.next(v)
            })
          },
          function (e) {
            step(function () {
              return get.throw(e)
            })
          }
        )
      }
      step(function () {
        return gen.next(undefined)
      })
    })
  }

  /* OOP 继承六种方式 */
  // JavaScript深入之继承的多种方式和优缺点 https://github.com/mqyqingfeng/Blog/issues/16
  // 扩展 Class:  ES6 系列之 Babel 是如何编译 Class 的(下) https://juejin.im/post/5be2f3866fb9a04a0d5654ba


  /* 
    如何实现一个插件
      调用 apply 函数传入 compiler 对象
      通过 compiler 对象监听事件
  */

  //  比如你想实现一个编译结束退出命令的插件
  class BuildEndPlugin {
    apply(compiler) {
      const afterEmit = (compilation, cb) => {
        cb()
        setTimeout(function () {
          process.exit(0)
        }, 1000)
      }
      compiler.plugin('after-emit', afterEmit)
    }
  }
  module.exports = BuildEndPlugin


  // js 自定义事件
  window.onload = function () {
    var demo = document.getElementById('demo')
    demo.addEventListener('test', function () { console.log('12handler') })
    demo.addEventListener('test', function () { console.log('22handler') })
    demo.onclick = function () {
      this.triggerEvent('test')
    }
  }
  Element.prototype.addEvent = function (en, fn) {
    this.pools = this.pools || {}
    if (en in this.pools) {
      this.pools[en].push(fn)
    } else {
      this.pools[en] = []
      this.pools[en].push(fn)
    }
  }

  Element.prototype.triggerEvent = function (en) {
    if (en in this.pools) {
      let fns = this.pools[en]
      for (let i = 0; i < fns.length; i++) {
        fns[i]()
      }
    } else {
      return
    }
  }

}