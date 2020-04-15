// 浅拷贝的实现方式   https://juejin.im/post/5b5dcf8351882519790c9a2e#heading-3
Object.assign() // 当 object 只有一层的时候，是深拷贝
Array.prototype.concat()
Array.prototype.slice()
// ...展开运算符 [...arr] 跟arr.slice()是一样的效果
/*
  Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组
    原数组的元素会按照下述规则拷贝：
      如果该元素是个对象引用(不是实际的对象)，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
      对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组
*/

// for in 的浅拷贝实现方式
function shallowCopy(target) {
  let cloneTarget = {}
  for (const prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = target[prop]
    }
  }
  return cloneTarget
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
  /* 如何写出一个惊艳面试官的深拷贝? 
  https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1  优秀
  https://juejin.im/post/5bc1ae9be51d450e8b140b0c
  */

// 基础版本 for in  + 递归
`
如果是原始类型，无需继续拷贝，直接返回
如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
`
function deepBaseCopy(target) {
  if (typeof target === 'object') {
    let cloneTarget = {}
    for (const key in target) {
      cloneTarget[key] = deepBaseCopy(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2'
    }
  }
};
let n = deepBaseCopy(target)
n.field4.child2.child2 = 800
console.log(target, n)
`缺陷 未考虑数组`

function deepObjArrCopy(target) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    for (const key in target) {
      clone[key] = deepObjArrCopy(target[key])
    }
    return clone
  } else {
    return target
  }
}
const target2 = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
    child: 'child',
    child2: {
      child2: [1, 2]
    }
  }
};
let n2 = deepObjArrCopy(target2)
n2.field4.child2.child2[0] = 800
console.log(target2, n2)

`const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target
deepObjArrCopy(target)
`
`递归进入死循环导致栈内存溢出`

`原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况`
`解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：

检查 map 中有无克隆过的对象
有 - 直接返回
没有 - 将当前对象作为key，克隆对象作为value进行存储
继续克隆
`
function deepMapCopy(target, map = new Map()) {
  if (typeof target === 'object') {
    let clone = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, clone)
    for (const key in target) {
      clone[key] = deepMapCopy(target[key], map)
    }
    return clone
  } else {
    return target
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target
console.log(deepMapCopy(target))
// 执行没有报错，且target属性，变为了一个Circular类型，即循环应用的意思

`WeakMap 代替 Map`
`WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的`
`什么是弱引用呢？
  在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
  一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
`
function deepWeakMapCopy(target, map = new WeakMap()) {} // 其他都一样
// 以上仅仅是一版合格的 深拷贝

`性能优化`  // 待续。。。
`for in 在遍历时效率是非常低的 三种循环for、while、for in的执行效率 while的效率是最好`

`我们先使用while来实现一个通用的forEach遍历，
iterate是遍历的回掉函数，他可以接收每次遍历的value和index两个参数`

// 未验证
function toforEach(array, iterate) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iterate(array[index], index);
  }
  return array;
}

function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    toforEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = clone2(target[key], map);
    });

    return cloneTarget;
  } else {
    return target;
  }
}


`
更多版本
深拷贝（尤雨溪版） vuex源码 https://juejin.im/post/5e24590ef265da3e152d27bc#heading-6
深拷贝（高性能版） https://juejin.im/post/5e24590ef265da3e152d27bc#heading-8
`