class Person {
  constructor(public name: string) {}
}
const person = new Person('qkr')
console.log(person.name);

// 只读属性 readonly  修改会报错
class Only {
  public readonly _name: string;
  constructor(name: string) {
    this._name = name
  }
}
const only = new Only('qkr001')
console.log(only._name); // qkr001
// only._name = 'qkkrrr' 报错

// 抽象类
abstract class Girl {
  abstract skill() :void
}

class Waiter extends Girl {
  skill() {
    console.log('is waiter');
  }
}

class BaseTeacher extends Girl{
  skill() {
    console.log('is BaseTeacher')
  }
}

class seniorTeacher extends Girl{
  skill() {
    console.log('is seniorTeacher')
  }
}

export{}
