// 参照示例
function* test() {
  let a = 10 + 1
  yield a++
  yield a
}
let b = test()
console.log(b, b.next())
console.log(b.next())
console.log(b.next())

// 实现一个 generator
// cb就是编译过来的 test 函数
function generator(cb) {
  return (function () {
    let obj = { next: 0, stop: function () { } }
    return {
      next: function () {
        let ret = cb(obj)
        if (ret === undefined) return { value: undefined, done: true }
        return {
          value: ret,
          done: false
        }
      }
    }
  })()
}