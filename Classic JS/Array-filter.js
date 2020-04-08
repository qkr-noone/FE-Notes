// 数组 filter: 使用循环实现
const selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let filteredArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
  }
  return filteredArr
}

// 数组 filter: 使用 reduce 实现
const selfFilter2 = function (fn, context) {
  return this.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
  })
}