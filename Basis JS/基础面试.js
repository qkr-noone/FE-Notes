// 参考 https://juejin.im/post/5dac5d82e51d45249850cd20
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


`console.log('1'.toString()) 为什么可以调用？`

`其实在这个语句运行的过程中做了这样几件事情：
var s = new Object('1');
s.toString();
s = null;
复制代码第一步: 创建Object类实例。注意为什么不是String ？ 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
第二步: 调用实例方法。
第三步: 执行完方法立即销毁这个实例。
整个过程体现了基本包装类型的性质，而基本包装类型恰恰属于基本数据类型`
`基本包装类型： String、Number、Boolean`

var str = 'per'
str.name = 'qkr'
console.log(str.name, str) // undefined 'per'


// 0.1+0.2为什么不等于0.3？
`0.1和0.2 转成二进制 由于标准位数的限制，后面多余的位数会被截断
就会出现精度损失，相加后因为浮点数的小数位限制而截断的二进制数字在转为十进制0就会变成 0.30000000000000004
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
因此采用 typeof 判断对象数据类型是不合适的，采用 instanceof 会更好，instanceof 的原理是基于原型链的查询，只要处于原型链中，判断永远为 true
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

`JS 中类型转换有几种
  JS中，类型转换只有三种：
  转换成数字
  转换成布尔值
  转换成字符串
`

`对象转原始类型是根据什么流程运行的？
对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

1. 如果Symbol.toPrimitive()方法，优先调用再返回
2. 调用valueOf()，如果转换为原始类型，则返回
3. 调用toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错
`
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6 // 打印 7
  }
}
console.log(obj + 1); // 输出7


`forEach中return有效果吗？如何中断forEach循环？
中断方法：

使用try监视代码块，在需要中断的地方抛出异常。

官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。
some在碰到return true的时候，中止循环
`
let nums = [1, 2, 3]
nums.forEach((item, index) => {
  console.log(item)
  if (item === 1) {
    console.log('操作')
    throw (1233)
    try {} catch (e) {
      console.log(1)
    }
  }
})

// JS 中 flat ---数组扁平化
let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary);

// 普通递归
let result = []
let fn = function (ary) {
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i];
    if (Array.isArray(item)) {
      fn(item)
    } else {
      result.push(item)
    }
  }
}
fn(ary)
console.log(result)

// ES6 中的 flat
`
ary = ary.flat(Infinity)
`
// replace + JSON.parse
`
let ary = [1, ['2', [3, ['4', 5]]], 6]
let str = JSON.stringify(ary)
str = str.replace(/(\[|\])/g, '')
str = '['+ str +']'
ary = JSON.parse(str)
console.log(ary) // [ 1, '2', 3, '4', 5, 6 ]
`
// reduce 函数
let ary = [1, [2, [3, [4, 5]]], 6];
let flatten = (ary) => ary.reduce((pre, cur) => pre.concat(Array.isArray(cur)? flatten(cur) : cur), [])
console.log(flatten(ary))

// 扩展运算符
let ary = [1, ['2', [3, ['4', 5]]], 6]
// 数组深度
let depth = 1
// 也可以 ary.some(a => Array.isArray(a))
while (ary.some(Array.isArray)) { // Array.isArray 是一个函数;  some 接收函数和 this 两个参数
  depth++
  console.log(depth)
  ary = [].concat(...ary)
}
console.log(ary, depth)

// 数组深度
function getDeepth(array) {
  let sum = (arr, flag) => {
    return arr.reduce((total, item) => {
      let totalDeepth
      if (Array.isArray(item)) {
        totalDeepth = sum(item, flag + 1)
      }
      return totalDeepth > total ? totalDeepth : total
    }, flag)
  }
  return sum(array, 1)
}
console.log(getDeepth([1, ['2', [3, ['4', 5]]], [1], [2, [2]], 6]))

// 数组深度
function arrs(arr) {
  let j = 1
  for (let i in arr) {
    if (arr[i] instanceof Array) {
      let nums = arrs(arr[i])
      if (1 + nums > j) {
        j = j + nums
      }
    }
  }
  return j
}
console.log(arrs([1, ['2', [3, ['4', 5]]], [1], [2, [2]], 6]))
// 更多 面试知识点 https://www.nowcoder.com/discuss/258810?type=post&order=time&pos=&page=3

// 大公司里怎样开发和部署前端代码？ https://github.com/fouber/blog/issues/6


// DNS 解析 dns-prefetch
/* 当浏览器从第三方服务跨域请求资源的时候，在浏览器发起请求之前，
这个第三方的跨域域名需要被解析为一个IP地址，这个过程就是DNS解析，
DNS缓存可以用来减少这个过程的耗时，DNS解析可能会增加请求的延迟，
对于那些需要请求许多第三方的资源的网站而言，DNS解析的耗时延迟可能会大大降低网页加载性能 */

/* Q1: git rebase
Q2: git cherrypick */