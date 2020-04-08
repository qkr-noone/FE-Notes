// 实现 (a == 1 && a == 2 && a == 3) 值为真
class ResetA {
  constructor(value) {
    this.value = value
  }
  // toString() {
  //   return this.value++
  // }
  // valueOf返回的值是基本数据类型 所以也可以使用 valueOf 实现
  valueOf() {
    return this.value++
  }
}
const resA = new ResetA(1)
if (resA == 1 && resA == 2 && resA == 3) {
  console.log('qkrnoone pass')
} else {
  console.log('NOONE')
}

// 实现 （a === 1 && a === 2 && a === 3）值为真

var value = 0
Object.defineProperty(window, 'a', {
  get() {
    return this.value += 1
  }
})
console.log((a === 1 && a === 2 && a === 3))
