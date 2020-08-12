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