// 实现 Promise https://zhuanlan.zhihu.com/p/21834559
function Promise(executor) {
  var self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined // // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // Promise reject 时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject) // 执行 executor 并传入相应的参数
  } catch (e) {
    reject(e)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理 & 值穿透
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          var x = onResolved(self.data)
          // if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          //   x.then(resolve, reject)
          // }
          // resolve(x) // 否则，以它的返回值做为promise2的结果
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e) // 如果出错，以捕获到的错误做为promise2的结果
        }
      })
    })
  }

  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数，就不再做过多解释
  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          var x = onRejected(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      });
    })
  }

  // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
  // 只能等到Promise的状态确定后，才能确实如何处理。
  // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
  // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
Promise.deferred = Promise.defer = function () {
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
// 以上未验证

// 如何停止一个Promise链？ https://github.com/xieranmaya/blog/issues/5