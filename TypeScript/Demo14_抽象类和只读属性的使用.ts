/* 
demo14 抽象类和只读属性的使用
readonly 只读属性
 */

class Person {
    public readonly _name: string
    constructor(public name: string) {
        this._name = name
    }
}

const person = new Person('qkr qq')

console.log(person.name) // qkr qq

// 只读属性
// person._name = '12' // TSError: '_name' because it is a read-only property.

abstract class Girl {
    abstract skill() :void
}

class Waiter extends Girl {
    skill() {
        // 业务逻辑不通
        console.log('young')
    }
}

class BaseTeacher extends Girl {
    skill() {
        console.log('Base')
    }
}

class seniorTeacher extends Girl {
    skill() {
        console.log('Topic')
    }
}

export{}