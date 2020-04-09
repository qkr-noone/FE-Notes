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

// 方式二
function myInstanceof(left, right) {
  // 基本数据类型直接返回 false
  if (typeof left !== 'object' || left === null) return false;
  // getProtypeOf 是 Object 对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    // 查找到尽头，还没找到
    if (proto == null) return false;
    // 找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// 更多 https://juejin.im/post/5dac5d82e51d45249850cd20

let num = 1
console.log(num instanceof Number) // false
let num2 = new Number(2)
console.log(num2 instanceof Number) // true 使用 new 声明时 在原型链

console.log(myInstanceof(12, String)) // false
console.log(myInstanceof(new String('12'), String)) // true