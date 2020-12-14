class Person {
    // public name: string;
    // constructor(name: string) {
    //     this.name = name
    // }
    // 简化成
    constructor(public name: string) {
        this.name = name
    }
}

const person = new Person('qkr')
console.log(person.name) // qkr

/* 
"有构造函数"
子类继承父类并有构造函数的原则，就是在子类里写构造函数时，
必须用super()调用父类的构造函数，如果需要传值，也必须进行传值操作。
就是是父类没有构造函数，子类也要使用super()进行调用，否则就会报错。
 */

class Teacher extends Person {
    constructor(public age: number) {
        // 子类中使用构造函数需要用 super() 调用父类的构造函数 不然会报错
        super('qkr007')
    }
}


const teacher = new Teacher(26)
console.log(teacher.name, teacher.age) // qkr007 26


class Parent {} // 有默认构造函数
class Child extends Parent {
    constructor() {
        super()
    }
}

export{}