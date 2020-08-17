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