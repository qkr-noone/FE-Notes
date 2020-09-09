// 实现 Promise.race
Promise.newRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 状态是 rejected
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError(promises + ' is not iterable'))
    }
    let res = [], len = promises.length
    // 状态是 pending
    if (len === 0) return
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        return resolve(res)
      }).catch(err => {
        return reject(err)
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

Promise.newRace([p1, p6, p2, p3, p4, p5])
  .then(res => console.log(70, res)) // 70 1
  .catch(e => console.log(33, e)) // 33 1