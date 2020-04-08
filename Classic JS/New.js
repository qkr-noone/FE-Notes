// 实现 new 关键字
const isComplexDataType = obj =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null
const selfNew = function (fn, ...rest) {
  let instance = Object.create(fn.prototype)
  let res = fn.apply(instance, rest)
  return isComplexDataType(res) ? res : instance
}

// 实现 new 二
/* 1. 生成新对象 2. 对象原型指向构造函数的原型 3. 绑定 this 4.返回新对象即实例对象 */
/* 参数 Con 接收一个构造函数  args 传入构造函数的参数 */

// 实现一个 new 操作符

function reNew() {
  let obj = {}
  let Construtor = [].shift.call(arguments)
  obj.__proto__ = Construtor.prototype
  let result = Construtor.apply(obj, arguments)
  // ** 确保 new 出来的是个对象 返回的值是什么就return什么
  return typeof result === 'object' ? result : obj
}
function FunTest(name, age) {
  this.name = name
  this.age = age
}
FunTest.prototype.findAge = function () {
  console.log(12)
  return 1
}
const testCons = reNew(FunTest, 'sdafd', 12)
console.log(testCons.findAge());