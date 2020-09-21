// 执行上下文栈 执行上下文(execution context)
`
可执行代码(executable code)的类型有哪些了？

其实很简单，就三种，全局代码、函数代码、eval代码。

举个例子，当 ***执行到一个函数*** 的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

写的函数多了去了，如何管理创建的那么多执行上下文呢？

所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

https://juejin.im/post/58ec3cc944d90400576a2cdc
https://github.com/mqyqingfeng/Blog/issues/4
https://juejin.im/post/58f03a958d6d8100579b74df
`

// 变量对象（VO）活动对象（AO）
`
对于每个执行上下文，都有三个重要属性：
  {
    变量对象(Variable object，VO)
    作用域链(Scope chain)
    this
  }
变量对象
  {
    变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
    因为不同执行上下文下的变量对象稍有不同
    {
      全局上下文中的变量对象就是全局对象
      函数上下文中，我们用活动对象(activation object, AO)来表示变量对象
    }
  }

对于函数上下文来讲，活动对象与变量对象其实都是同一个对象，只是处于执行上下文的不同生命周期。
不过只有处于执行上下文栈栈顶的函数执行上下文中的变量对象，才会变成活动对象

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。
活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，
只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，
也就是活动对象上的各种属性才能被访问。


一个执行上下文的生命周期可以分为两个阶段。
  {
    1. 创建阶段
    在这个阶段中，执行上下文会分别创建变量对象，建立作用域链，以及确定this的指向。

    2.代码执行阶段
    创建完成之后，就会开始执行代码，这个时候，会完成变量赋值，函数引用，以及执行其他代码。
  }
  ...侧重点主要是 EC(执行上下文) 的生命周期的第一个阶段，我觉得再执行 var foo = 1 这句话有点不妥，应该是给foo赋值，
  应该是执行foo=1这个操作，因为在EC创建阶段var已经被扫描了一遍

Q: VO 和 AO 到底是什么关系
A: 未进入执行阶段之前，变量对象(VO)中的属性都不能访问！
但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作

举个例子
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);

在进入执行上下文后，这时候的 AO 是：
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}

https://juejin.im/post/58ec3cc944d90400576a2cdc https://github.com/mqyqingfeng/Blog/issues/5
`

// 词法作用域 和 动态作用域
`作用域是指程序源代码中定义变量的区域。

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域

因为 JavaScript 采用的是词法作用域，函数的作用域在**函数定义**的时候就决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的  其他语言 如（bash）

（评论也要看）
https://github.com/mqyqingfeng/Blog/issues/3
`
// 作用域 作用域链 https://github.com/mqyqingfeng/Blog/issues/6
`当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，
一直找到全局上下文的变量对象，也就是全局对象。 这样由多个执行上下文的变量对象构成的链表就叫做作用域链

函数的创建和激活两个时期来讲解作用域链是如何创建和变化

这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，
你可以理解 [[scope]] 就是所有父变量对象的层级链， 但是注意：[[scope]] 并不代表完整的作用域链


`

// 函数生命周期 https://pic4.zhimg.com/v2-88a513ba2ce27b5b41ec6e188d07b30f_r.jpg


// 闭包 https://juejin.im/post/5b081f8d6fb9a07a9b3664b6  https://juejin.im/post/5b1fa77451882513ea5cc2ca
// https://juejin.im/post/590159d8a22b9d0065c2d918
`
简单理解 本质就是上级作用域内变量的生命周期，因为被下级作用域内引用，而没有被释放。就导致上级作用域内的变量，
等到下级作用域执行完以后才正常得到释放

MDN 对闭包的定义为： 闭包是指那些能够访问自由变量的函数。

那什么是自由变量呢？ 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

由此，我们可以看出闭包共有两部分组成： 闭包 = 函数 + 函数能够访问的自由变量

实践角度上闭包的定义：

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
2. 在代码中引用了自由变量
`

// 原型 原型链 https://github.com/mqyqingfeng/Blog/issues/2

`
1. prototype： 每个函数都有一个 prototype 属性，prototype 是函数才会有的属性.
2. __proto__： 这是每一个 JavaScript 对象(除了 null )都具有的一个属性，叫 __proto__，这个属性会指向该对象的原型.
3. constructor： 每个原型都有一个 constructor 属性指向关联的构造函数.
4. 原型对象: 原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 __proto__ 指向构造函数的 prototype. 可以得到下图第二部分
5. 原型链： JavaScript对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链.
`
`
                 ---- prototype --->
                ^                   |
                |                   V
1. 构造函数 Person                   Person.prototype (实例原型)
            |   |                   |   ^    |
            |    <- constructor  --     |    |
            |                           |    |
            V                           |    |
          person --- a. __proto__  ---       |  b. __proto__
                                             |
                                             |
                 --- prototype -->           |
                ^                 |          |
                |                 V          V
      2. Object()                 Object.prototype
                |                 |          |
                <- constructor  --           | c. __proto__
                                             |
                                             V
                                            null

    图中由相互关联的原型组成的链状结构就是原型链，就是 a -> b -> c
`
// 第一部分
function Person() {}
var person = new Person()
console.log(person.__proto__ === Person.prototype) // true
console.log(Person === Person.prototype.constructor) // true
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
// 第二部分
// 原型对象就是通过 Object 构造函数生成的
var obj = new Object()
obj.name = 'qkr001'
console.log(obj.__proto__ === Object.prototype) // true
console.log(Object === Object.prototype.constructor) // true
console.log(Object.prototype.__proto__ === null) // true

// 什么是原型呢？
`
你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，
这个对象就是我们所说的原型， 每一个对象都会从原型"继承"属性。
`

`
1.原型对象和构造函数有何关系？
在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。
当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。
https://user-gold-cdn.xitu.io/2019/10/20/16de955a81892535?imageslim

2.能不能描述一下原型链？
JavaScript对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。
https://user-gold-cdn.xitu.io/2019/10/20/16de955ca89f6091?imageView2/0/w/1280/h/960/format/webp/ignore-error/1


对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true
`

// https://juejin.im/post/58f94c9bb123db411953691b#heading-2
`简单回顾下构造函数,原型和实例的关系:

每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.
`

`
确定原型和实例的关系
怎么去判断原型和实例的这种继承关系呢? 方法一般有两种.
第一种是使用 instanceof 操作符, 只要用这个操作符来测试实例(instance)与原型链中出现过的构造函数,结果就会返回true.
第二种是使用 isPrototypeOf() 方法, 同样只要是原型链中出现过的原型, isPrototypeOf() 方法就会返回true.
console.log(Parent.prototype.isPrototypeOf(instance))
`
// 拓展 './Classic JS/Class.js|Class&继承.js'
// 继承 -> Class -> new 

// 对比及解释 WebSocket  Web Workers   Service Worker
// https://juejin.im/post/6844903696560553991
`WebSocket
  在 H5 的 WebSocket 出现前，实现消息推送的主要方式是 长轮询、短轮询、iframe流

  短轮询（Polling）和长轮询（Long-Polling）， 都是先由客户端发起 Ajax 请求，才能进行通信，走的是 HTTP 协议，服务器端无法主动向客户端推送信息。

  HTTP是半双工通信
  这种半双工通信的特点就是：
  a. 同一时刻数据是单向流动的，客户端向服务端请求数据->单向，服务端向客户端返回数据->单向
  b. 服务器不能主动的推送数据给客户端

  而 WebSocket 实现在客户端和服务端上建立了一个长久的连接，两边可以任意发数据 => 双工通信

  优势：
  1. 支持双向通信，实时性更强
  2. 更好的二进制支持
  3. 较小的控制开销 (连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较少)
`
// 基本用法 在 express-server 服务器调试
function connectWebSocket () {
  const ws = new WebSocket('ws://localhost:9999')
  // 客户端与服务端建立连接后触发
  ws.onopen = function () {
    ws.send('hello')
  }
  // 监听服务端消息(接收消息)
  ws.onmessage = function (res) {
    console.log(res) // 打印的是 MessageEvent 对象
    console.log(res.data) // 真正的消息数据时 res.data
  }
  ws.onerror = function () {
    console.log('连接失败，正在重新连接...')
    connectWebSocket()
  }
  // 监听关闭
  ws.onclose = function () {
    console.log('连接关闭')
  }
}
connectWebSocket()

`Web Worker
  https://juejin.im/post/6844903638431694862
  https://juejin.im/post/6844903736238669837
  http://www.ruanyifeng.com/blog/2018/07/web-worker.html
  https://juejin.im/post/6844903590503383054`

`Service Worker
  https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Offline_Service_workers
  https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API/Using_the_Push_API
  https://www.jianshu.com/p/768be2733872`