// 使用 Proxy 实现观察者模式 （Observer mode）
// 观察者模式指的是函数自动观察数据对象的模式，一旦对象有变化，函数就会自动执行

// P13.3 ES6 标准入门

const queuedObservers = new Set()

const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(obj, { set })
function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach(observer => observer())
  return result
}

const person = observable({
  name: 'qkr',
  age: 22,
  size: {small: true}
})
function print() {
  console.log(`${person.name}，${person.age}`)
  console.log(JSON.stringify(person))
}

observe(print)

person.name = {next: 12}
person.size.small = 1 // 不会触发打印
person.height = 172


// 用 Proxy 来实现一个 pub/sub 模式 https://zhuanlan.zhihu.com/p/35080324

// observe.js
export function observe(target, onChange) {
  return createProxy(target, onChange)
}
function createProxy(target, onChange) {
  const trap = {
    get(object, prop) {
      const value = object[prop]

      // 这里还可以优化，不应该每次都创建新的 proxy
      if (typeof value === 'object' && value !== null) {
        return createProxy(object[prop], onChange)
      }

      return value
    },
    set(object, prop, value, ...args) {
      onChange()
      return Reflect.set(object, prop, value, ...args)
    }
  }
  return new Proxy(target, trap)
}

// observe.test.js
/* test, jest, expect 测试环境的 api ? */
test('observe', () => {
  const stub = jest.fn()
  const data = {
    user: {
      name: 'foo',
    },
    colors: ['res']
  }

  const reactiveData = observe(data, stub)

  // push 会触发两次 set 钩子
  // 设置属性 和 length 属性设置为 2
  reactiveData.colors.push('blue')

  reactiveData.colors.name = 'baz'

  // 动态增加一个新的属性
  reactiveData.type = 'new-value'

  expect(stub).toHaveBeenCalledTimes(4)
})

// continue https://juejin.im/post/6844903601416978439

// 使用Proxy实现vue数据双向绑定 https://www.cnblogs.com/goloving/p/12911476.html
// 用Proxy实现简单的vue双向绑定 https://www.cnblogs.com/tugenhua0707/p/10306793.html
// https://juejin.im/post/6844903990170222600#heading-3
// vue 3.0 原理源码进阶
// https://juejin.im/post/6854573211528069128