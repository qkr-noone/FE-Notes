// 说出下面运行的结果，解释原因。
function test(person) {
  person.age = 26
  person = {
    name: 'noone-qkr',
    age: 18
  }
  return person
}
const p1 = {
  name: 'qkr',
  age: 19
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?

`结果
p1：{ name: 'qkr', age: 26 }
p2：{ name: 'noone-qkr', age: 18 }`

`原因: 在函数传参的时候传递的是对象在堆中的内存地址值，
  test函数中的实参person是p1对象的内存地址，
  通过调用person.age = 26确实改变了p1的值，但随后person变成了另一块内存空间的地址，
  并且在最后将这另外一份内存空间的地址返回，赋给了p2。`

console.log('1'.toString())
var str = 'per'
str.name = 'qkr'
console.log(str.name, str)


// 0.1+0.2为什么不等于0.3？
`0.1和0.2 转成二进制 由于标准位数的限制，后面多余的位数会被截断
就会出现精度损失，相加后因为浮点数的小数位限制而截断的二进制数字在转为十进制就会变成 0.30000000000000004
  let a = 0.1
  a.toString(2) => "0.0001100110011001100110011001100110011001100110011001101"
  let b = 0.2
  b.toString(2) => "0.001100110011001100110011001100110011001100110011001101"
  (a+b).toString(10) => "0.30000000000000004"
`

// typeof 是否能正确判断类型？
console.log(typeof 1) // number
console.log(typeof '1') // string
console.log(typeof true) // boolean
console.log(typeof undefined) //undefined
console.log(typeof Symbol()) // symbol
console.log(typeof null) // object
console.log(typeof NaN) // number
console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof Date) // function
console.log(typeof console.log) // function
`对于原始类型 除了 null 都可以调用 typeof 显示正确的类型
NaN 为 number
引用数据类型 除了函数之外 都会显示 object
因此采用 typeof 判断对象数据类型是不合适的，采用 instanceof 会更好，instanceof 的原理是基于原型链的查询，只要处于原型链中，判断永远为true
`
let num = 1
console.log(num instanceof Number) // false
let num2 = new Number(2)
console.log(num2 instanceof Number) // true 使用 new 声明时 在原型链
const Person = function () {}
const child = new Person()
console.log(child instanceof Person) // true

// instanceof 能否判断基本数据类型？ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
class PrimitiveNumber {
  static [Symbol.hasInstance](instance) {
    return typeof instance === 'number'
  }
}
class PrimitiveString {
  static [Symbol.hasInstance](instance) {
    return typeof instance === 'string'
  }
}

console.log(11 instanceof PrimitiveNumber) // true
console.log('pri' instanceof PrimitiveString) // true

// Object.is 和 === 的区别？ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
// Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN
// 更多 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
}