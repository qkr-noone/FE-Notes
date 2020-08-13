// 实现 __proto__  阮一峰 ES6标准入门 __proto__ 属性 P166
Object.defineProperty(Object, '__proto__', {
  get() {
    let _thisObj = Object(this)
    return Object.getPrototypeOf(_thisObj)
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(this)) {
      return undefined
    }
    if (!isObject(proto)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) {
      throw new TypeError()
    }
  }
})
function isObject(value) {
  return Object(value) === value
}
Object.__proto__ = { 1: 1 }
console.log(Object.getPrototypeOf(Object)) //  { '1': 1 }

// console.log(Object.getPrototypeOf({__proto__: null})) //  { null }

// 实现 getOwnPropertyDescriptors(obj)
function getOwnPropertyDescriptors(obj) {
  const result = {}
  for (const key of Reflect.ownKeys(obj)) {
    obj[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return result
}