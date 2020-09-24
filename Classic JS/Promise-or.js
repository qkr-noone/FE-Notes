// 实现一个 Promise.or() 方法

/*
  要求： 参数是 promise 数组
  返回数组中的索引靠前成功的 res
  当 n - 1 个 promise 失败时，直接返回它
  类似 或运算
 */
Promise.or = function(promises) {
  let length = promises.length
  let i = 0
  return new Promise((resolve, reject) => {
    help(resolve, reject)
  })
  function help(resolve, reject) {
    promises[i].then(res => {
      resolve(res)
    }).catch(e => {
      if (i === length - 1) {
        reject(e)
      } else {
        i++
        help(resolve, reject)
      }
    })
  }
}
let p1 = new Promise((resolve, reject) => {
  console.log('p1')
  reject(1)
})
let p2 = new Promise((resolve, reject) => {
  console.log('p2')
  setTimeout(() => {
    console.log('setTimeout')
    resolve(2)
  }, 0)
})
let p3 = new Promise((resolve, reject) => {
  console.log('p3')
  reject(3)
})
// Promise.or([p1, p2, p3]).then(res => {
//   console.log(res) // 2
// }).catch(e => console.log('error', e))

// recode 9.23
Promise.orAlpha = function(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError(promises + ' is not iterable'))
    }
    let i = 0, len = promises.length
    if (len === 0) return
    function help(resolve, reject) {
      promises[i].then(res => {
        resolve(res)
      }).catch(e => {
        if (i === len - 1) {
          reject(e)
        } else {
          i++
          help(resolve, reject, i)
        }
      })
    }
    help(resolve, reject)
  })
}

Promise.orAlpha([p1, p2, p3]).then(res => {
  console.log(res) // 2
}).catch(e => console.log('error', e))