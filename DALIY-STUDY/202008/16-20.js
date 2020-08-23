/*
js 中什么是 softbind，如何实现
  https://segmentfault.com/q/1010000006223479
  https://juejin.im/post/6844903609126092813
*/
Object.defineProperty(Object, '__proto', {
  get () {
    return Object.getPrototypeOf(Object(this))
  },
  set (proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(proto) || !isObject(this)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) throw new TypeError()
  }
})
function isObject () {
  return Object(value) === value
}

function getOwnPropertyDescriptors (obj) {
  const res = []
  for (const key of obj) {
    res[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return res
}

function deepBaseCopy(target) {
  if (typeof target === 'object') {
    let closeTarget = {}
    for (const key in target) {
      closeTarget[key] = deepBaseCopy(target[key])
    }
    return closeTarget
  } else {
    return target
  }
}

// 考虑数组
function deepObjArrCopy(target) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    for (const key in target) {
      clone[key] = deepObjArrCopy[target[key]]
    }
    return clone
  } else {
    return target
  }
}

// 循环引用 内存溢出
function deepMapCopy(target, map = new Map()) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    if (map.has(target)) {
      return map.get(target)
    } else {
      map.set(target, clone)
    }
    for (const key in target) {
      clone[key] = deepMapCopy(target[key], map)
    }
    console.log(map)
    return clone
  } else {
    return target
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target
console.log(deepMapCopy(target))

// WeakMap
function deepWeakMapCopy(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    if (map.has(target)) {
      return map.get(target)
    } else {
      map.set(target, clone)
    }
    for (const key in target) {
      clone[key] = deepWeakMapCopy(target[key], map)
    }
    return clone
  } else {
    return target
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target
console.log(deepWeakMapCopy(target))

// 性能优化
function toforEach(array, iterate) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iterate(array[index], index);
  }
  return array;
}

function clonePerformance(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}

    if (map.has(target)) return map.get(target)
    else map.set(target, cloneTarget)

    const keys = isArray ? undefined : Object.keys(target)
    toforEach(keys || target, (value, key) => {
      if (keys) key = value
      cloneTarget[key] = clonePerformance(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target
console.log(clonePerformance(target)) // time 0.147


// 尤雨溪版
function find(list, f) {
  return list.filter(f)[0]
}

function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => copy[key] = deepCopy(obj[key], cache))

  return copy
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target
console.log(deepCopy(target)) // time 0.15

// 高性能版
const MY_IMMER = Symbol('my-immer1')

const isPlainObject = value => {
  if (
    !value ||
    typeof value !== 'object' ||
    {}.toString.call(value) != '[object Object]'
  ) {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor == 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
    Function.prototype.toString.call(Object)
  )
}

const isProxy = value => !!value && !!value[MY_IMMER]

function produce(baseState, fn) {
  const proxies = new Map()
  const copies = new Map()

  const objectTraps = {
    get(target, key) {
      if (key === MY_IMMER) return target
      const data = copies.get(target) || target
      return getProxy(data[key])
    },
    set(target, key, val) {
      const copy = getCopy(target)
      const newValue = getProxy(val)
      // 这里的判断用于拿 proxy 的 target
      // 否则直接 copy[key] = newValue 的话外部拿到的对象是个 proxy
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue
      return true
    }
  }

  const getProxy = data => {
    if (isProxy(data)) {
      return data
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data)
      }
      const proxy = new Proxy(data, objectTraps)
      proxies.set(data, proxy)
      return proxy
    }
    return data
  }

  const getCopy = data => {
    if (copies.has(data)) {
      return copies.get(data)
    }
    const copy = Array.isArray(data) ? data.slice() : { ...data }
    copies.set(data, copy)
    return copy
  }

  const isChange = data => {
    if (proxies.has(data) || copies.has(data)) return true
  }

  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data
      }
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }
    return data
  }

  const proxy = getProxy(baseState)
  fn(proxy)
  return finalize(baseState)
}
const state = {
  info: {
    name: 'yck',
    career: {
      first: {
        name: '111'
      }
    }
  },
  data: [1]
}

const data = produce(state, draftState => {
  draftState.info.age = 26
  draftState.info.career.first.name = '222'
})

console.log(data, state)
console.log(data.data === state.data)

// 实现 (a == 1 && a == 2 && a == 3) 值为真
class ResetA {
  constructor (value) {
    this.value = value
  }
  valueOf () {
    return this.value ++
  }
}
const a = new ResetA(1)
console.log((a == 1 && a == 2 && a == 3))

// 实现 （a === 1 && a === 2 && a === 3）值为真
var value = 0
Object.defineProperty(window, 'a', {
  get() {
    return this.value += 1
  }
})
// console.log(a)
// console.log(a)
// console.log(a)
console.log((a === 1 && a === 2 && a === 3))


// 实现 apply
Function.prototype.myCall = function(context = window, ...args) {
  let func = this, fn = Symbol('fn')
   context[fn] = func

  let res = context[fn](...args)

  delete context[fn]
  return res
}

/* 
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1

  ||
  ||

var foo = {
  value: 1,
  bar: function () {
    console.log(this.value)
  }
}
foo.bar() // 1
 */

// 1
Function.prototype.call2 = function(context) {
  // context => foo
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }

  // 获取调用 call 的函数 => this => bar
  context.fn = this
  context.fn()
  delete context.fn
}
// 测试一下
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

bar.call2(foo);

// 2
Function.prototype.call2 = function (context) {
  // context => foo
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }

  // 获取调用 call 的函数 => this => bar
  context.fn = this
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments['+ i +']')
  }
  eval('context.fn('+ args +')')
  // 相当于 context.fn(arguments[1], arguments[2], ...)
  delete context.fn
}
// 测试一下
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 

// 3 有返回值
Function.prototype.call2 = function (context) {
  // context => foo
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }

  // 获取调用 call 的函数 => this => bar
  context.fn = this
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  var res = eval('context.fn(' + args + ')')
  // context.fn(arguments[1], arguments[2], ...)
  delete context.fn
  return res
}
// 测试一下
var value = 2;

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
/* 
1
Object {
   value: 1,
   name: 'kevin',
   age: 18
}
 */


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
let {bar, foo} = {foo: 'as', bar: 'bss'}
console.log(bar, foo) // bss as

let obj = { foo: 'as', bar: 'bss' }
let { foo: f, bar: b } = obj
console.log(f, b) // as bss
// 对象的解构赋值内部机制是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者
let {foo: baz} = {foo: 'aaa', bar: 'bbb'}
console.log(baz) // aaa
console.log(foo) // ReferenceError: foo is not defined

// 可用于嵌套结构的对象
let obj = {
  p: [
    'hello',
    { y: 'world'}
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
var {x = 3, y = 5} = {x: 1}
console.log(x, y) // 1 5
var { x: y = 5 } = {}
console.log(y) // 5
var { x: y = 5 } = {x: 8}
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
let {0: first, [arr.length - 1]: last} = arr
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
let {toString: s} = 122
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
function move({x, y} = {x: 0, y: 0}) {
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

// 1 5 11

function getMin (n) {
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
<<<<<<< Updated upstream
console.log(change(8, [1, 2, 5]))
=======
console.log(change(8, [1, 2, 5]))
>>>>>>> Stashed changes
