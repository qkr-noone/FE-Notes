// 类的内部和累的外部
/* public 公有的 内外都可以使用
  private 私有的 在类的内部使用 继承和外部都不能使用
  protected 受保护的 在类的内部使用 继承时候允许在类的内部使用 不能再外部使用
 */
class Person{
    public name : string
    private age: 20
    public sayHello() {
        console.log('hi qkr')
    }
}

class Teacher extends Person {
    public sayBye() {
        this.name
    }
}

const person = new Person()
person.name = 'qkr'
// console.log(person.age) // 报错
console.log(person.name) // qkr
person.sayHello() // hi qkr
export { }