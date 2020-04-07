{
  // 颜色转rgb  #adcddd => { red: 173, green: 205, blue: 221 } / rgb(138, 164, 177)
  function getColorChannels(color) {
    color = color.replace('#', '');
    if (/^[0-9a-fA-F]{3}$/.test(color)) {
      color = color.split('');
      for (let i = 2; i >= 0; i--) {
        color.splice(i, 0, color[i]);
      }
      color = color.join('');
    }
    if (/^[0-9a-fA-F]{6}$/.test(color)) {
      return {
        red: parseInt(color.slice(0, 2), 16),
        green: parseInt(color.slice(2, 4), 16),
        blue: parseInt(color.slice(4, 6), 16)
      };
    } else {
      return {
        red: 255,
        green: 255,
        blue: 255
      };
    }
  }
  function mixColor(color, percent) {
    let { red, green, blue } = getColorChannels(color);
    if (percent > 0) { // shade given color
      red *= 1 - percent;
      green *= 1 - percent;
      blue *= 1 - percent;
    } else { // tint given color
      red += (255 - red) * percent;
      green += (255 - green) * percent;
      blue += (255 - blue) * percent;
    }
    return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
  }
  console.log(getColorChannels('#adcddd'))
  console.log(mixColor('#adcddd', 0.2))


  // 如何实现一个 Promise
  // https://juejin.im/post/5d0da5c8e51d455ca0436271
  // https://juejin.im/post/5bc5e114e51d450e632277aa
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function SetPromise(fn) {
    let _this = this
    _this.currentState = PENDING
    _this.value = undefined
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []

    _this.resolve = function (value) {
      if (value instanceof SetPromise) {
        // 待续
      }
    }
  }

  function spawn(genF) {
    return new Promise((resolve, reject) => {
      const gen = getF()
      function tem(nextF) {
        let next
        try {
          next = nextF()
        } catch (e) {
          return reject(e)
        }
        if (next.done) {
          return resolve(next.value)
        }
        Promise.resolve(next, value).then(
          function (v) {
            step(function () {
              return gen.next(v)
            })
          },
          function (e) {
            step(function () {
              return get.throw(e)
            })
          }
        )
      }
      step(function () {
        return gen.next(undefined)
      })
    })
  }

  // 数组 map： 循环方法实现
  const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = Array()
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      mappedArr[i] = fn.call(context, arr[i], i, this)
    }
    return mappedArr
  }

  Array.prototype.selfMap = selfMap

  [1, 2, 3].selfMap(num => num * 2)

  // 数组 map: 循用 reduce 实现
  const selfMap2 = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index) => {
      return [...pre, fn.call(context, cur, index, this)]
    }, [])
  }

  // 数组 filter: 使用循环实现
  const selfFilter = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let filteredArr = []
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
    }
    return filteredArr
  }

  // 数组 filter: 使用 reduce 实现
  const selfFilter2 = function (fn, context) {
    return this.reduce((pre, cur, index) => {
      return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
    })
  }

  // 数组 some: 使用循环实现
  const selfSome = function (fn, context) {
    let arr = Array.prototype.slice.call(this)

    if (!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      let res = fn.call(context, arr[i], i, this)
      if (res) return true
    }
  }

  // 数组 reduce: 使用循环实现
  Array.prototype.selfReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    let res
    let startIndex
    if (initialValue === undefined) {
      for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        startIndex = i
        res = arr[i]
        break
      }
    } else {
      res = initialValue
    }

    for (let i = ++startIndex || 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      res = fn.call(null, res, arr[i], i, this)
    }
    return res
  }

  // 实现 ES6 的 class 语法
  function inherit(subType, superType) {
    subType.prototype = Object.create(superType.prototype, {
      constructor: {
        enumerable: false,
        configurable: true,
        writable: true,
        value: subType
      }
    })

    Object.setPrototypeOf(subTyep, superType)
  }

  // 实现函数 call 方法
  const selfCall = function (context, ...args) {
    let func = this
    content || (context = window)
    if (typeof func !== 'function') throw new TypeError('this is not function')
    let caller = Symbol('caller')
    context[caller] = func
    let res = context[caller](...args)
    delete context[caller]
    return res
  }

  // 图片懒加载 getBoundClientRect 的实现方式
  let imgList = [...document.querySelectorAll('img')]
  let num = imgList.length

  let lazyLoad = (function () {
    let count = 0
    return function () {
      let deleteIndexList = []
      imgList.forEach((img, index) => {
        let rect = img.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          img.src = img.dataset.src
          deleteIndexList.push(index)
          count++
          if (count === num) {
            document.removeEventListener('scroll', lazyLoad)
          }
        }
      })
      imgList = imgList.filter((_, index) => !deleteIndexList.includes(index))
    }
  })

  // 图片懒加载 intersectionObserver 的实现方式
  let imgsList = [...document.querySelectorAll('img')]

  let lazysLoad = function () {
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.src = entry.target.data.src
          observer.unobserve(entry.target)
        }
      })
    })
    imgsList.forEach(img => {
      observer.observe(img)
    })
  }

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


  /* 跨域 JSONP */
  // index.js
  function jsonp({ url, params, callback }) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script')
      window[callback] = function (data) {
        resolve(data)
        document.body.removeChild(script)
      }
      params = { ...params, callback } // wd=b&callback=show
      let arrs = []
      for (let key in params) {
        arrs.push(`${key}=${params[key]}`)
      }
      script.src = `${url}?${arrs.join('&')}`
      document.body.appendChild(script)
    })
  }
  jsonp({
    url: 'http://localhost:3000/say',
    params: { wd: 'ILOVEY' },
    callback: 'show'
  }).then(data => {
    console.log(data)
  })

  // server.js
  let express = require('express')
  let app = express()
  app.get('/say', function (req, res) {
    let { wd, callback } = req.query
    console.log(wd) // ILOVEY
    console.log(callback) // show
    res.end(`${callback}('NOT')`)
  })
  app.listen(3000)


  /* 跨域 CORS */

  // index.html
  let xhr = new XMLHttpRequest()
  document.cookie = 'name=textname' // cookie 不能跨域
  xhr.withCredentials = true // 前端设置是否带 cookie
  xhr.open('PUT', 'http://localhost:4000/getData', true)
  xhr.setRequestHeader('name', 'textname')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.log(xhr.response)
        // 得到响应头，后台需设置Access-Control-Expose-Headers
        console.log(xhr.getResponseHeader('name'))
      }
    }
  }
  xhr.send()

  // server1.js
  let express = require('express')
  let app = express()
  app.use(express.static(__dirname))
  app.listen(3000)

  // server2.js
  let express = require('express')
  let app = express()
  let whitList = ['http://localhost:3000'] // 设置白名单
  app.use(function (req, res, next) {
    let origin = req.headers.origin
    if (whitList.includes(origin)) {
      // 设置哪个源可以访问我
      res.setHeader('Access-Control-Allow-Origin', origin)
      // 允许携带哪个头访问我
      res.setHeader('Access-Control-Allow-Headers', 'name')
      // 允许哪个方法访问我
      res.setHeader('Access-Control-Allow-Methods', 'PUT')
      // 允许携带cookie
      res.setHeader('Access-Control-Allow-Credentials', true)
      // 预检的存活时间
      res.setHeader('Access-Control-Max-Age', 6)
      // 允许返回的头
      res.setHeader('Access-Control-Expose-Headers', 'name')
      if (req.method === 'OPTIONS') {
        res.send() // OPTIONS 请求不做任何处理
      }
    }
    next()
  })

  app.put('/getData', function (req, res) {
    console.log(req.headers)
    res.setHeader('name', 'jw') // 返回一个响应头， 后台需设置
    res.send('NOT')
  })
  app.get('/getData', function (req, res) {
    console.log(req.headers)
    res.end('NOT')
  })
  app.use(express.static(__dirname))
  app.listen(4000)


  /* 跨域 postMessage + iframe */
  /* 
    postMessage是HTML5 XMLHttpRequest Level 2中的API，
    且是为数不多可以跨域操作的 window 属性之一，它可用于解决以下方面的问题：
      页面和其打开的新窗口的数据传递
      多窗口之间消息传递
      页面与嵌套的iframe消息传递
      上面三个场景的跨域数据传递
    postMessage() 方法允许来自不同源的脚本采用异步方式进行有限的通信，
    可以实现跨文本档、多窗口、跨域消息传递。
  */

  /* 跨域 websocket  Node中间件代理 nginx反向代理 */

  /* 跨域 window.name + iframe */
  /* window.name属性的独特之处： name值在不同的页面（甚至不同域名）加载后依旧存在， 并且可以支持非常长的 name 值（2MB） */
  /* location.hash + iframe */
  /* document.domain + iframe */

  // 如何解决跨域
  // JSONP 利用 <script> 标签没有跨域限制，访问一个地址并且提供一个回调函数来接收数据（get）
  // CORS 需要浏览器和后端同事支持，关键是后端 服务端设置 Access-Control-Allow-Origin 可以开启
  // document.domain 只能用于耳机域名相同情况下，只需要给页面添加 document.domain = 'test.com', 表示耳机域名都相同就可以实现跨越
  // postMessage 用于获取嵌入页面中的第三方页面数据，一个页面发送消息，另一个页面判断来源并接收消息

  // 发送消息端
  window.parent.postMessage('message', 'http://url.com')
  // 接收消息端
  let mc = new MessageChannel()
  mc.addEventListener('message', event => {
    let origin = event.origin || event.originalEvent.origin
    if (origin === 'http://url.com') {
      console.log('验证通过...')
    }
  })

  // 实现一个 JSONP
  // 简单版
  function myJsonp(url, jsonCallback, success) {
    let script = document.createElement('script')
    script.src = url
    script.async = true
    script.type = 'text/javascript'
    window[jsonCallback] = function (data) {
      success && success(data)
    }
    document.body.appendChild(script)
  }
  myJsonp('http://apiurl..', 'callback', function (value) {
    console.log(value)
  })

  // promise 实现 JSONP
  function jsonp(options) {
    return new Promise((resolve, reject) => {
      // 自增值初始化
      let count = 0
      // 设置默认参数
      if (!options || !options.url) reject(new ReferenceError('参数错误'))
      let { url = '', prefix = '__jp', param = 'callback', timeout = 20000, data = {} } = options
      let name = prefix + count++
      let timer
      // 清楚 script 标签以及注册的全局函数以及超时定时器
      function cleanup() {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
          window[name] = null
          if (timer) {
            clearTimeout(timer)
          }
        }
      }
      if (timeout) {
        timer = setTimeout(() => {
          cleanup()
          reject('timeout')
        }, timeout)
      }
      // 注册全局函数， 等待执行中
      window[name] = res => {
        // 只要该函数已执行，就表示请求成功，可以使用清除函数
        if (window[name]) {
          cleanup()
        }
        // 将请求到的数据扔给then
        resolve(res)
      }

      // 以下将 data 对象格式的参数拼接到 url 的后面
      let str = []
      for (const key in data) {
        // const value = data[key] !== undefined ? data[key] : ''
        // str += `&${key}=${encodeURIComponent(value)}`
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      }
      url = url + (url.indexOf('?') > 0 ? '' : '?') + str.join('&')
      // 最后加上与服务端协商的 jsonp 请求字段
      url = `${url}&${param}=${name}`
      const script = document.createElement('script')
      script.src = url
      document.head.appendChild(script)
      // 出错处理
      script.onerror = error => {
        reject(new Error('error'))
        cleanup()
      }
    })
  }
  jsonp({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    },
    // QQ音乐接口Jsonp字段
    param: 'jsonpCallback'
  })
    .then(res => {
      console.log(res);
    })
    .catch(ex => {
      console.log(ex);
    })



  /* OOP 继承六种方式 */
  // JavaScript深入之继承的多种方式和优缺点 https://github.com/mqyqingfeng/Blog/issues/16
  // 扩展 Class:  ES6 系列之 Babel 是如何编译 Class 的(下) https://juejin.im/post/5be2f3866fb9a04a0d5654ba



  // new 关键字
  const isComplexDataType = obj =>
    (typeof obj === 'object' || typeof obj === 'function') && obj !== null
  const selfNew = function (fn, ...rest) {
    let instance = Object.create(fn.prototype)
    let res = fn.apply(instance, rest)
    return isComplexDataType(res) ? res : instance
  }

  // 单例模式  通过 ES6 的 Proxy 拦截构造函数的执行方法来实现的单例模式
  function proxy(func) {
    let instance
    let handler = {
      constructor(target, args) {
        if (!instance) {
          instance = Reflect.construct(func, args)
        }
        return instance
      }
    }
    return new Proxy(func, handler)
  }


  // 浅拷贝的实现方式   https://juejin.im/post/5b5dcf8351882519790c9a2e#heading-3
  Object.assign() // 当 object 只有一层的时候，是深拷贝
  Array.prototype.concat()
  Array.prototype.slice()

  /*
    Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组
      原数组的元素会按照下述规则拷贝：
        如果该元素是个对象引用(不是实际的对象)，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
        对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组
  */

  // for in 的浅拷贝实现方式
  function shallowCopy(src) {
    let d = {}
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        d[prop] = src[prop]
      }
    }
  }

  let ate = [1, 2, { user: 'kobe', max: 10000 }]
  let ate2 = ate.concat()
  ate2[2].user = 'james'
  console.log(ate, ate2)

  let ate3 = ate.slice()
  ate3[2].user = 'dahuzi'
  console.log(ate, ate3)
  // https://camo.githubusercontent.com/20a8e54f1a5824e705d987ef4d55d647c7527bac/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31322f32332f313637646137346434356433313033623f773d36323026683d31383926663d706e6726733d3134393030

  // 深拷贝的实现方式
  JSON.parse(JSON.stringify())
  /* 如何写出一个惊艳面试官的深拷贝? https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1  https://juejin.im/post/5bc1ae9be51d450e8b140b0c */

  // 简单实现一个 instanceof
  function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
      if (left === null) {
        return false
      }
      if (prototype === left) {
        return true
      }
      left = left.__proto__
    }
  }


  /* 
    如何实现一个插件
      调用 apply 函数传入 compiler 对象
      通过 compiler 对象监听事件
   */

  //  比如你想实现一个编译结束退出命令的插件
  class BuildEndPlugin {
    apply(compiler) {
      const afterEmit = (compilation, cb) => {
        cb()
        setTimeout(function () {
          process.exit(0)
        }, 1000)
      }
      compiler.plugin('after-emit', afterEmit)
    }
  }
  module.exports = BuildEndPlugin


  // js 自定义事件
  window.onload = function () {
    var demo = document.getElementById('demo')
    demo.addEventListener('test', function () { console.log('12handler') })
    demo.addEventListener('test', function () { console.log('22handler') })
    demo.onclick = function () {
      this.triggerEvent('test')
    }
  }
  Element.prototype.addEvent = function (en, fn) {
    this.pools = this.pools || {}
    if (en in this.pools) {
      this.pools[en].push(fn)
    } else {
      this.pools[en] = []
      this.pools[en].push(fn)
    }
  }

  Element.prototype.triggerEvent = function (en) {
    if (en in this.pools) {
      let fns = this.pools[en]
      for (let i = 0; i < fns.length; i++) {
        fns[i]()
      }
    } else {
      return
    }
  }


  // 函数柯里化
  function curring(fn) {
    let allArgs = []

    return function next() {

      let args = [].slice.call(arguments)

      if (args.length) {
        allArgs = allArgs.concat(args)
        return next
      } else {
        return fn.apply(null, allArgs)
      }
    }
  }

  let add = curring(function () {
    let sum = 0
    for (let k = 0; k < arguments.length; k++) {
      sum += arguments[k]
    }
    return sum
  })
  console.log(add(1, 2)(3)(4)(5))

  const adds = (...args) => args.reduce((a, b) => a + b)

  function currings(func) {
    const args = []
    return function result(...rest) {
      if (rest.length === 0) {
        return func(...args)
      } else {
        args.push(...rest)
        return result
      }
    }
  }
  const sums = currings(adds)
  sums(2, 9, 9, 0)
  console.log('value', sums(1))
  console.log(sums())

  // 函数柯里化 二
  function curry(fn) {
    if (fn.length <= 1) return fn
    const generator = (...args) => {
      if (fn.length === args.length) {
        return fn(...args)
      } else {
        return (...args) => {
          return generator(...args, ...args2)
        }
      }
    }
    return generator
  }


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


  // 偏函数
  const partialFunc = (func, ...args) => {
    let placeholderNum = 0
    return (...args) => {
      args2.forEach(arg => {
        let index = args.findIndex(item => item === '_')
        if (index) return
        args[index] = arg
        placeholderNum++
      })
      if (placeholderNum < args2.length) {
        args = args.slice(placeholderNum, args.length)
      }
      return func.apply(this, [...args, ...args2])
    }
  }

  // 斐波那契数列
  /*
    利用函数记忆，将之前运算过的结果保存下来，对于频繁依赖之前结果的计算能够节省大量的时间，
    例如斐波那契数列，缺点就是闭包中的 obj 对象会额外占用内存
  */
  let fibonacci = function (n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
  }

  const memory = function (fn) {
    let obj = {}
    return function (n) {
      if (obj[n] === undefined) obj[n] = fn(n)
      return obj[n]
    }
  }

  fibonacci = memory(fibonacci)

  /* 另外使用动态规划比前者的空间复杂度更低，也是更推荐的解法 */

  function fibonacci_DP(n) {
    let res = 1
    if (n === 1 && n === 2) return res
    n = n - 2
    let cur = 1
    let pre = 1
    while (n) {
      res = cur + pre
      pre = cur
      cur = res
      n--
    }
    return res
  }

  // 滑动窗口最大值 问题 http://47.98.159.95/leetcode-js/stack-queue/dequeue.html#滑动窗口最大值
  let maxSlidingWindow = function (nums, k) {
    // 异常处理
    if (nums.length === 0 || !k) return []
    let window = [], res = []
    for (let i = 0; i < nums.length; i++) {
      if (window[0] !== undefined && window[0] <= i - k) {
        window.shift();
      }
      while (nums[window[window.length - 1]] <= nums[i]) {
        window.pop()
      }
      window.push(i)
      if (i >= k - 1) {
        res.push(nums[window[0]])
      }
    }
    return res
  }

  // 自己实现
  let maxSliding = function (nums, k) {
    // 结果和窗口下标（队首是最大）
    let res = [], range = []
    for (let i = 0; i < nums.length; i++) {
      // 把滑动窗口之外删除
      if (range[0] !== undefined && range[0] <= i - k) range.shift()
      // 保证队首最大
      while (nums[range[range.length - 1]] <= nums[i]) {
        range.pop()
      }
      range.push(i)
      if (i >= k - 1) res.push(nums[range[0]])
    }
  }
}