// 发布订阅 EventEmitter
class EventEmitter {
  constructor() {
    this.subs = {}
  }

  on(event, cb) {
    (this.subs[event] || (this.subs[event] = [])).push(cb)
  }

  trigger(event, ...args) {
    this.subs[event] &&
      this.subs[event].forEach(cb => {
        cb(...args)
      })
  }
  once(event, onceCb) {
    const cb = (...args) => {
      onceCb(...args)
      this.off(event, onceCb)
    }
    this.on(event, cb)
  }

  off(event, offCb) {
    if (this.subs[event]) {
      let index = this.subs[event].findIndex(cb => cb === offCb)
      this.subs[event].splice(index, 1)
      if (!this.subs[event].length) delete this.subs[event]
    }
  }
}