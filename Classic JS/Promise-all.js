/* 
    Promise.all() 知识点:
    1. 返回一个 Promise 实例 完成状态是一个数组
    2. 参数是可迭代对象 （for of）
    3. 参数是空迭代对象  返回 resolved Promise  => 一个空的数组
    4. 返回按照传入参数顺序返回结果
    5. 只要其中一个 Promise reject 就返回这个 reject
 */


/* Promise.all 的一个简版实现  1 2 3 4 5 */
function myAll(iterable) {
  return new Promise((resolve, reject) => {
    let index = 0
    for (const promise of iterable) {
      const curIndex = index
      // 异步
      promise.then(value => {
        if (anErrorOccurred) {
          return
        }
        // 放入顺序和输入顺序一样
        result[curIndex] = value
        // result 此时长度已确定 通过 elementCount 自增去判断
        // elementCount++
        if (result.length === curIndex + 1) {
          resolve(result)
        }
      }, error => {
        if (anErrorOccurred) {
          return
        }
        anErrorOccurred = true
        reject(error)
      })
      index++
    }
    if (index === 0) {
      resolve([])
      return
    }
    // 异步主体体使用的
    // 此时 index 为参数长度  anErrorOccurred 判断是否有 rejected
    // let elementCount = 0;
    let anErrorOccurred = false;
    const result = new Array(index);
  })
}

let [c, d] = [Promise.resolve(10), Promise.reject(2)]
myAll([c, d]).then(res => {
  console.log('success', res)
}).catch(error => console.log('error', error))

// BEST 9.8
// 实现 Promise.all
Promise.newAll = function (promises) {
  return new Promise((resolve, reject) => {
    // 状态是 rejected
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError(promises + ' is not iterable'))
    }
    let result = [], index = 0, len = promises.length
    // 状态是 fulfilled
    if (len === 0) {
      return resolve(result)
    }

    for (let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then，promise[i] 可能不是一个 promise 实例
      Promise.resolve(promises[i]).then(data => {
        // let 块级作用域 让 i 对应执行顺序
        console.log(i)
        result[i] = data
        index++
        if (index === len) resolve(result)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
const p1 = new Promise((resolve, reject) => {
  // resolve(1)
  reject(1)
})
const p2 = new Promise((resolve, reject) => {
  // resolve(2)
  setTimeout(() => {
    // resolve(2)
    reject('bad')
  }, 3000)
})
const p3 = new Promise((resolve, reject) => {
  // resolve(3)
  reject('bad')
})
const p4 = Promise.resolve(4)
const p5 = 'p5'
const p6 = Promise.resolve()
Promise.newAll([p1, p2, p3, p4, p5, p6])
  .then(res => console.log(80, res)) // 80 [ 1, 2, 3, 4, 'p5', undefined ]
  .catch(e => console.log(e)) // bad

// 9.24 recode
Promise.alphaAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError(promises + ' is not iterable'))
    }
    let result = [], index = 0, len = promises.length
    if (len === 0) {
      return resolve(result)
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        result[i] = data
        index++
        if (index === len) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}