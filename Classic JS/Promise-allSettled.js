// newAllSettled
Promise.newAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    // 状态是 rejected
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError(promises + ' is not iterable'))
    }
    let res = [], index = 0, len = promises.length
    // 状态是 fulfilled
    if (len === 0) {
      return resolve([])
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(item => {
        res[i] = { status: 'fulfilled', value: item }
        index++
        if (index === len) {
          return resolve(res)
        }
      }).catch(err => {
        index++
        res[i] = { status: 'rejected', reason: err }
        if (index === len) {
          return resolve(res)
        }
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

// 去验证
Promise.newRace([p1, p6, p2, p3, p4, p5])
  .then(res => console.log(70, res))
  .catch(e => console.log(33, e))