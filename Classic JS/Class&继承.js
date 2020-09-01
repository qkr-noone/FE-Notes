// 各种继承方式和优缺点 https://juejin.im/post/591523588d6d8100585ba595 结合 https://github.com/mqyqingfeng/Blog/issues/2
// more https://juejin.im/post/6844903475021627400

/* 
1. 原型链继承  
    问题：
        引用类型的属性被所有实例共享
        在创建 Child的实例时， 不能向 Parent 传参
 */
function Parent() {
    this.name = 'qkrnoone'
    this.arr = ['1', '2', 6]
}
Parent.prototype.getName = function () {
    console.log('Parent', this.name)
}
function Child() {

}

Child.prototype = new Parent()

var child1 = new Child()

console.log('child1', child1.getName())

child1.arr.push('addNums')

console.log(child1.arr) // [ '1', '2', 6, 'addNums' ]

var child1T = new Child()

// 引用类型的属性被所有实例共享
console.log(child1T.arr) // [ '1', '2', 6, 'addNums' ]

/* 
2.借用构造函数---经典继承
    优点：
    a.避免了引用类型的属性被所有实例共享
    b.可以在 Child2 中向 Parent2 传参
    缺点：方法都在构造函数中定义， 每次创建实例都会创建一遍方法
 */

function Parent2(name) {
    this.arr = ['1', '2', 6]
    this.name = name
}
function Child2(name) {
    Parent2.call(this, name)
}
var child2 = new Child2()

child2.arr.push('12')

console.log(child2.arr) // [ '1', '2', 6, '12' ]

var child2T = new Child2('argName')

console.log(child2T.arr) // [ '1', '2', 6 ]
console.log(child2T.name) // argName

/*
3.组合继承  原型链继承和经典继承双剑合璧
    优点：
    融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式
    缺点：组合继承最大的缺点是会调用两次父构造函数 分别是 type1 type2
 */

function Big(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
}

Big.prototype.getName = function () {
    console.log(this.name)
}

function Small(name, age) {
    Big.call(this, name)
    this.age = age
}

// type1  一次是设置子类型实例的原型的时候
Small.prototype = new Big()

// type2  一次在创建子类型实例的时候
var small = new Small('qker', 27)
small.colors.push('black')

console.log(small.name) // qker
console.log(small.age, small.colors) // 27 ['red', 'blue', 'green', 'black']

// 在控制台可以看到 会发现 Small.prototype 和 small 都有一个属性为colors，属性值为['red', 'blue', 'green']
// 解决方式在 寄生组合式继承
console.log(small)

/*
4.原型式继承  就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型
    缺点：
    包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样
 */

function createObj(o) {
    function F() { }
    F.prototype = o
    return new F()
}

/*
5.寄生式继承  创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
    缺点：
    跟借用构造函数模式一样，每次创建对象都会创建一遍方法
 */
function createObj2(o) {
    var clone = object.create(o)
    clone.sayName = function () {
        console.log('12sayName')
    }
    return clone
}

/*
6.寄生组合式继承
    这种方式的高效率体现它只调用了一次 Parent 构造函数
    并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性
    与此同时，原型链还能保持不变
    因此，还能够正常使用 instanceof 和 isPrototypeOf
    开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */

function objectClone(o) {
    function F() { }
    F.prototype = o
    return new F()
}

function prototype(child, parent) {
    var prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}

// 当我们使用时候
prototype(Child, Parent)
