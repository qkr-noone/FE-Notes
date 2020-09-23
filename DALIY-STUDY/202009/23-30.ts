function greet(person: string) {
  return 'hello ' + person
}
console.log(greet('TS')) // hello TS
// Boolean
let isDone: boolean = false
// Number
let count: number = 10
// String
let name: string = 'qkr'
// Symbol
const sym = Symbol(12)
let obj = {
  [sym]: 'sks'
}
console.log(obj[sym]); // sks

// Array
let list: number[] = [1, 2, 3]
let data: Array<number> = [1, 2, 3] // Array<number>泛型语法

// Enum
// 数字枚举
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}
let dir: Direction = Direction.NORTH
console.log(dir) // 0

// 字符串枚举
enum Str {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}
let vstr: Str = Str.NORTH
console.log(vstr) // NORTH

// 数字枚举除了支持 从成员名称到成员值 的普通映射之外，它还支持 从成员值到成员名称 的反向映射
let dirName = Direction[0]
let dirVal = Direction['NORTH']
console.log(dirName, dirVal); // NORTH 0

// 常量枚举
const enum DirectionM {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
let dirm: DirectionM = DirectionM.WEST
console.log(dirm); // 3

// 异构枚举
enum Enum {
  A,
  B,
  C = 'C2O',
  E = 8,
  F,
}
console.log(Enum.A, Enum[0]); // 0 'A'
console.log(Enum.C); // C2O

// Any
let notS: any = 666
notS = 'q99'
notS = false

let vany: any
// vany.foo.bar
// vany.trim()
// vany()
// new vany()

// Unknown
let unvalue: unknown
unvalue = true
unvalue = 10
unvalue = '12'
unvalue = Math.random
unvalue = null
unvalue = undefined
unvalue = new TypeError()
unvalue = []

// Typle
let tupleType: [string, boolean]
tupleType = ['ssk', true]

// Void
function warn(): void {
  console.log(12) // 12
}
warn()

// Null Undefined
let u: undefined = undefined
let n: null = null

// object, Object {}

// Never

export { }