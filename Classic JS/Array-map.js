// 数组 map： 循环方法实现
const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = Array()
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

Array.prototype.selfMap = selfMap

[1, 2, 3].selfMap(num => num * 2)

// 数组 map: 循用 reduce 实现
const selfMap2 = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}