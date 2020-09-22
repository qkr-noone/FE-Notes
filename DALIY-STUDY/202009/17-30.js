// 关于defer和async的原理 
// 为什么给要script标签添加 async 或 defer？
// https://juejin.im/post/6844903875653140494
// https://juejin.im/post/6869314860245745678

// 实现 Promise
/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */
class Promise {
  constructor(executor) {
    this.onFullfilleds = []
    this.onRejecteds = []
    this.state = 'pending'

    const self = this

    function resolve(value) {
      if (self.state === 'pending') {
        self.state = 'fulfilled'
        self.value = value
        self.onFullfilleds.forEach(callback => callback())
      }
    }
    function reject(reason) {
      if (self.state === 'pending') {
        self.state === 'rejected'
        self.reason = reason
        self.onRejecteds.forEach(callback => callback())
      }
    }

    try {
      executor()
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const self = this
    const promise2 = new Promise((resolve, reject) => {
      self.onFullfilleds.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value)
            if (x instanceof Promise) {
              x.then(val => resolve(val))
            } else {
              resolve(x)
            }
          } catch (error) {
            reject(error)
          }
        })
      })

      self.onRejecteds.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason)
            if (x instanceof Promise) {
              x.then(val => resolve(val))
            } else {
              resolve(x)
            }
          } catch (error) {
            reject(error)
          }
        });
      })
    })
    return promise2
  }
}

// JSError 错误日志