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

}