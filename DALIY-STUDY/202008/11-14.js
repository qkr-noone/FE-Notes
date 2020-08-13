let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

/* 递归回溯法 */
let combine = function (...chunks) {
  console.log('chunks', chunks)
  let res = []

  let helper = (chunkIndex, prev) => {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    for (const val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        // 如果已经处理到数组最后一项  则把拼接结果放入返回值
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }

  helper(0, [])

  return res
}
console.log(combine(names, colors, storages))

let q = ['iPhone X', 'iPhone XS']
let w = ['黑色', '白色']
let e = ['64g', '256g']
let r = ['Q', 'W', 'E', 'R']
let o = [q, w, e, r]
let com = o.reduce((all, now) => {
  return all.map((e) => {
    return now.map((n) => e + n)
  }).flat()
})
console.log(com)

// leetCode 77 组合
let combine = function (n, k) {
  let ret = []
  
  helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }

    /* for (let i = start; i <= n; i++) {
      helper(i + 1, prev.concat(i))
    } */
    // 优化
    let temp = n - (k - len) + 1
    for (let i = start; i <= temp; i++) {
      helper(i + 1, prev.concat(i))
    }
  }
  helper(1, [])
  return ret
}
console.log(combine(4, 2))

// 实现 __proto__  阮一峰 ES6标准入门 __proto__ 属性 P166
Object.defineProperty(Object, '__proto__', {
  get () {
    let _thisObj = Object(this)
    return Object.getPrototypeOf(_thisObj)
  },
  set (proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(this)) {
      return undefined
    }
    if (!isObject(proto)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) {
      throw new TypeError()
    }
  }
})
function isObject (value) {
  return Object(value) === value
}
Object.__proto__ = { 1: 1 }
console.log(Object.getPrototypeOf(Object)) //  { '1': 1 }

// console.log(Object.getPrototypeOf({__proto__: null})) //  { null }

// 1. 扩展运算符的解构赋值，不能复制继承自原型对象的属性
// 2. 单纯的解构赋值，可以读取对象继承的属性
const o = Object.create({x: 1, y: 2})
o.z = 3
console.log(Object.getPrototypeOf(o)) // { x: 1, y: 2 }

let { x, ...newObj } = o
let { y, z } = newObj
console.log(x, y, z) // 1 undefined 3
console.log(newObj) // { z: 3 }
/* 
代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，
所以变量z可以赋值成功，变量y取不到值
*/

/* 
书中的错误
ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，
而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。
*/
// let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts

// 实现 getOwnPropertyDescriptors(obj)
function getOwnPropertyDescriptors(obj) {
  const result = {}
  for (const key of Reflect.ownKeys(obj)) {
    obj[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return result
}


// 请写出如下代码的打印结果
function Foo() {
  Foo.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行

Foo.prototype.a = function () {
  console.log(3)
}
// 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3

Foo.a = function () {
  console.log(4)
}
// 现在在 Foo 上挂载了直接方法 a ，输出值为 4

Foo.a();
// 立刻执行了 Foo 上的 a 方法，也就是刚刚定义的，所以
// 输出 4

let obj = new Foo();
/* 这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
2. 在新对象上挂载直接方法 a ，输出值为 2。
*/

obj.a();
// 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，
// 输出 2

Foo.a();
// 构建方法里已经替换了全局 Foo 上的 a 方法，所以
// 输出 1

// 输出顺序是 4 2 1.



// 第 79 题：input 搜索如何防抖，如何处理中文输入 https://muyiy.cn/question/js/79.html
/* 参考vue源码对v-model的实现中，对输入中文的处理  ??? */
function jeiliu(timeout) {
  var timer;
  function input(e) {
    if (e.target.composing) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log(e.target.value);
      timer = null;
    }, timeout);
  }
  return input;
}

function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  //console.log(e.target)
  e.target.composing = false;
  var event = document.createEvent('HTMLEvents');
  event.initEvent('input');
  e.target.dispatchEvent(event);
}
var input_dom = document.getElementById('myinput');
input_dom.addEventListener('input', jeiliu(1000));
input_dom.addEventListener('compositionstart', onCompositionStart);
input_dom.addEventListener('compositionend', onCompositionEnd);

/* 
对象的键名只能是字符串和 Symbol 类型。
其他类型的键名会被转换成字符串类型。
对象转字符串默认会调用 toString 方法。 */
var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // c

/* --------------------- */
// example 2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // b

/* --------------------- */
// example 3
var a = {}, b = { key: '123' }, c = { key: '456' };
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // c

// 第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
/*
ans1: 数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

得出结论：消耗时间几乎一致，差异可以忽略不计

ans2: JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，
作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，
都是用 key 精确查找哈希表的过程，其消耗时间大致相同。 @lvtraveler 请帮忙测试下稀松数组。*/

/* https://muyiy.cn/question/js/72.html 详细 */
let arrs = new Array(10000);

console.time('for');
let l = arrs.length
for (let i = 0; i < l; i++) {

};
console.timeEnd('for');

console.time('forEach');

arrs.forEach((arr) => {

});
console.timeEnd('forEach');

// es6 => es5 代码编译 在之前创建的项目中使用过


/* https://muyiy.cn/question/js/53.html 详细 */
/* 首先，a和b同时引用了{ n: 2 } 对象，接着执行到a.x = a = { n：2}语句，尽管赋值是从右到左的没错，
  但是 . 的优先级比 = 要高，所以这里首先执行a.x，相当于为a（或者b）所指向的{ n: 1 } 对象新增了一个属性x，
  即此时对象将变为{ n: 1; x: undefined } */
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x)  // undefined
console.log(b.x) // { n: 2 }


// 输出以下代码执行的结果并解释为什么 详细
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj) // Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]

// 改版
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj) // { '2': 1, '3': 2, length: 4, push: f }

// 改版2
var obj = {
  '2': 3,
  '3': 4,
  'length': 0,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj) 
// Object(2) [1, 2, 2: 3, 3: 4, splice: ƒ, push: ƒ]
// { '0': 1, '1': 2, '2': 3, '3': 4, length: 2, splice: f, push: f }

// 更多 MDN 解释 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push#Description
var obj = {
  length: 0,

  addElem: function addElem(elem) {
    // obj.length is automatically incremented 
    // every time an element is added.
    [].push.call(this, elem);
  }
};

// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length, obj);
