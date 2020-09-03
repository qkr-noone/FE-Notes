
/* 数组的解构赋值 */
// 数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
function* fibs() {
  let [a, b] = [0, 1]
  while (true) {
    yield a;
    [a, b] = [b, a + b]
    console.log(a, b)
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs()
console.log(first, second, third, fourth, fifth, sixth)

// 默认值
let [boo = true] = []
console.log(boo)
let [x, y = 'b'] = ['a']
console.log(x, y)

// ES6 内部使用严格相等运算符 ===  判断一个位置是否有值。所以，如果一个数组成员不严格等于 undefined，默认值是不会生效的。
let [x, y = 'b'] = ['a', undefined] // 注意 默认值和 undefined
console.log(x, y) // a b

// 即 数组成员严格等于 undefined，默认值会生效
let [x = 1] = [undefined]
console.log(x) // 1

// null不严格等于 undefined，默认值是不会生效的
let [x = 1, z] = [null, false]
console.log(x, z) // null false

// 表达式惰性求值，即用到时才会求值
// x 可以取到值，f 不会执行
function f() {
  console.log(12)
  return 33
}
let [x = f()] = [1]
console.log(x) // 1

// 等价于
let x
if ([1][0] === undefined) {
  x = f()
} else {
  x = [1][0]
}
console.log(x)

// 默认值可以应用解构赋值的其他变量，但该变量必须已经声明
let [x = 1, y = x] = []
console.log(x, y) // 1 1
let [x = 1, y = x] = [2]
console.log(x, y) // 2 2
let [x = 1, y = x] = [1, 2]
console.log(x, y) // 1 2
let [x = y, y = 1] = []
console.log(x, y) // ReferenceError: Cannot access 'y' before initialization

/* 对象的解构赋值 */
let { bar, foo } = { foo: 'as', bar: 'bss' }
console.log(bar, foo) // bss as

let obj = { foo: 'as', bar: 'bss' }
let { foo: f, bar: b } = obj
console.log(f, b) // as bss
// 对象的解构赋值内部机制是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
console.log(baz) // aaa
console.log(foo) // ReferenceError: foo is not defined

// 可用于嵌套结构的对象
let obj = {
  p: [
    'hello',
    { y: 'world' }
  ]
}
let { p: [x, { y }] } = obj
console.log(x, y) // hello world

// p 是模式，不是变量，想要 p 也作为变量赋值，可以写成下面这种
let obj = {
  p: [
    'hello',
    { y: 'world' }
  ]
}
let { p, p: [x, { y }] } = obj
console.log(x, y, p) // hello world [ 'hello', { y: 'world' } ]

let node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
}
let { loc, loc: { start }, loc: { start: { line } } } = node
console.log(loc, start, line)
// { start: { line: 1, column: 5 } } { line: 1, column: 5 } 1

// 对象解构指定默认值
var { x = 3, y = 5 } = { x: 1 }
console.log(x, y) // 1 5
var { x: y = 5 } = {}
console.log(y) // 5
var { x: y = 5 } = { x: 8 }
console.log(y) // 8
// 默认值生效的条件是，对象的属性值严格等于 undefined
var { x = 3 } = { x: undefined }
console.log(x) // 3
var { x: y = 5 } = { x: undefined }
console.log(y) // 5
var { x = 3 } = { x: null }
console.log(x) // null

let { log, sin, cos } = Math
console.log(log, sin, cos) // [Function: log] [Function: sin] [Function: cos]

let arr = [1, 2, 3]
let { 0: first, [arr.length - 1]: last } = arr
console.log(first, last) // 1 3

/* 字符串解构赋值 => 因为此时字符串被转成一个类似数组的对象 */
const [a, b, c, d] = '12345'
console.log(a, b, c, d) // 1 2 3 4

// 类似数组的对象有一个 length 属性，因为还可以对这个属性进行解构赋值
let { length: len } = 'hello'
console.log(len) // 5

/* 数值和布尔值的解构赋值 */
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。

// 数组和布尔值的包装对象都有 toString 属性，因此变量 s 都可以取到值。
let { toString: s } = 122
console.log(s, s === Number.prototype.toString) // [Function: toString] true
let { toString: s } = true
console.log(s, s === Boolean.prototype.toString) // [Function: toString] true

// 由于 undefined 和 null 无法转为对象，所以对它们进行解构时都会报错。
let { prop: x } = undefined
// TypeError: Cannot destructure property 'prop' of 'undefined' as it is undefined.
let { prop: y } = null // TypeError:

/* 函数的参数解构赋值 */
function add([x, y]) {
  return x + y
}
console.log(add([1, 2])) // 3

console.log([[1, 2], [3, 4]].map(([a, b]) => a + b)) // [3, 7]

function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}
console.log(move({ x: 3, y: 8 })) // [ 3, 8 ]
console.log(move({ x: 3 })) // [ 3, 0 ]
console.log(move()) // [ 0, 0 ]

// 区别于
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y]
}
console.log(move({ x: 3, y: 8 })) // [3, 8]
console.log(move({ x: 3 })) // [3, undefined]
console.log(move({})) // [undefined, undefined]
console.log(move()) // [ 0, 0 ]
// 上面的代码是为函数 move 的参数指定默认值，而不是为变量 x 和 y 指定默认值， 所以得到不一样的结果

/* 用途 */
// 交换变量  函数返回多个值  函数参数  提取 JSON  函数参数默认值  遍历 Map 结构  输入模块的指定方法

let x = 1;
let y = 2; // 这里需要 ; 分割
[x, y] = [y, x]
console.log(x, y) // 2 1

var map = new Map()
map.set('f', 'hello')
map.set('s', '999')
for (const [key, value] of map) {
  console.log(key + ' is ' + value)
}
// f is hello
// s is 999
// 只获取键名 键值
for (const [key] of map) {
  console.log(key) // f s
}
for (const [, value] of map) {
  console.log(value) // hello 999
}

// const { SourceCon, SourceNode } = require('source-map')

// 最小硬币数
// 1 5 11

function getMin(n) {
  if (n <= 0) return 0

  const dp = new Array(n + 1).fill(0)

  for (let i = 1; i <= n; i++) {
    let mid = []
    if (i - 1 >= 0) {
      mid.push(dp[i - 1])
    }
    if (i - 5 >= 0) {
      mid.push(dp[i - 5])
    }
    if (i - 11 >= 0) {
      mid.push(dp[i - 11])
    }
    dp[i] = Math.min(...mid) + 1
  }
  console.log(dp)
  return dp[n]
}
console.log(getMin(20))

/* 参考 https://www.bilibili.com/video/BV1aT4y1J7na?from=search&seid=15992988471669380574 7:30 前后 */
// 镜像 文件 min_coins.py
function coinMin(coins, target) {

  if (target <= 0) return 0

  const dp = new Array(target + 1).fill(0)

  for (let i = 1; i < target + 1; i++) {
    let mid = []
    for (let j = 0; j < coins.length + 1; j++) {
      if (i - coins[j] >= 0) {
        mid.push(dp[i - coins[j]])
      }
    }
    dp[i] = Math.min(...mid) + 1
  }
  console.log(dp)
  return dp[target]
}
console.log(coinMin([1, 2, 5], 120))

/* 参考 https://leetcode-cn.com/problems/coin-change-2/solution/518-ling-qian-dui-huan-ii-you-hua-dong-tai-gui-hua/ */
var change = function (amount, coins) {
  if (amount === 0) return 1

  const dp = [1].concat(Array(amount).fill(0))
  // const dp = Array(amount + 1).fill(0)
  // dp[0] = 1

  for (let i = 0; i < coins.length; i++) {
    for (let j = 1; j < amount.length + 1; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j - coins[i]]
      }
    }
  }

  return dp[dp.length - 1]
}
console.log(change(8, [1, 2, 5]))


// Promise 基础

const promise = new Promise(function(resolve, reject) {
  const temp = 2
  if (temp > 4) {
    resolve(temp)
  } else {
    reject(temp)
  }
})
// Promise 实例生成以后，可以用 then 方法分别制定 Resolved 状态和 Rejected 状态的回调函数。
promise.then(function (value) {
  console.log(value)
}, function (error) {
  console.log(error)
})

function timeout (ms) {
  return new Promise((resolve, reject) => {
    // setTimeout 第三个参数 定时器到期，会作为参数传递给 setTimeout 回调函数
    setTimeout(resolve, ms, 'done')
  })
}
timeout(100).then((value) => {
  console.log(value)
})

let promise = new Promise((resolve, reject) => {
  console.log('Promise')
  resolve()
})
promise.then(() => {
  console.log('Resolved')
})
console.log('End')
// Promise
// End
// Resolved

// 异步加载图片
function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      resolve(image)
    }

    image.onerror = function () {
      reject(new Error('load image error:' + url))
    }

    image.src = url
  })
}
loadImageAsync('https://img.app178.com/app/202008/1059336/logo.png')
// Promise {<pending>}
// {
//   __proto__: Promise
//   [[PromiseStatus]]: "fulfilled"
//   [[PromiseValue]]: img
// }

loadImageAsync('hsasdg')
// Promise {<pending>}
//   __proto__: Promise
//   [[PromiseStatus]]: "rejected"
//   [[PromiseValue]]: Error: load image error:hsasdg


// Promise 实现 Ajax
const getJSON = function (url) {
  const promise = new Promise(function(resolve, reject) {

    const handler = function () {
      if (this.readyState !== 4) {
        return;
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

getJSON('url').then(json => {
  console.log(json)
}, error => {
  console.log(error)
})

// 实现一个 Promise.or() 方法
/* 
  要求： 参数是 promise 数组
  返回数组中的索引靠前成功的 res
  当 n - 1 个 promise 失败时，直接返回它
  类似 或运算
 */

Promise.or = function (promises) {
  let length = promises.length;
  let i = 0;
  return new Promise((resovle, reject) => {
    help(resovle, reject);
  })

  function help(resolve, reject) {
    promises[i].then(res => {
      resolve(res);
    }).catch(e => {
      if (i === length - 1) return reject(e);
      else {
        i++;
        help(resolve, reject);
      }
    })
  }
}

// 同一个拦截器函数可以设置多个操作
var handler = {
  get: function (target, name) {
    if (name === 'prototype') {
      return Object.prototype
    }
    return 'hello' + name
  },
  apply: function(target, thisBinding, args) {
    return args[0]
  },
  construct: function(target, args) {
    return {value: args[1]}
  }
}
var fproxy = new Proxy(function(x, y) {
  return x + y
},handler)
console.log(fproxy(1, 2)) // 1
console.log(new fproxy(1, 2)) // { value: 2 }
console.log(fproxy.prototype === Object.prototype) // true
console.log(fproxy.foo) // hellofoo

var person = {
  name: 'qkr'
}
var proxy = new Proxy(person, {
  get(target, property) {
    if (property in target) {
      return target[property]
    } else {
      throw new ReferenceError('property \'' + property + '\' does not exist')
    }
  }
})
console.log(proxy.name) // qkr
console.log(proxy.namess) // ReferenceError: property 'namess' does not exist

// 拦截数组
function creatArray(...ele) {
  let handler = {
    get(target, key, receiver) {
      let index = Number(key)
      if (index < 0) {
        key = String(target.length + index)
      }
      return Reflect.get(target, key, receiver)
    }
  }
  let target = []
  target.push(...ele)
  return new Proxy(target, handler)
}
console.log(creatArray(1, 3, 5)[-1]) // 5

// 链式效果
var pipe = (function(){
  return function (value) {
    var funcStack = []
    var oproxy = new Proxy({}, {
      get: function (pipeObject, fnName) {
        if(fnName === 'get') {
          return funcStack.reduce(function (val,fn) {
            return fn(val)
          }, value)
        }
        funcStack.push(window[fnName])
        return oproxy
      }
    })
    return oproxy
  }
}())
var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split('').reverse().join('') | 0
console.log(pipe(3).double.pow.reverseInt.get) // 63

// apply 拦截函数的调用 call apply 操作
var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments)
  }
}

// 例如
var target = function () { return 12}
var handler = {
  apply: function () {
    return 'proxy ...'
  },
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}
var p = new Proxy(target, handler)
console.log(p()) // proxy ...
var target2 = function () { return 12 }
var p2 = {sa: 2}
console.log('_sa' in p2) // false
console.log('sa' in p2) // true

// call apply 直接调用
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}
function sum(left, right) {
  return left + right
}
var proxy = new Proxy(sum, twice)
console.log(proxy(1, 2), proxy.call(null, 5, 6), proxy.apply(null, [5, 8])) // 6 22 26
// 直接调用 Reflect.apply 也会被拦截
console.log(Reflect.apply(proxy, null, [9, 10]))

// has 拦截 HasProperty 操作 判断对象是否具有某个属性时，这个方法会生效，典型操作就是 in 运算符
var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}
var target = {_prop: 'foo', prop: 'foo'}
var proxy = new Proxy(target, handler)
console.log('_prop' in proxy) // false

// 如对象不可配置扩展 has 会拦截报错
var obj = {a: 10}
Object.preventExtensions(obj)
var p = new Proxy(obj, {
  has: function(target, prop) {
    return false
  }
})
'a' in p // TypeError ... the proxy target is not extensible

// has 对 for...in 循环不生效， 导致不符合要求的属性么有被排除在 for...in 循环之外
let stu1 = { name: '张三', score: 59 };
let stu2 = { name: '李四', score: 99 };
let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    console.log(12)
    return prop in target;
  }
}
let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);
console.log('score' in oproxy1) // 张三 不及格 fasle
for (let a in oproxy1) {
  console.log(oproxy1[a]); // 张三 59
}

for (const b in oproxy2) {
  console.log(oproxy2[b]) // 李四 99
}
// construct 用于拦截 new 命令, construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function() {}, {
  construct: function (target, args) {
    console.log('called:' + args.join(', '))
    return {value: args[0] * 10}
  }
});
console.log((new p(1)).value)
// called:1
// 10

// deleteProperty() 拦截delete
var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  },
  deleteProperty(target, key) {
    invariant(key, 'delete')
    delete target[key]
    return true
  },
  defineProperty(target, key, descriptor) {
    return false
  },
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === '_') {
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  },
  ownKeys(target) {
    return ['prop']
  },
  preventExtensions(target) {
    // 防止出现问题 方法里面，调用一次
    Object.preventExtensions(target);
    return true
  }
}
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
var target = { _prop: 'foo', prop: 'foo' }
var proxy = new Proxy(target, handler)
// console.log(delete proxy.prop, target) // true { _prop: 'foo' }
// 法抛出错误或者返回false，当前属性就无法被delete命令删除。
// delete proxy._prop // Error: Invalid attempt to delete private "_prop" property

// defineProperty() 拦截 Object.defineProperty()
proxy.baz = 'bar' // 不会生效
console.log(1, target) // 1 { _prop: 'foo', prop: 'foo' }

// getOwnPropertyDescriptor() 拦截 Object.getOwnPropertyDescriptor(), 返回对象或者 undefined
console.log(Object.getOwnPropertyDescriptor(proxy, 'wat')) // undefined
console.log(Object.getOwnPropertyDescriptor(proxy, '_prop')) // undefined
console.log(Object.getOwnPropertyDescriptor(proxy, 'prop'))
// { value: 'foo', writable: true, enumerable: true, configurable: true }

{
  // getPrototypeOf() 拦截对象原型，返回值必须是对象或者null，否则报错
  /* 具体包括
    Object.prototype.__proto__
    Object.prototype.isPrototypeOf()
    Object.getPrototypeOf()
    Reflect.getPrototypeOf()
    instanceof
  */

  // isExtensible() 拦截 Object.isExtensible()操作

  // ownKeys() 方法用来拦截对象自身属性的读取操作。
  /* 具体包括
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for...in循环 */
}
console.log(Object.keys(proxy)) // [ 'prop' ]

// preventExtensions()方法拦截Object.preventExtensions() 返回一个布尔值，否则会被自动转为布尔值。
// console.log(Object.preventExtensions(proxy)) // // Uncaught TypeError: 'preventExtensions' on proxy:
// console.log(Object.isExtensible(proxy)) //true
console.log(Object.preventExtensions(proxy)) // { _prop: 'foo', prop: 'foo' }

// setPrototypeOf() 拦截 Object.setPrototypeOf() 只能返回布尔值，否则会被自动转为布尔值

// Proxy.revocable() 返回一个可取消的 Proxy 实例
// revoke 撤销  revocable 可撤销的
/* Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，
必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。 */
let target = {}
let handler = {}
let { proxy, revoke } = Proxy.revocable(target, handler)
proxy.foo = 1213
console.log(proxy.foo) // 1213
revoke()
console.log(proxy.foo) // TypeError: ... has been revoked

// this 问题 Proxy 代理下，目标对象内部的 this 关键字会指向 Proxy 代理
const target = {
  m: function () {
    console.log(this === proxy)
  }
}
const handler = {}
const proxy = new Proxy(target, handler)
target.m() // false
proxy.m() // true

const _name = new WeakMap()
class Person {
  constructor(name) {
    _name.set(this, name)
  }
  get name() {
    return _name.get(this)
  }
}
const jane = new Person('Jane')
console.log(jane.name) // Jane

const proxy = new Proxy(jane, {})
console.log(proxy.name) // undefined  通过proxy.name访问时，this指向proxy, 导致无法取到值，所以返回undefine
// 有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);
// getDate() 方法只能在 Date 对象实例上面拿到，如果 this 不是 Date 对象实例就会报错
proxy.getDate(); // TypeError: this is not a Date object.
// this 绑定原始对象，就可以解决这个问题。
const target = new Date('2020-08-30')
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target)
    }
    if (prop === 'getMonth') {
      return target.getMonth.bind(target)
    }
    return Reflect.get(target, prop)
  }
}
const proxy = new Proxy(target, handler)
console.log(proxy.getDate(), proxy.getMonth()) // 30 7

// 实例 Web 服务的客户端  Proxy 对象可以拦截目标对象的任意属性
const service = createWebService('http://example.com/data')
service.employees().then(json => { // employees 雇员
  const employees = JSON.parse(json)
  // ...
})
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl + '/' + propKey)
    }
  })
}