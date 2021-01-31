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

let tupleType: [string, boolean];
tupleType = ['memo', true];

class PersonAlpha {
    private _pre: string = '';
    constructor(str: string) {
        this._pre = str
    }
    get name(): string {
        return this._pre;
    }
    set name(newPre: string) {
        this._pre = newPre;
    }
    mover(dis: number = 0) {
        console.log(`${this._pre} moved ${dis}m.`);
    }
}

let personAl = new PersonAlpha('val');
console.log(personAl.name); // val
personAl.name = 'new_val'
console.log(personAl.name); // new_val

class Snake extends PersonAlpha {
    #temp: string;
    constructor(name: string, wait: string) {
        super(name);
        this.#temp = wait;
    }
    mover(dis = 5) {
        super.mover(dis)
    }
    greet() {
        console.log(`hello ${this.#temp}`);
    }
}
const snake = new Snake('snake', '5');
snake.mover() // snake moved 5m.

// 泛型接口
interface identityFn<T> {
    (arg: T): T;
}
// 泛型类
class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}
const myGeneric = new GenericNumber<number>();
myGeneric.zeroValue = 0;
myGeneric.add = function(x, y) {
    return x + y;
}
// 泛型变量

// 交叉类型
interface Gama {
    name: string;
    gender: string;
}
interface Company {
    companyName: string;
}
type Staff = Gama & Company;
const staff: Staff = {
    name: 'one',
    gender: 'man',
    companyName: 'ZCY',
}

// 联合类型
function onePie(param: string | number | boolean): void {
    console.log('this is the union type');
}

// 类型保护
interface Beta {
    name: string;
    gender: string;
}
interface Employee {
    name: string;
    company: string;
}
type unknownStaff = Beta | Employee;
// in 类型保护
function getInfo(staff: unknownStaff) {
    if ('gender' in staff) {
        console.log('Person');
    }
    if ('company' in staff) {
        console.log('Employee');
    }
}
// typeof 类型保护
function processData(param: string | number): unknown {
    if (typeof param === 'string') {
        return param.toUpperCase()
    }
    return param
}
// instanceof 类型保护
function gamma(param: Date | RegExp) {
    if (param instanceof Date) {
        return param.getTime()
    }
    return param;
}
// 自定义 类型保护
interface Belta {
    url: string;
    onSuccess?: () => void;
    onError?: () => void;
}
function validReqParams(request: any): request is Belta {
    return request && request.url
}
interface DataType {
    key: string;
}
function getLoSto<T>(key: string): T | null {
    const str = window.localStorage.getItem(key);
    return str ? JSON.parse(str) : null;
}
const data = getLoSto<DataType>('USER_KEY')

export {}