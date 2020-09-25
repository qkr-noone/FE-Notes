// 实现 new 关键字
const isComplexDataType = obj =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null
  const selfNew = function (fn, ...rest) {
  let instance = Object.create(fn.prototype)
  let res = fn.apply(instance, rest)
  return isComplexDataType(res) ? res : instance
}

// 实现 new https://github.com/mqyqingfeng/Blog/issues/13
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

// 9.25 recode
function alphaNew() {

  var obj = new Object() // 从 Object.prototype 上克隆一个对象

  let Construtor = [].shift.call(arguments) // 取得外部传入的构造器

  obj.__proto__ = Construtor.prototype
  
  /* var F = function() {}
  F.prototype = Construtor.prototype
  obj = new F() // 指向正确的原型 */

  var result = Construtor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}