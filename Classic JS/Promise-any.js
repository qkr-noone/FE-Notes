// TC39 Stage4
Promise.alphaAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      return resolve(new TypeError(promises + ' is not iterable'))
    }
    let res = [], len = promises.length, temp = 0
    if (len === 0) {
      return resolve(new AggregateError([new Error()], 'All promises were rejected'))
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(item => {
        return resolve(item)
      }).catch(e => {
        temp++
        if(temp === len) {
          return resolve(new AggregateError([new Error()], 'All promises were rejected'))
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
Promise.alphaAny([p1, p2, p3]).then((v) => {
  console.log(v);
}).catch((err) => {
  console.log(err); // AggregateError: All promises were rejected
})