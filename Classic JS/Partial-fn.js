// 偏函数  偏函数可以接受不只一个参数，它被固定了部分参数作为预设，并可以接受剩余的参数
// https://juejin.im/post/6844903856489365518#heading-12

// 支持 占位符 '_'
const partialFunc = (func, ...args) => {
  let placeholderNum = 0
  return (...args2) => {
    // 第二次传进来的值替换占位符
    args2.forEach(arg => {
      let index = args.findIndex(item => item === '_')
      if (index < 0) return
      args[index] = arg
      placeholderNum++
    })
    // 第二次传的参数，去掉占位符个数，剩下的是第二次参数入参
    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args2.length)
    }
    return func.apply(this, [...args, ...args2])
  }
}

// 9.24 recode
function addition(x, y) {
  return x + y;
}
// console.log(partialFunc(addition, 10, 12)()) // 22
let temp = partialFunc(addition, 20)
console.log(temp(23)) // 43
// partialFunc 函数可以帮我们生成一个偏函数。
// 调用 partialFunc 函数生成一个偏函数并赋值给 partialFunc，其中预设一个值 20。
// partialFunc 接受剩余参数 23 结合前面预设的 20 得出最终结果。


let add = (a, b, c, d) => (a + b) - (c + d)
let temp2 = partialFunc(add, '_', 20, 30, '_')
console.log(temp2(10, 9, 9)) // -9

let temp3 = partialFunc(add, 20, 30)
console.log(temp3(10, 9)) // 31


// base
const partial = (func, ...args) => {
  return function (...args2) {
    return func.apply(this, [...args, ...args2])
  }
}
function tion(x, y) {
  return x + y;
}
let temp4 = partial(tion, 20)
console.log(temp4(2, 8)) // 22
// level
const partial2 = (func, ...args) => {
  let temp = 0
  return (...args2) => {
    args2.forEach(tag => {
      let index = args.findIndex(item => item === '_')
      if (index < 0) return
      args[index] = tag
      temp++
    })
    if (temp < args2.length) {
      args2 = args2.slice(temp, args2.length)
    }
    return func.apply(this, [...args, ...args2])
  }
}

let temp5 = partial2(add, '_', 20, 30, '_')
console.log('temp5', temp5(10, 9, 9)) // temp5 -9
