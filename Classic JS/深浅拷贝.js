// 浅拷贝的实现方式   https://juejin.im/post/5b5dcf8351882519790c9a2e#heading-3
Object.assign() // 当 object 只有一层的时候，是深拷贝
Array.prototype.concat()
Array.prototype.slice()

/*
  Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组
    原数组的元素会按照下述规则拷贝：
      如果该元素是个对象引用(不是实际的对象)，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
      对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组
*/

// for in 的浅拷贝实现方式
function shallowCopy(src) {
  let d = {}
  for (const prop in src) {
    if (src.hasOwnProperty(prop)) {
      d[prop] = src[prop]
    }
  }
}

let ate = [1, 2, { user: 'kobe', max: 10000 }]
let ate2 = ate.concat()
ate2[2].user = 'james'
console.log(ate, ate2)

let ate3 = ate.slice()
ate3[2].user = 'dahuzi'
console.log(ate, ate3)
// https://camo.githubusercontent.com/20a8e54f1a5824e705d987ef4d55d647c7527bac/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31322f32332f313637646137346434356433313033623f773d36323026683d31383926663d706e6726733d3134393030

// 深拷贝的实现方式
JSON.parse(JSON.stringify())
  /* 如何写出一个惊艳面试官的深拷贝? https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1  https://juejin.im/post/5bc1ae9be51d450e8b140b0c */
