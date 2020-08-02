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