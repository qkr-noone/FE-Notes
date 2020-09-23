// 单例模式  通过 ES6 的 Proxy 拦截构造函数的执行方法来实现的单例模式
// https://juejin.im/post/6844903856489365518
// 无法理解
function proxy(func) {
  let instance
  let handler = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args)
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}

// 9.22 recode
proxy(() => console.log(12))
// more https://juejin.im/post/6844904054498263053

;(function() {
  let fish = null
  function catchFish() {
    if (fish) {
      return {
        fish,
        water: function() {
          let water = this.fish['weight']
          this.fish['weight'] = ++water
          return this.fish['weight']
        }
      }
    } else {
      fis = fish = { val: 1 }
      return {
        fish,
        water: function() {
          let water = 0
          this.fish['weight'] = ++water
          return this.fish['weight']
        }
      }
    }
  }
  setInterval(() => {
    console.log(catchFish().water())
  }, 3000);
})

// 传统的单例模式
// 和 new 创建对象的调用不一样
// 调用者要调用 xxx.getInstance 才能获得该单例
function Singleton(name) {
  this.name = name
}
Singleton.getInstance = function (name) {
  if (this.instace) {
    return this.instace
  } else {
    this.instace = new Singleton(name)
    return this.instace
  }
}

var a = Singleton.getInstance('a')
var b = Singleton.getInstance('b')
a // Singleton {name: "a"}
console.log(a === b) // true

// “透明”的单例模式
// 透明的 单例类，用户从这个类中创建对象的时候，可以像使用其他任何普通类一样
// 直接 new 一个对象
// 不能 new 多个对象，扩展性不好
var instace;
function Person(name) {
  this.name = name
  if (!instace) {
    instace = this
  }
  return instace
}
Person.prototype.getName = function() {
  console.log(this.name);
}
var a = new Person('a')
var b = new Person('b')
a // Person {name: "a"}
console.log(a === b) // true

// 代理模式创建单例模式
// 代理模式:自己不去做，委托中间人做
// Person是一个普通类，通过new Person可以创建一个对象
// 用代理模式创建CreateSinglePerson方法，通过new CreateSinglePerson可以创建一个单例
function Person(name) {
  this.name = name
}
Person.prototype.getName = function () {
  console.log(this.name)
}
var CreateSinglePerson = (function (name) {
  var instance;
  return function () {
    if (!instance) {
      instance = new Person(name)
    }
    return instance
  }
})();

var a = new CreateSinglePerson('a')
var b = new CreateSinglePerson('b')
a // Person {name: undefined}
console.log(a === b) // true
var c = new Person('c')
var d = new Person('d')
console.log(c === d) // false

// JavaScript中的单例模式
// 单例模式的核心是确保只有一个实例，并提供全局访问
// 在JavaScript可以通过直接创建一个对象来实现单例模式
// 可以用闭包的方式实现私有变量

let MyApp = {
  name: 'app',
  getName: function() {
    console.log(this.name)
  }
}
let Msd = (function () {
  var _name = 'app'
  return {
    getName: function () {
      console.log(_name)
    }
  }
})();
console.log(Msd)

// 惰性单例
// 惰性单例是指在需要的时候才创建
// 🌰：调用render方法，创建A对象，可以多次调用render方法，A对象是单例的

var createA = (function() {
  var instance;
  return function () {
    if (!instance) {
      instance = 'A'
    }
    return instance
  }
})()
function render() {
  createA()
  console.log('b');
}
render()
render()

function getSingleton(fn) {
  var result;
  return function() {
    return result||(result = fn.apply(this, arguments))
  }
}
var createA = function () {
  var instance;
  if (!instance) {
    instance = 'A'
  }
  return instance
}
var createB = function () {
  var instance;
  if (!instance) {
    instance = 'B'
  }0                                                   
  return instance
}
var createASingle = getSingleton(createA)
var createBSingle = getSingleton(createB)
function render() {
  createASingle()
  createBSingle()
}
render()
render()
/* 
小结
单例模式用到了闭包和高阶函数的特性。单例模式是简单但常用到的模式，
比如单页应用、websocket连接等等。特别是惰性单例模式，用到时才创建，
再次用到是不需要再次创建。创建对象和管理单例的职责分布在不同的方法中，方便扩展和管理。
 */

// 代理模式
// 计算缓存器代理模式
function sum(a, b) {
  return a + b
}
let proxySum = (function() {
  let cache = {}
  return function() {
    let args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }

    cache[args] = sum.apply(this, arguments)
    return cache[args]
  }
})()