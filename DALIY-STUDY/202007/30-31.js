
`
用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象

然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝
`
var a = {
  a1: 1,
  a2: {
    b1: 1,
    b2: {
      c1: 1
    }
  }
}

function cloneLoop(x) {
  const root = {}

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }

      }
    }
  }
  return root
}
console.log(cloneLoop(a))



// 爆栈解决办法 深拷贝
function cloneLoop(x) {
  // 用来去重 ---
  const uniqueList = []

  const root = {}

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]
  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    // 数据存在 ---
    let uniqueData = find(uniqueList, data)
    if (uniqueData) {
      parent[key] = uniqueData.target
      continue
    }

    // 数据不存在 ---
    // 保持源数据，在拷贝数据中对应的应用
    uniqueList.push({
      source: data,
      target: res
    })
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }

      }
    }
  }

  return root
}

// ---
function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}
// 1
function clone() {
  let target = {}
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const element = source[key];
      if (typeof source[key] === 'object') {
        target[i] = clone(source[i])
      } else {
        target[i] = source[i]
      }
    }
  }
  return target
}

// 创造数据
function createData(deep, breadth) {
  // 赋值 同一个内存地址
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
    // 赋值 同一个内存地址 temp -> data -> temp['data'] -> data['data'] = {}
    temp = temp['data'] = {};
    console.log(temp, data)
    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
      console.log(temp, data)
    }
  }
  // console.log(temp, data)
  return data;
}

console.log(createData(1, 3)); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}


/* next-tick 实现原理 */
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver

export let isUsingMicroTask = false

const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

// 兼容
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) {
      setTimeout(noop);
    }
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // 这是当 nextTick 不传 cb 参数的时候，提供一个 Promise 化的调用
  // 比如： nextTick().then(() => {})
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

