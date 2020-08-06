// 函数柯里化  https://juejin.im/post/5b561426518825195f499772 https://panjiachen.gitee.io/awesome-bookmarks/interview/js.html#_12-%E5%86%99%E4%B8%80%E4%B8%AA%E6%8C%89%E7%85%A7%E4%B8%8B%E9%9D%A2%E6%96%B9%E5%BC%8F%E8%B0%83%E7%94%A8%E9%83%BD%E8%83%BD%E6%AD%A3%E5%B8%B8%E5%B7%A5%E4%BD%9C%E7%9A%84-sum-%E6%96%B9%E6%B3%95
/* 实现 add(1)(2, 3)(4)() = 10 的效果 */
// 柯里化的行为规范
//   逐步接收参数，并缓存供后期计算使用
//   不立即计算，延后执行
//   符合计算的条件，将缓存的参数，统一传递给执行方法

/* 一 */
function curring(fn) {
  let allArgs = [] // 会存在缓存 => 执行时需要初始化

  return function next() {

    let args = [].slice.call(arguments)

    if (args.length) {
      allArgs = allArgs.concat(args)
      return next
    } else {
      const temp = fn.apply(null, allArgs)
      // 执行时需要初始化，清除 allArgs，防止缓存
      allArgs = []
      return temp
    }
  }
}

// 类似
let add = curring(function () {
  let sum = 0
  for (let k = 0; k < arguments.length; k++) {
    sum += arguments[k]
  }
  return sum
})
console.log(add(2, 9, 9, 0)) // [Function: next] 都是需要空参数执行一次
console.log(add(1, 2)(3)(4)(5)()) // 15
console.log(add(1, 2)(3)(4)(5)()) // 15
// 没有缓存，可执行多次


const adds = (...args) => args.reduce((a, b) => a + b)

function currings(func) {
  let args = []
  return function result(...rest) {
    if (rest.length === 0) {
      const temp = func.apply(null, args)
      // 执行时需要初始化，清除 args，防止缓存
      args = []
      return temp
    } else {
      args.push(...rest)
      return result
    }
  }
}
const sums = currings(adds)
sums(2, 9, 9, 0)
console.log('value', sums(1)) // [Function: result]
console.log(sums()) // 21  todo: 都是需要空参数执行一次
console.log(sums(1, 2)(3)(4)(5)()) // 15


/* 二  没有缓存 不需要初始化 */
function add(arr) {
  // args 是参数转成的数组
  return arr.reduce((acc, cur) => {
    acc = acc + cur
    return acc
  }, 0)
}

function sum(...args) {
  return (...newArgs) => {
    if (newArgs.length === 0) {
      return add(args)
    } else {
      return sum(...args, ...newArgs)
    }
  }
}
console.log(sum(3, 5)(4)(2, 1)(5)(3)) // [Function]
console.log(sum(3, 5)(4)(2, 1)(5)(3)()) // 23
console.log(sum(3, 5)(4)(2, 1)(5)(3)()) // 23



// 扩展  实现 add(1)(2, 3)(4)(5) = 15 的效果

/* 一 */
function curry(fn) {
  let allArgs = []

  function next() {
    let args = [].slice.call(arguments)
    allArgs = allArgs.concat(args)
    return next
  }

  // 字符类型
  next.toString = function () {
    let temp = fn.apply(null, allArgs)
    // 初始化
    allArgs = []
    return temp
  }
  // 数值类型
  next.valueOf = function () {
    let temp = fn.apply(null, allArgs)
    // 初始化
    allArgs = []
    return temp
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
console.log(add(1)(2, 3)(4)(5)) // f 15

// 如果不初始化 allArgs 执行多次会和之前的值累加 （缓存）
console.log(add(1)(2, 3)(4)(5)) // f 15
console.log(add(1)(2, 3)(4)(5)) // f 30


/* 二 没有缓存 正解 */
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