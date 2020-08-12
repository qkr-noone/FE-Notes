let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

/* 递归回溯法 */
let combine = function (...chunks) {
  console.log('chunks', chunks)
  let res = []

  let helper = (chunkIndex, prev) => {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    for (const val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        // 如果已经处理到数组最后一项  则把拼接结果放入返回值
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }

  helper(0, [])

  return res
}
console.log(combine(names, colors, storages))

let q = ['iPhone X', 'iPhone XS']
let w = ['黑色', '白色']
let e = ['64g', '256g']
let r = ['Q', 'W', 'E', 'R']
let o = [q, w, e, r]
let com = o.reduce((all, now) => {
  return all.map((e) => {
    return now.map((n) => e + n)
  }).flat()
})
console.log(com)

// leetCode 77 组合
let combine = function (n, k) {
  let ret = []
  
  helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }

    /* for (let i = start; i <= n; i++) {
      helper(i + 1, prev.concat(i))
    } */
    // 优化
    let temp = n - (k - len) + 1
    for (let i = start; i <= temp; i++) {
      helper(i + 1, prev.concat(i))
    }
  }
  helper(1, [])
  return ret
}
console.log(combine(4, 2))

// 实现 __proto__  阮一峰 ES6标准入门 __proto__ 属性 P166
Object.defineProperty(Object, '__proto__', {
  get () {
    let _thisObj = Object(this)
    return Object.getPrototypeOf(_thisObj)
  },
  set (proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(this)) {
      return undefined
    }
    if (!isObject(proto)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) {
      throw new TypeError()
    }
  }
})
function isObject (value) {
  return Object(value) === value
}
Object.__proto__ = { 1: 1 }
console.log(Object.getPrototypeOf(Object)) //  { '1': 1 }

// console.log(Object.getPrototypeOf({__proto__: null})) //  { null }

// 1. 扩展运算符的解构赋值，不能复制继承自原型对象的属性
// 2. 单纯的解构赋值，可以读取对象继承的属性
const o = Object.create({x: 1, y: 2})
o.z = 3
console.log(Object.getPrototypeOf(o)) // { x: 1, y: 2 }

let { x, ...newObj } = o
let { y, z } = newObj
console.log(x, y, z) // 1 undefined 3
console.log(newObj) // { z: 3 }
/* 
代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，
所以变量z可以赋值成功，变量y取不到值
*/

/* 
书中的错误
ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，
而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。
*/
// let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts

// 实现 getOwnPropertyDescriptors(obj)
function getOwnPropertyDescriptors(obj) {
  const result = {}
  for (const key of Reflect.ownKeys(obj)) {
    obj[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return result
}