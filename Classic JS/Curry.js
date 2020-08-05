// 函数柯里化  https://juejin.im/post/5b561426518825195f499772
/* 实现 add(1)(2, 3)(4)() = 10 的效果 */
// 柯里化的行为规范
//   逐步接收参数，并缓存供后期计算使用
//   不立即计算，延后执行
//   符合计算的条件，将缓存的参数，统一传递给执行方法
function curring(fn) {
  let allArgs = []

  return function next() {

    let args = [].slice.call(arguments)

    if (args.length) {
      allArgs = allArgs.concat(args)
      return next
    } else {
      return fn.apply(null, allArgs)
    }
  }
}

let add = curring(function () {
  let sum = 0
  for (let k = 0; k < arguments.length; k++) {
    sum += arguments[k]
  }
  return sum
})
console.log(add(1, 2)(3)(4)(5)()) // 15


const adds = (...args) => args.reduce((a, b) => a + b)

function currings(func) {
  const args = []
  return function result(...rest) {
    if (rest.length === 0) {
      return func(...args)
    } else {
      args.push(...rest)
      return result
    }
  }
}
const sums = currings(adds)
sums(2, 9, 9, 0)
console.log('value', sums(1)) // f result()
console.log(sums()) // 21  todo: 都是需要空参数执行一次

// 扩展  实现 add(1)(2, 3)(4)(5) = 15 的效果

function curry(fn) {
  let allArgs = []

  function next() {
    let args = [].slice.call(arguments)
    allArgs = allArgs.concat(args)
    return next
  }

  // 字符类型
  next.toString = function () {
    return fn.apply(null, allArgs)
  }
  // 数值类型
  next.valueOf = function () {
    return fn.apply(null, allArgs)
  }

  return next
}
let add = curry(function () {
  let sum = 0
  for (let k = 0; k < arguments.length; k++) {
    sum += arguments[k]
  }
  return sum
})
console.log(add(1)(2, 3)(4)(5)) // f 15
console.log(add(1)(2, 3)(4)(5)) // f 15 存在问题 返回一个函数 和值，执行多次会和之前的值累加


/* 二 */
// 使用这种方法不会存在 执行多次会和之前的值累加
function sum(...args) {
  var fn = function (...fnArgs) {
    return sum.apply(null, args.concat(fnArgs))
  }
  fn.toString = () => args.reduce((a, b) => a + b)
  return fn
}

console.log(sum(1)(2, 3)(4)(5)) // f 15
console.log(sum(1)(2, 3)(4)(5)) // f 15



function curry(fn, args) {
  let length = fn.length
  args = args || []
  return function () {
    let _args = args.slice(0)
    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i])
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}
let add = curry(function (a, b, c) { // 这里的参数个数和传入参数个数需要一样
  let sum = 0
  for (let k = 0; k < arguments.length; k++) {
    sum += arguments[k]
  }
  console.log([a, b, c])
  return sum
})
console.log(add(1)(2, 7))