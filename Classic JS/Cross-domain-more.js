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
// document.domain 只能用于二级域名相同情况下，只需要给页面添加 document.domain = 'test.com', 表示二级域名都相同就可以实现跨越
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
    // 清除 script 标签以及注册的全局函数以及超时定时器
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

// 九种跨域方式实现原理 https://juejin.im/post/5c23993de51d457b8c1f4ee1