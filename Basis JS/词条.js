`
活动对象（AO）
变量对象（VO）
执行上下文(execution context) https://juejin.im/post/58ec3cc944d90400576a2cdc
函数生命周期 https://pic4.zhimg.com/v2-88a513ba2ce27b5b41ec6e188d07b30f_r.jpg
`

// 闭包 https://juejin.im/post/5b081f8d6fb9a07a9b3664b6  https://juejin.im/post/5b1fa77451882513ea5cc2ca
// 作用域 作用域链 https://juejin.im/post/5afb0ae56fb9a07aa2138425

// 原型 原型链
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
第二种是使用 isPrototypeOf() 方法, 同样只要是原型链中出现过的原型,isPrototypeOf() 方法就会返回true.
console.log(Object.prototype.isPrototypeOf(instance))
`
// 拓展
// 继承 -> Class -> new 
