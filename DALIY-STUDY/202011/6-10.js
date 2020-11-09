// 复习知识点

// 防抖
function debounce(fn, delay) {
    let timer = null
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

function throttle(fn, cycle) {
    let start = Date.now()
    let now;
    let timer;
    return function() {
        now = Date.now()
        clearTimeout(timer)
        if (now - start >= cycle) {
            fn.apply(this, arguments)
            start = now
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, cycle);
        }
    }
}

function Animal(name, color) {
    this.name = name || 'Animal'
    this.color = color || ['black']
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}
// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food);
}

// 原型链继承 
// new 了一个空对象，这个空对象指向Animal并且Cat.prototype指向了这个空对象，这种就是基于原型链的继承
function Cat(name) {
    this.name = name || 'tom'
}
Cat.prototype = new Animal()
var cat = new Cat()
cat.color.push('red')
cat.sleep()
cat.eat('fish')
console.log(cat.color); // [ 'black', 'red' ]
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
var new_cat = new Cat()
console.log(new_cat.color); // [ 'black', 'red' ]
// 特点：基于原型链，既是父类的实例，也是子类的实例。
// 缺点：1.无法实现多继承；2.所有新实例都会共享父类实例的属性。

// 构造继承
function Dog(name) {
    Animal.call(this)
    this.name = name || 'mica'
}
var dog = new Dog()
dog.color.push('blue')
dog.sleep()
// dog.eat('bone') // TypeError: dog.eat is not a function
console.log(dog.color); // [ 'black', 'blue' ]
console.log(dog instanceof Animal); // false
console.log(dog instanceof Dog); // true
// 特点：可以实现多继承（call多个），解决了所有实例共享父类实例属性的问题。
// 缺点：1.只能继承父类实例的属性和方法；2.不能继承原型上的属性和方法。

// 组合继承
function Mouse(name) {
    Animal.call(this)
    this.name = name || 'jerry'
}
Mouse.prototype = new Animal()
Mouse.prototype.constructor = Mouse
// 特点：可以继承实例属性/方法，也可以继承原型属性/方法
// 缺点：调用了两次父类构造函数，生成了两份实例
