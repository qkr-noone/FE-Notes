/*
    实现可迭代对象
    知识点
    ES6里规定，只要在对象的属性上部署了Iterator接口，
    具体形式为给对象添加Symbol.iterator属性，此属性指向一个迭代器方法，
    这个迭代器会返回一个特殊的对象 - 迭代器对象。

    为对象实现一个简单的iterator
 */
let iteraObj = {
  name: 'starry',
  age: 12,
  gender: 'girl'
}

iteraObj[Symbol.iterator] = function () {
  let values = Object.values(this)
  let index = 0
  return {
    next() {
      if (index >= values.length) {
        return {
          done: true,
          value: undefined
        }
      } else {
        return {
          done: false,
          value: values[index++]
        }
      }
    }
  }
}

for (const v of iteraObj) {
  console.log(v)
}

let iterass = [12, 23, 4][Symbol.iterator]()
console.log(iterass.next().value)
console.log(iterass.next().value)

// 已默认部署 Iterator 接口的对象主要包括数组、字符串、Set、Map 、类似数组的对象（比如arguments对象、DOM NodeList 对象
console.log('Array', String.prototype.hasOwnProperty(Symbol.iterator))
console.log('String', String.prototype.hasOwnProperty(Symbol.iterator))
console.log('Set', Set.prototype.hasOwnProperty(Symbol.iterator))
console.log('Map', Map.prototype.hasOwnProperty(Symbol.iterator))
function argsList() {
  let obj = arguments[Symbol.iterator]()
  console.log(arguments.hasOwnProperty(Symbol.iterator))
  console.log(arguments)
  console.log(obj.next())
}
argsList(1, 2, 4)

/* 
解构赋值
对可迭代对象进行解构赋值的时候，会默认调用Symbol.iterator方法 （Set, Map, Array, String, ...）
 */

let [itera1, itera2, itera3] = iteraObj
console.log(itera1, itera2, itera3)

/* 
扩展运算符
扩展运算符的执行(...)也会默认调用它的Symbol.iterator方法，可以将当前迭代对象转换为数组。（Set, Map, Array, String, ...）
 */


//  判断对象是否可迭代
// 规则必须在对象上部署Symbol.iterator属性，那么我们基本上就可以通过此属来判断对象是否为可迭代对象
function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function'
}
console.log(isIterable('abcdefg')); // true
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable("Hello")); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false

/* 更优雅的实现方式  Generator 生成器*/
let generaObj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'generator'
  }
}
for (const v of generaObj) {
  console.log(v)
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}
console.log(1)
timeout(2000).then(value => console.log(value, 'timeout'))
console.log(2)