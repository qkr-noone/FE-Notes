const count : number = 980
const myName : string = 'noone'
// null  undefine  boolean  voud  symbol

const liXiao : {
    name:string,
    age:number
} = {
    name: 'xiaoqing',
    age: 20
}
const liu : string [] = ['qing', 'xian']

class Person {}
const xiao : Person = new Person()

const funFun : () => string = () => {return 'word'}
// 对象类型  数组类型  类类型  函数类型

console.log(count, myName, liXiao, liu, xiao, funFun())
export{}