// 迁移

const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i); //2 3 5 4
}
const set = new Set([1, 2, 3, 1, 2, 44, 5])
console.log([...set])
console.log(...[1, 2, 3])
let arr1 = [0, 1, 2]
let arr3 = [0, 1, 3]
arr1.push(...arr3)
console.log(arr1)
console.log(Math.max.apply(null, [14, 3, 77]))
console.log(Math.max(...[14, 3, 77]))
console.log(new (Date.bind.apply(Date, [null, 2015, 1, 1])))
console.log(new Date(...[2015, 1, 1]))

let {
  left,
  top,
  right,
  bottom,
  width,
  height
} = Dom.getBoundingClientRect


// https://wangdoc.com/javascript/stdlib/object.html
/* 准确的类型判断函数 */
var type = function (val) {
  var s = Object.prototype.toString.call(val);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

type({})  // object
type([])  // array
type(5)  // number
type(null)  // null
type()  // undefined
type(/abcd/)  // regex
console.log(type(new Date())) // date

// **** (使用 slice 实现 ) ****
var typeSlice = function (val) {
  var newslice = Object.prototype.toString.call(val)
  return newslice.slice(8, -1).toLowerCase()
}
console.log(typeSlice(new Date()), typeSlice(5)) // date number

/* 还可以加上专门判断某种类型数据的方法 */
let arpst = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp']
arpst.forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase()
  }
})

type.isObject({}) // true
type.isNumber(NaN) // true
console.log(type.isRegExp(/abc/)) // true

const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

const isArray = isType('Array')
console.log(isArray([1, 2]))

// https: //juejin.im/post/5c6ad9fde51d453c356e37d1#heading-29 测试
typeof Symbol()
typeof ''
typeof true
typeof 1
console.log(typeof undefined)
console.log(typeof new Function())
console.log(typeof null)
console.log(typeof [])
console.log(typeof new Date())
console.log(typeof new RegExp(/\12\g/))

// instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性， 但它不能检测 null 和 undefined
console.log([] instanceof Array)
console.log({} instanceof Object)
console.log(new Date() instanceof Date)
console.log(new RegExp() instanceof RegExp)
console.log(null instanceof Null) // 报错
console.log(undefined instanceof undefined) // 报错

// 类数组转换为数组 可调用数组原生方法
function toArray(a, b) {
  let args = Array.prototype.slice.call(arguments)
  let arg2 = Array.from(arguments)
  let arg3 = [...arguments]
  let arg4 = Array.prototype.concat.apply([], arguments) // applay 方法会把第二个参数展开
  console.log(args, arg2, arg3, arg4)
}
toArray(12, 2, 4, 90)
const map = new Map([[1, 2], [23, 8]])
console.log(map, 90)
console.log(Array.from(map.values()))

// 数组去重
function combine() {
  let arr = Array.prototype.concat.apply([], arguments)
  return Array.from(new Set(arr))
}
console.log(combine(1212, 2, 2, 3, 90, 0, 0, 10))


const obj = {
  a: 12,
  toString() {
    return 1
  }
}
console.log(obj.toString())

// symbol 示例
var sy = Symbol('12')
console.log(sy)
console.log(String(sy))
console.log(sy.toString())

var mysy = Symbol()
var a = {}
a[mysy] = 'hh'
var a = {
  [mysy]: '00'
}
var b = {}
Object.defineProperty(b, mysy, { value: '90' })
console.log(b, b[mysy])

var thisA = {
  name: '张思',
  describe: function () {
    return '姓名： ' + this.name;
  }
}
var name = 'second';
var funcc = thisA.describe
console.log(0, funcc())

// 1.冒泡排序
//   排序思路：便利数组，每次遍历将最大（最小）值推至最前，越往后遍历次数越少
const bubbleSort = arr => {
    const list = arr.slice() // 保证函数为纯函数
    const len = list.length;
    for (let i = 0; i < len; i++) {
        for (let j = len - 1; j > i; j--) {
            if (list[j] > list[j - 1]) {
                const tmp = list[j - 1]
                list[j - 1] = list[j]
                list[j] = tmp
            }
        }
    }
    return list
}
console.log(bubbleSort([6,555,4,1,2,3,5]))
// [ 555, 6, 5, 4, 3, 2, 1 ]

// 2.改进版冒泡排序
//   优化思路：当遍历前后数组不产生变化时，说明改数组已经有序，结束排序。
const bubbleSort2 = arr => {
    const list = arr.slice() // 保证函数为纯函数
    const len = list.length
    for (let i = 0; i < len; i++) {
        let exchange = false
        for (let j = len - 1; j > i; j--) {
            if (list[j] > list[j-1]) {
                const tmp = list[j-1]
                list[j - 1] = list[j]
                list[j] = tmp
                exchange = true
            }
        }
        if (!exchange) return list
    }
    return list
}

console.log(bubbleSort2([2,77,0,99,12,1]))
// [ 99, 77, 12, 2, 1, 0 ]

/********* 3、选择排序 **********/
// 在无序区中选出最小的元素，然后将它和无序区的第一个元素交换位置。
const selectionSort = arr => {
    const list = arr.slice(); //保证函数为纯函数
    const len = list.length;
    for (let i = 0; i < len; i++) {
      let k = i
      for (let j = len - 1; j > i; j--) {
        if (list[j] < list[k]) k = j;
      }
      if (k !== i) {
        const tmp = list[k];
        list[k] = list[i];
        list[i] = tmp;
      }
    }
    return list;
}
console.log(selectionSort([2,77,0,99,12,1]))

// /********* 4、插入排序 **********/
// 最普通的排序算法， 从数组下标1开始每增1项排序一次，越往后遍历次数越多；
const insertSort = arr => {
    const list = arr.slice(); //保证函数为纯函数
    const len = list.length;
    for (let i = 1; i < len; i++) {
      const tmp = list[i];
      let j = i - 1;
      while (j >= 0 && tmp < list[j]) {
        list[j + 1] = list[j];
        j--;
      }
      list[j + 1] = tmp;
    }
    return list;
  }
console.log(insertSort([2,77,0,99,12,1]))

//   /********* 5、快速排序 **********/
function quickSort(arr) {
    const list = arr.slice(); //为了保证这个函数是纯函数，拷贝一次数组
    if (list.length <= 1) return list;
    const pivot = list.splice(0, 1)[0]; //选第一个作为基数
    const left = [];
    const right = [];
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i] < pivot) {
        left.push(list[i]);
      } else {
        right.push(list[i]);
      }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}
console.log(quickSort([2,77,0,99,12,1,0,9]))



function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

timeout(1400).then(value => { console.log(value)})

let promise = new Promise((resolve, reject) => {
  console.log('Promise')
  resolve()
})
promise.then(() => {
  console.log('resolved')
})
console.log('hi')

// 异步加载图片
function loadImageAsync (url) {
  return new Promise((resolve, reject) => {
    const image =  new Image() // 节点需在html
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('Could not load image at ' + url))
    }
    image.src = url
  })
}


// 加载图片
const preloadImage = path => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = path
  })
}
// preloadImage('https://mirror-gold-cdn.xitu.io/168e09690ff1ecb6331?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1')

// 深度拷贝数组
function copyArr(arr) {
  arr.map(item => {
    if (typeof item === 'object') {
      return Object.assign({}, item)
    } else {
      return item
    }
  })
}


// for 中 var let 打印 i 值
var array_t = []
for(var i = 0; i <3; i++) {
 array_t.push(() => i)
}
var newArray_t = array_t.map(el => el())
console.log(newArray_t) // [3, 3, 3]

var ar_t_m = [];
for (let i = 0; i < 3; i++) {
  ar_t_m.push(() => i)
}
var new_art_m = ar_t_m.map(el => el())
console.log(new_art_m) // [0, 1, 2]

var ar_a_a = []
for(var i = 0; i <3; i++) {
  ar_a_a[i] = (function (x) {
    return function () {
      return x
    }
  })(i)
}
var arra_t_t = ar_a_a.map(el => el())
console.log(arra_t_t) // [0, 1, 2]


// f(1) = 1;
// f(1)(2) = 2;
// f(1)(2)(3) = 6;
function fsdsdsd() {
  let args = [...arguments];
  let add = function() {
    args.push(...arguments);
    return add;
  };
  add.toString = function() {
    return args.reduce((a, b) => {
      return a + b;
    });
  };
  return add;
}
// f(1) = 1;
// f(1)(2) = 2;
// f(1)(2)(3) = 6;
console.log(fsdsdsd(1)(2)(3));

// Proxy
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`)
    return Reflect.get(target, propKey, value, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`)
    return Reflect.set(target, propKey, value, receiver)
  }
})

// 两数之和：返回数组中的两个值 等于 目标值的下标 组成的数组
let arr1 = [2, 7, 11, 15], target1 = 9
let arr2 = [2, 75, 7, 15], target2 = 90

// for 循环
function arrSum(arr, target) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    const a = target - arr[i]
    // indexOf 第二个参数：开始查找的位置
    const index = arr.indexOf(a, i)
    if (index >= 0) {
      res.push(i, index)
    }
  }
  return res
}
console.log(arrSum(arr1, target1)) // [0, 1]
console.log(arrSum(arr2, target2)) // [1, 3]

// reduce 解法
let cb = arr.reduce((res, cur, i) => {
  const index = arr.findIndex(x => x === target - cur);
  return res || (!!~index && [i, index])
}, void 0)
console.log(cb) // [1, 3]

// Map 哈希? 解法 \Data Structures & Algorithms\LeetCode\1.两数之和.js

var a = 10;
(function () {
  console.log(a) // undefined
  a = 5
  console.log(window.a) // 10
  var a = 20;
  console.log(a) // 20
})()
console.log(a) // 10

var a = 10;
(function () {
  console.log(a) // 10
  a = 5
  console.log(window.a) // 5
  console.log(a) // 5
})()
console.log(a) // 5

var a = 2;
var func = (function () {
  var a = 3;
  return function () {
    a++;
    console.log(a)
  }
})()
func(); // 4
func(); // 5

var data = []
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i)
  }
}
data[0]()
data[1]()
data[2]()
// 分析
globalContext = {
  VO: {
    data: [...func],
    i: 3
  }
}
// 当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
data[0][Context] = {
  Scope: [AO, globalContext.VO]
}
// data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3
//改为闭包
var data = []
for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    return function () {
      console.log(i)
    }
  })(i)
}
data[0]()
data[1]()
data[2]()
// 当执行到 data[0] 函数之前 全局上下文的 VO
globalContext = {
  VO: {
    data: [...func],
    i: 3
  }
}
// 当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变
data[0][Context] = {
  Scope: [AO, 匿名函数Context.AO, globalContext.VO]
}
// 匿名函数执行上下文的AO为：
匿名函数Context = {
  AO: {
    arguments: {
      0: 0,
      length: 1
    },
    i: 0
  }
}