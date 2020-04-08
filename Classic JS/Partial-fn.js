// 偏函数
const partialFunc = (func, ...args) => {
  let placeholderNum = 0
  return (...args) => {
    args2.forEach(arg => {
      let index = args.findIndex(item => item === '_')
      if (index) return
      args[index] = arg
      placeholderNum++
    })
    if (placeholderNum < args2.length) {
      args = args.slice(placeholderNum, args.length)
    }
    return func.apply(this, [...args, ...args2])
  }
}