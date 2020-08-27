// https://juejin.im/post/6844903587043082247
// 更多细节 events.js https://github.com/Gozala/events/blob/master/events.js
/* React/Vue不同组件之间是怎么通信的? */
/* 
1. 父子组件用 Props 通信
2. Vue 非父子组件用 Event Bus 通信
3. 如果项目够复杂,可能需要 Vuex 等全局状态管理库通信
*/

// 如何实现一个Event (Bus) => 发布订阅模式

class EventEmeitter {
  constructor() {
    this._events = this._events || new Map() // 储存事件/回调键值对
    this._maxListener = this._maxListener || 10 // 设置监听上限
  }
}

// 监听名为 type 的事件
EventEmeitter.prototype.addListener = function (type, fn) {
  // 将 type 事件以及对应的 fn 函数放入 this._events 中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn)
  }
}
// 触发名为 type 的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从储存事件键值对的 this._events 中获取对应事件回调函数
  handler = this._events.get(type)
  // emit（一个参数直接传，多个参数使用数组）
  if (args.length > 0) {
    handler.apply(this, args)
  } else {
    handler.call(this)
  }
  return true
}

// 实例化
const emitter = new EventEmeitter()
emitter.addListener('qkr', man => {
  console.log(`youuuu ${man}`)
})
emitter.addListener('qkr', man => {
  console.log(`Noooo ${man}`)
})
emitter.emit('qkr', 'biggggg') // youuuu biggggg
console.log(emitter._events) // Map { 'qkr' => [Function] }
// 只会触发一个， 因此需要改造

class EventEmeitter2 {
  constructor() {
    this._events = this._events || new Map()
    this._max = this.max || 10
  }
}

EventEmeitter2.prototype.emit = function (type, ...args) {
  let handler
  handler = this._events.get(type)
  if (Array.isArray(handler)) {
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args)
      } else {
        handler[i](this)
      }
    }
  } else {
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
  }
  return true
}

EventEmeitter2.prototype.addListener = function (type, fn) {
  const handler = this._events.get(type)
  if (!handler) {
    this._events.set(type, fn)
  } else if (handler && typeof handler === 'function') {
    // 如果 handler 是函数说明只有一个监听者
    this._events.set(type, [handler, fn])
  } else {
    handler.push(fn)
  }
}
// 移除监听
EventEmeitter2.prototype.removeListener = function (type, fn) {
  const handler = this._events.get(type) // 获取对应的函数清单

  if (handler && typeof handler === 'function') {
    this._events.delete(type, fn)
  } else {
    let position
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        position = i
      } else {
        position = -1
      }
    }

    if (position !== -1) {
      handler.splice(position, 1)
      if (handler.length === 1) {
        this._events.set(type, handler[0])
      }
    } else {
      return this
    }
  }
}
const emitters = new EventEmeitter2()
emitters.addListener('qkr', man => {
  console.log(`youuuu ${man}`)
})

let temp = man => {
  console.log(`Noooo ${man}`)
}
emitters.addListener('qkr', temp)
emitters.emit('qkr', 'biggggg')
// youuuu biggggg
// Noooo biggggg
emitters.addListener('qkr2', man => {
  console.log(`TTTTT ${man}`)
})
emitters.emit('qkr2', 'biggggg')
// TTTTT biggggg
console.log(emitters._events)
// TTTTT biggggg
// Map { 'qkr' => [ [Function], [Function: temp] ], 'qkr2' => [Function] }

setTimeout(() => {
  // 无法移除匿名函数
  emitters.removeListener('qkr', temp)
  console.log(emitters._events)
  // Map { 'qkr' => [Function], 'qkr2' => [Function] }
}, 3000);