// type annotation 类型注解
// type inference 类型推断

/* 如果 ts 能够自动分析变量类型， 我们就什么不需要做了 */
/* 如果 ts 无法分析变量类型的话，我们就需要使用类型注解 */
// tip 鼠标移到变量上可以看到
let count : number ;
count = 123;

let countInference = 123 // 可以推断
const one = 1
const two = 2
const three = one + two // 可以推断

function getTotal(one: number, two: number) { // 不可以推断
    return one + two
}
const total = getTotal(1, 2) // 可以推断

const xJJ = { // 可以推断   
    name: 'qkr', // 可以推断
    age: 20 // 可以推断
}
export { }