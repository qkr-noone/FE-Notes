// 判断类型
var type = function (val) {
  var s = Object.prototype.toString.call(val)
  console.log(s)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}
// (使用 slice 实现 )
var typeSlice = function (val) {
  var newSlice = Object.prototype.toString.call(val)
  return newSlice.slice(8, -1).toLowerCase()
  // toUpperCase
}
console.log(type({}))
console.log(typeSlice([]))

// WeakMap 代替 Map 深拷贝
function deepWeakCopy(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, clone)
    for (const key in target) {
      clone[key] = deepWeakCopy(target[key], map)
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
console.log(deepWeakCopy(target))

// 手写parseInt的实现，要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()
/*
  1. 返回解析后的整数值  第一个无法解析字符 -> NaN， 解析数字+字符 => 只解析数字  -> 整数值
  2. radix 参数为 n 将会把第一个参数看作是一个数的 n 进制表示，而返回的值则是十进制
    例如：
      parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 3*5^0 + 2*5^1 + 1*5^2  = 38
  3. 2 < radix > 36  =>  NaN
  4. 0 undefined null -> radix 10
 */

function _parseInt(str, radix) {
  let str_type = typeof str;
  let res = 0;
  if (str_type !== 'string' && str_type !== 'number') {
    // 如果类型不是 string 或 number 类型返回NaN
    return NaN
  }

  // 字符串处理
  str = String(str).trim().split('.')[0]
  let length = str.length;
  if (!length) {
    // 如果为空则返回 NaN
    return NaN
  }

  if (!radix) {
    // 如果 radix 为0 null undefined
    // 则转化为 10
    radix = 10;
  }
  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN
  }

  // 解析数字+字符 => 只解析数字  -> 整数值

  // 正则匹配[+|-]?[0]?[Xx]?[0-9a-fA-F]+
  const regex = /^(?<fuhao>[\+|\-]*)(?<radix>[0]?[Xx]?)(?<num>[0-9a-fA-F]+)/

  // 匹配出符号、进制、数字三个分组
  const groups = str.match(regex).groups

  // 挨个字符串解析，如果遇到无法解析时则停止解析，返回已经解析好的整数
  let splitArr = groups.num.split('')
  const arr = []
  for (let i = 0; i < splitArr.length; i++) {
    // 根据charCode来做转行为实际数据, 0-9为[48-57],A-F为[65-70]
    const charCode = splitArr[i].toUpperCase().charCodeAt()
    let num

    // 字符为[A-F]时, 实际数字为charCode -55
    if (charCode >= 65) num = charCode - 55

    // 字符为[0-9]时, 实际数字为charCode - 48
    else num = charCode - 48

    // 当实际数字大于radix时, 无法解析则停止字符串遍历
    if (num > radix) {
      break
    } else {
      arr.push(num)
    }
  }
  length = arr.length
  // 当实际数字数组长度为0时, 返回NaN
  if (!length) return NaN


  for (let i = 0; i < length; i++) {
    res += Math.floor(arr[length - i - 1]) * Math.pow(radix, i)
  }

  return res;
}
console.log(_parseInt('12b', 36))

// 数组去重
function combine () {
  let arr = Array.prototype.concat.apply([], arguments)
  return Array.from(new Set(arr))
}
console.log(combine(1212, 2, 2, 3, 90, 0, 0, 10))

var sy = Symbol('12')
console.log(String(sy))
console.log(sy.toString())

var mysy = Symbol()
var a = {}
a[mysy] = 'hh'
var a = {
  [mysy]: '00'
}
var b = {}
Object.defineProperty(b, mysy, {value: '90'})
console.log(b, b[mysy], a, a[mysy])

var thisA = {
  name: 'zhangsi',
  describe: function () {
    return 'name: ' + this.name
  }
}
var name = 'second'
var funA = thisA.describe
console.log(0, funA())

// instanceof 运算符用来测试赛一个对象在其原型链中是否存在一个构造函数的 prototype 属性， 但它不能检测 null 和 undefined
console.log([] instanceof Array)
console.log([] instanceof Object)
console.log(new Date() instanceof Date)
console.log(undefined instanceof undefined)
console.log(new RegExp() instanceof RegExp)

// 类数组转换为数组 可以调用数组原生方法
function toArray (a, b) {
  let args = Array.prototype.slice.call(arguments)
  let argy = Array.from(arguments)
  let argu = [...arguments]
  let argz = Array.prototype.concat.apply([], arguments)
  console.log(args, argy, argu, argz)
}

toArray(12, 2, 4, 90)
const map = new Map([[1, 2], [23, 8]])
console.log(map, 90)
console.log(Array.from(map.values()))

// 冒泡排序

// console 输出什么
var  cns84 = 84
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this
    console.log('outer func:  this.foo = ' + this.foo)  // bar
    console.log('outer func:  self.foo = ' + self.foo)  // bar
      ; (function () {
        console.log('inner func:  this.foo = ' + this.foo) // undefined
        console.log('inner func:  self.foo = ' + self.foo) // bar
        console.log(cns84) // 84
      })()
  }
}
myObject.func()

// isNaN polyfill https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN
// NaN 是 Not a Number 的缩写，JavaScript 的一种特殊数值，其类型是 Number，可以通过 isNaN(param) 来判断一个值是否是 NaN
// ES5
var isNaN = function (value) {
  var n = Number(value)
  return n !== n
}

// ES6 Number.isNaN()

/* 实现函数 isInteger(x) 来判断 x 是否是整数
可以将 x 转换成 10 进制，判断和本身是不是相等即可： */

function isInteger(x) {
  return parseInt(x, 10) === x
}
