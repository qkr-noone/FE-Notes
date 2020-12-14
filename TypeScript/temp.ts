class Person {
    constructor(public name: string) {
    }
}
const person = new Person('qkr00')
console.log(person.name);

// readonly 不可修改
class Only {
    public readonly _name: string;
    constructor(name: string) {
        this._name = name
    }
}

const only = new Only('122')
console.log(only._name);

// 抽象类
abstract class Girl {
    abstract skill() :void
}

class Waiter extends Girl {
    skill() {
        console.log('is waiter');
    }
}

class BaseTeacher extends Girl {
    skill() {
        console.log('is BaseTeacher');
    }
}

class seniorTeacher extends Girl {
    skill() {
        console.log('i seniorTeacher');
    }
}

interface WaiterOJ {
    service: boolean;
    talk: () => {};
}
interface Tea {
    service: boolean;
    skill: () => {};
}
function judge(someok: WaiterOJ | Tea) {
    if (someok.service) {
        (someok as Tea).skill()
    } else {
        (someok as WaiterOJ).talk()
    }
}

function okju(params: WaiterOJ | Tea) {
    if ('skill' in params) {
        params.skill();
    } else {
        params.talk();
    }
}

function add(first: string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `just string ${first}${second}`
    }
    return first + second
}

class XiXi {
    constructor(private _age: number) {
    }
    get age() {
        return this._age - 10
    }
    set age(age: number) {
        this._age = age + 3
    }
}
const dear = new XiXi(25)
console.log(dear.age); // 15
dear.age = 20
console.log(dear.age); // 13

class Girl12 {
    sayKit() {
        return '122'
    }
    static sayBay() {
        return 'bay 12'
    }
}
const girl = new Girl12()
console.log(girl.sayKit()); // 122
// console.log(girl.sayBay()); // 报错
console.log(Girl12.sayBay()); // bay 12

export {}