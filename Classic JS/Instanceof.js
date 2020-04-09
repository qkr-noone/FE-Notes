// 简单实现一个 instanceof
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) {
    return false
  }
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    // 查找到尽头，还没找到
    if (left === null) {
      return false
    }
    // 找到相同的原型对象
    if (prototype === left) {
      return true
    }
    left = left.__proto__
  }
}

// 更多 https://juejin.im/post/5dac5d82e51d45249850cd20
console.log(myInstanceof(12, String)) // false
console.log(myInstanceof(new String('12'), String)) // true