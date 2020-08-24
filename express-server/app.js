var express = require('express')
var app = express()

// 设置静态文件夹
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/router', (req, res) => res.send('router page'))

app.get('/user', function (req, res) {
  res.send('user page')
})

app.listen(8024)
console.log('create 08/24 to listen 8024')

//  --------- 开始创建一个 websocket 服务 ----------

const Server = require('ws').Server
const ws = new Server({ port: 9999 })

// 监听服务端和客户端的连接情况
ws.on('connection', function(socket) {
  // 监听客户端发来的消息
  socket.on('message', function (msg) {
    // 接收到的信息
    console.log('客户端发来的消息' + msg)
    // 发送给客户端的信息
    socket.send(`这里是服务端，已无法返航，已无法返航，继续前进，继续前进`)
  })
})

/*// 通过 node 的 http 模块来创建一个 server 服务
const server = require('http').createServer(app)
// WebSocket 是依赖 HTTP 协议进行握手的
const io = require('socket.io')(server)
// 监听客户端与服务端的连接
io.on('connection', function(socket) {
  // send 方法来给客户端发消息
  socket.send('青花瓷')
  // 监听客户端的消息是否接收成功
  socket.on('message', function (msg) {
    // 接收到的信息
    console.log(msg)
    // 发送给客户端的信息
    socket.send(`这里是服务端，已无法返航，已无法返航，继续前进，继续前进`)
  })
})
*/