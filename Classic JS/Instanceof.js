// 简单实现一个 instanceof
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null) {
      return false
    }
    if (prototype === left) {
      return true
    }
    left = left.__proto__
  }
}