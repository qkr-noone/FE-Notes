// 数组 some: 使用循环实现
const selfSome = function (fn, context) {
  let arr = Array.prototype.slice.call(this)

  if (!arr.length) return false
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    let res = fn.call(context, arr[i], i, this)
    if (res) return true
  }
}

// 数组 reduce: 使用循环实现
Array.prototype.selfReduce = function (fn, initialValue) {
  let arr = Array.prototype.slice.call(this)
  let res
  let startIndex
  if (initialValue === undefined) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      startIndex = i
      res = arr[i]
      break
    }
  } else {
    res = initialValue
  }

  for (let i = ++startIndex || 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    res = fn.call(null, res, arr[i], i, this)
  }
  return res
}