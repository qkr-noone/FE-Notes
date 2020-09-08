{
  /* 
  Reflect
  Reflect对象一共有 13 个静态方法。

  Reflect.apply(target, thisArg, args)
  Reflect.construct(target, args)
  Reflect.get(target, name, receiver)
  Reflect.set(target, name, value, receiver)
  Reflect.defineProperty(target, name, desc)
  Reflect.deleteProperty(target, name)
  Reflect.has(target, name)
  Reflect.ownKeys(target)
  Reflect.isExtensible(target)
  Reflect.preventExtensions(target)
  Reflect.getOwnPropertyDescriptor(target, name)
  Reflect.getPrototypeOf(target)
  Reflect.setPrototypeOf(target, prototype)
   */

  var myObject = {
    foo: 1,
    bar: 2,
    sbar: 8,
    del: 3,
    get baz() {
      return this.foo + this.bar
    },
    get recThis() {
      return this.foo + this.bar
    },
    set setbar(value) {
      return this.sbar = value
    }
  }
  var myRecThis = {
    foo: 3,
    bar: 4,
    sbar: 5
  }
  console.log(Reflect.get(myObject, 'foo')) // 1
  console.log(Reflect.get(myObject, 'baz')) // 3
  console.log(Reflect.get(myObject, 'recThis', myRecThis)) // 7
  // Reflect.get(1) // TypeError: Reflect.get called on non-object
  // Reflect.get(false) // TypeError: Reflect.get called on non-object
  console.log(myObject.sbar) // 8
  Reflect.set(myObject, 'sbar', 18)
  console.log(myObject.sbar) // 18
  Reflect.set(myObject, 'setbar', 28)
  console.log(myObject.sbar) // 28
  Reflect.set(myObject, 'setbar', 38, myRecThis)
  console.log(myObject.sbar, myRecThis.sbar) // 28 38
  // Reflect.set(1, 'foo', {}) // 报错
  // Reflect.set(false, 'foo', {}) // 报错
  /* 
  注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，
  而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。
  不传 receiver 不会触发
   */
  let p = {
    a: 'a'
  }
  let handler = {
    set(target, key, value, receiver) {
      console.log('set')
      Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
      console.log('defineProperty')
      Reflect.defineProperty(target, key, attribute)
    }
  }

  let obj = new Proxy(p, handler)
  obj.a = 'A'
  // set
  // defineProperty
  console.log(Reflect.has(myObject, 'del')) // true
  Reflect.deleteProperty(myObject, 'del')
  console.log(Reflect.has(myObject, 'del')) // false

  // Reflect.construct(target, args)
  function Greeting(name) {
    this.name = name
  }
  // new 写法
  const instance = new Greeting('qkr')
  // 主要 第二个参数 以数组形式传进去
  const instancess = Reflect.construct(Greeting, ['qkr007'])
  console.log(instance, instancess) // Greeting { name: 'qkr' } Greeting { name: 'qkr007' }

  // Reflect.getPrototypeOf(obj) 读取对象的__proto__属性
  // 旧写法
  console.log(Object.getPrototypeOf(instance) === Greeting.prototype) // true
  console.log(Reflect.getPrototypeOf(instance) === Greeting.prototype) // true

  // Reflect.setPrototypeOf(obj, newProto)
  console.log(myRecThis.length) // undefined
  Reflect.setPrototypeOf(myRecThis, Array.prototype)
  console.log(myRecThis.length) // 0
  console.log(Reflect.setPrototypeOf({}, null)) // true
  console.log(Reflect.setPrototypeOf(Object.freeze({}), null)) // false
  // Reflect.setPrototypeOf(1, {}) // Reflect.setPrototypeOf called on non-object

  // Reflect.apply(func, thisArg, args) 用于绑定 this 对象后执行给定函数
  const ages = [11, 22, 12, 54, 15, 96]
  const youngest = Math.min.apply(Math, ages);
  const oldest = Math.max.apply(Math, ages);
  const types = Object.prototype.toString.call(youngest);
  console.log(youngest, oldest, types) // 11 96 [object Number]

  const min = Reflect.apply(Math.min, Math, ages)
  const max = Reflect.apply(Math.max, Math, ages)
  const type = Reflect.apply(Object.prototype.toString, min, [])
  console.log(min, max, type) // 11 96 [object Number]

  // Reflect.defineProperty(target, propertyKey, attribute)
  Reflect.defineProperty(p, 'now', {
    value: () => Date.now()
  })
  console.log(p, p.now) // { a: 'A' } [Function: value]

  // Reflect.getOwnPropertyDescriptor(target, propertyKey)
  console.log(Reflect.getOwnPropertyDescriptor(p, 'now'))
  /*
  {
    value: [Function: value],
    writable: false,
    enumerable: false,
    configurable: false
  }
  */
  console.log(Reflect.isExtensible(p)) // true
  console.log(Reflect.preventExtensions(p)); // true
  console.log(Reflect.isExtensible(p)) // false
  console.log(Reflect.ownKeys(p)) // [ 'a', 'now' ]
  console.log(Reflect.ownKeys(myRecThis)) // [ 'foo', 'bar', 'sbar' ]

  // 实例：使用 Proxy 实现观察者模式
  // 观察者模式 （Observer mode） 指的是函数自动观察数据对象，
  // 一旦对象有变化，函数就会自动执行

  // 监听的队列
  const observerQueue = new Set()
  // 添加队列 且观察对象的回调函数作为标志符
  const observe = fn => observerQueue.add(fn)

  const observable = obj => new Proxy(obj, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      // 执行监听队列的回调函数
      observerQueue.forEach(observer => observer())
      return result
    }
  })

  // 拦截监听对象
  const person = observable({ name: 'qkr', age: 26 })
  // 对象变化执行的回调
  function print() {
    console.log(`${person.name}, ${person.age}`)
  }
  // 添加队列
  observe(print) // Set { [Function: print] }
  person.name = 'qkr007'
  // qkr007, 26
  /*
  上面代码中，数据对象person是观察目标，函数print是观察者。
  一旦数据对象发生变化，print就会自动执行。
  
  下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数
  思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
  
  上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。
  然后，observable函数返回原始对象的代理，拦截赋值操作。
  拦截函数set之中，会自动执行所有观察者。
  */
}

{
  /* 
  Promise
   */

  // 异步加载图片
  function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
      const image = new Image()

      image.onload = function () {
        resolve(image)
      }

      image.onerror = function () {
        reject(new Error('Could not load image at' + url))
      }

      image.src = url
    })
  }

  // Promise 对象实现 AJAX
  const getJSON = function(url) {
    const promise = new Promise((resolve, reject) => {
      const handler = function() {
        if (this.readState !== 4) {
          return
        }
        if (this.status === 200) {
          resolve(this.response)
        } else {
          reject(new Error(this.statusText))
        }
      }
      const client = new XMLHttpRequest()
      client.open('GET', url)
      client.onreadystatechange = handler
      client.responseType = 'json'
      client.setRequestHeader('Accept', 'application/json')
      client.send()
    })
    return promise
  }
  getJSON('/posts.json').then(function(json) {
    console.log(json, 'success')
  }, function (error) {
    console.log(error, 'error')
  })

  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('fail'))
    }, 3000)
  })
  const p2 = new Promise((resolve, reject) => {
    // resolve(p1)
    setTimeout(() => {
      resolve(p1)
      console.log(2)
    }, 1000)
  })
  p2.then(res => console.log(res)).catch(e => console.log(e))
  // 2
  // Error: fail

  process.on('unhandledRejection', function (err, p) {
    console.log(222222, err, p)
    // 222222 ReferenceError: x is not defined 
    // Promise { < rejected > ReferenceError: x is not defined }
    throw err;
  })
  const someAsyncThing = function() {
    return new Promise((resolve, reject) => {
      resolve(x + 2)
    })
  }
  someAsyncThing().then(() => console.log(333))
  setTimeout(() => { console.log(123) }, 2000)
  // 123
  // UnhandledPromiseRejectionWarning: ReferenceError: x is not defined

  const promise = new Promise((resolve, reject) => {
    resolve('ok')
    setTimeout(() => { throw new Error('test') }, 0)
  })
  promise.then((value) => { console.log(value) })
  // ok
  // Uncaught Error: test

  someAsyncThing()
    .catch(e => console.log('ooooee', e)) // ooooee ReferenceError: x is not defined
    .then(() => console.log('nice')) //nice

  // Promise.prototype.finall()
  const pr1 = () => new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    // reject(2)
  })
  pr1().finally(() => console.log('finally')) // 1 finally

  Promise.resolve(2).then(res => {console.log(res)})
  // 2
  // Promise {<fulfilled>: undefined} （resolved 的结果为 undefined）
  Promise.resolve(2).finally(() => {console.log(123)})
  // 123
  // Promise {<fulfilled>: 2} (resolved 的结果为 2)
  Promise.reject(3).then(() => { }, () => { })
  // Promise {<fulfilled>: undefined} (reject 的值是 undefined)
  Promise.reject(3).finally(() => { })
  // Promise {<rejected>: 3} (reject 的值是 3)

  // Promise.prototype.finally 的实现
  Promise.prototype.finally = function(callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    )
  }

  // Promise.all()
  const p1 = new Promise(resolve => {
    resolve(1)
  })
  const p2 = new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 3000)
  })
  const p3 = new Promise((resolve, reject) => {
    // resolve(3)
    reject('bad')
  })
  Promise.all([p1, p2, p3])
    .then(res => console.log(res)) // [ 1, 2, 3 ]
    .catch(e => console.log(e)) // bad

  // Promise.race()
  Promise.race([p1, p2, p3])
    .then(res => console.log(res)) // 1
    .catch(e => console.log(e)) // bad

  
  // ES2020 Promise.allSettled()  9.7 Node 还不支持
  const pros = Promise.allSettled([Promise.resolve(12), Promise.reject(33)])
  pros.then(res => console.log(res))
  /* 
  (2) [{…}, {…}]
    0: {status: "fulfilled", value: 12}
    1: {status: "rejected", reason: 33}
    length: 2
    __proto__: Array(0)
  */
  // Promise {<fulfilled>: undefined}
  const proMax = Promise.allSettled([p1, p2, p3])
  proMax.then(res => console.log(res))
  /*
  (3) [{…}, {…}, {…}]
    0: {status: "fulfilled", value: 1}
    1: {status: "fulfilled", value: 2}
    2: {status: "rejected", reason: "bad"}
    length: 3
    __proto__: Array(0)
  */
  // Promise {<fulfilled>: undefined}

  // Promise.any() 9.7
  Promise.any([p1, p2, p3]).then(res => console.log(res)) // 1
  Promise.any([Promise.reject(33), p3]).then(res => console.log(res))
  // AggregateError: All promises were rejected
  // Promise {<fulfilled>: undefined}

  // Promise.resolve() thenable 对象
  let thenable = {
    then (resolve, reject) {
      // resolve(42)
      reject(33)
    }
  }
  Promise.resolve(thenable)
    .then(res => console.log(res)) // 42
    .catch(e => console.log(e)) // 33

  // 让同步函数同步执行，异步函数异步执行
  const f = () => {
    console.log('now')
    // return Promise.reject(33)
  }
  Promise.resolve().then(f)
  console.log('next');
  // next
  // now

  // 方法一
  (async () => f())()
    .then(res => console.log(1, res)) // 1 undefined
    .catch(e => console.log(2, e)); // 2 33
  console.log('next zero')
  // next zero
  // now

  // 方法二
  const f = () => console.log('now');
  (
    () => new Promise(resolve => resolve(f()))
  )();
  console.log('next max');
  // now
  // next max

  // 方法三 Promise.try() 9.7 提案中 浏览器现在还未支持

  // Promise API 的实现
  // 实现 Promise.all
  Promise.newAll = function (promises){
    return new Promise((resolve, reject) => {
      // 状态是 rejected
      if (typeof promises[Symbol.iterator] !== 'function') {
        return reject(new TypeError(promises + ' is not iterable'))
      }
      let result = [], index = 0, len = promises.length
      // 状态是 fulfilled
      if (len === 0) {
        return resolve(result)
      }
      
      for (let i = 0; i < len; i++) {
        // 为什么不直接 promise[i].then，promise[i] 可能不是一个 promise 实例
        Promise.resolve(promises[i]).then(data => {
          // let 块级作用域 让 i 对应执行顺序
          console.log(i)
          result[i] = data
          index++
          if (index === len) resolve(result)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
  
  const p1 = new Promise((resolve, reject) => {
    // resolve(1)
    reject(1)
  })
  const p2 = new Promise((resolve, reject) => {
    // resolve(2)
    setTimeout(() => {
      // resolve(2)
      reject('bad')
    }, 3000)
  })
  const p3 = new Promise((resolve, reject) => {
    // resolve(3)
    reject('bad')
  })
  const p4 = Promise.resolve(4)
  const p5 = 'p5'
  const p6 = Promise.resolve()
  Promise.newAll([p1, p2, p3, p4, p5, p6])
    .then(res => console.log(80, res)) // 80 [ 1, 2, 3, 4, 'p5', undefined ]
    .catch(e => console.log(e)) // bad

  // 实现 Promise.race
  Promise.newRace = function (promises) {
    return new Promise((resolve, reject) => {
      // 状态是 rejected
      if (typeof promises[Symbol.iterator] !== 'function') {
        return reject(new TypeError(promises + ' is not iterable'))
      }
      let res = [], len = promises.length
      // 状态是 pending
      if (len === 0) return
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then(res => {
          return resolve(res)
        }).catch(err => {
          return reject(err)
        })
      }
    })
  }
  Promise.newRace([p1, p6, p2, p3, p4, p5])
    .then(res => console.log(70, res)) // 70 1
    .catch(e => console.log(33, e)) // 33 1

  // newAllSettled
  Promise.newAllSettled = function (promises) {
    return new Promise((resolve, reject) => {
      // 状态是 rejected
      if (typeof promises[Symbol.iterator] !== 'function') {
        return reject(new TypeError(promises + ' is not iterable'))
      }
      let res = [], index = 0, len = promises.length
      // 状态是 fulfilled
      if (len === 0) {
        return resolve([])
      }
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then(item => {
          res[i] = { status: 'fulfilled', value: item}
          index++
          if (index === len) {
            return resolve(res)
          }
        }).catch(err => {
          index++
          res[i] = { status: 'rejected', reason: err }
          if (index === len) {
            return resolve(res)
          }
        })
      }
    })
  }

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
      setTimeout(function() { // 异步执行所有的回调函数
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
  Promise.prototype.then = function(onResolved, onRejected) {
    var self = this
    var promise2

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理 & 值穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function (value) {return value}
    onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {throw reason}

    if (self.status === 'resolved') {
      // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
      // 因为考虑到有可能throw，所以我们将其包在try/catch块里
      return promise2 = new Promise(function(resolve, reject) {
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
        self.onResolvedCallback.push(function(value) {
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

}

{
  /* 
  Iterator 和 for...of 
   */
  function makeIterator(array) {
    var nextIndex = 0
    return {
      next: function(){
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {done: true}
      }
    }
  }
  var it = makeIterator([1, 2])
  console.log(it.next()); // { value: 1, done: false }
  console.log(it.next().value); // 2
  console.log(it.next()); // { done: true }

  const obj = {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          return {
            value: 1,
            done: true
          }
        }
      }
    }
  }
  class RangeIterator {
    constructor(start, stop) {
      this.value = start
      this.stop = stop
    }
    [Symbol.iterator]() {
      return this
    }
    next() {
      var value = this.value
      if (value < this.stop) {
        this.value++
        return {done: false, value: value}
      }
      return {done: true, value: undefined}
    }
  }

  function range(start, stop) {
    return new RangeIterator(start, stop)
  }

  for (const value of range(0, 3)) {
    console.log(value) // 0 1 2
  }

  // 通过遍历器实现指针结构的例子
  function Obj(value) {
    this.value = value
    this.next = null
  }
  Obj.prototype[Symbol.iterator] = function () {
    var iterator = {next: next}
    var current = this

    function next() {
      if (current) {
        var val = current.value
        current = current.next
        return {done: false, value: val}
      } else {
        { done: true}
      }
    }
    return iterator
  }

  var one = new Obj(1)
  var two = new Obj(2)
  var three = new Obj(3)
  one.next = two
  two.next = three
  console.log(one, two, three);
  /*
  Obj {
    value: 1,
    next: Obj { value: 2, next: Obj { value: 3, next: null } }
  Obj { value: 2, next: Obj { value: 3, next: null } }
  Obj { value: 3, next: null }
  } */
  for (const i of one) {
    console.log(i); // 1 2 3
  }

  // 另一个为对象添加 Iterator 接口的例子
  let obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
      const self = this
      let index = 0
      return {
        next() {
          if (index < self.data.length) {
            return { done: false, value: self.data[index++] }
          } else {
            return { done: true, value: undefined }
          }
        }
      }
    }
  }
  for (const v of obj) {
    console.log(v) // hello world
  }

  // 类似数组 部署 Iterator 接口
  NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
  // or
  NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]
  // 另一种
  let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  }
  for (const item of iterable) {
    console.log(item); // a b c
  }

  // 解构赋值
  let set = new Set().add(1).add('b').add('三')
  let [x, y] = set
  console.log(x, y); // 1 b
  let [first, ...rest] = set
  console.log(first, rest); // 1 [ 'b', '三' ]

  // 扩展运算符
  var str = 'asdf'
  console.log([...str]); // [ 'a', 's', 'd', 'f' ]
  let arr = ['b', 'c']
  console.log(['a', ...arr, 'd']); // [ 'a', 'b', 'c', 'd' ]
  
  // yield*
}