// 用于封装
class XiaoXiao {
    constructor(private _age : number) {}
    get age() {
        return this._age - 10
    }
    set age(age: number) {
        this._age = age + 3
    }
}
const dear = new XiaoXiao(28)
console.log(dear.age) // 18
dear.age = 22
console.log(dear.age) // 15

// static 静态类 直接可以通过类名访问静态方法
class Girl {
    sayLove() {
        return 'Hi !'
    }
    static sayStatic() {
        return 'Hi Static !'
    }
}
const girl = new Girl()
console.log(girl.sayLove()) // Hi !
console.log(Girl.sayStatic()) // Hi Static !

export{}