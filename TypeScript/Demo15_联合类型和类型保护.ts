interface Waiter {
  service: boolean;
  talk: () => {};
}
interface Teacher {
  service: boolean;
  skill: () => {};
}

// 所谓联合类型，可以认为一个变量可能有两种或两种以上的类型。
function doSome (tko: Waiter | Teacher) {
  // tko.service() // 报错
}

// 这些接口中都包含一个 service 属性，该属性被称为可辨识的属性
function judge(animal: Waiter | Teacher) {
  // animal.skill() 报错
  // 类型保护-类型断言
  // 类型断言就是通过断言的方式确定传递过来的准确值
  // 比如上面的程序，如果 service，说明他就是 Teacher,
  // 这时候就可以通过断言 animal as Teacher, 然后直接调用skill方法,程序就不再报错了
  if (animal.service) {
    (animal as Teacher).skill()
  } else {
    (animal as Waiter).talk()
  }
}

// 类型保护 in 语法
function judgeTwo(animal: Waiter | Teacher) {
  if ('skill' in animal) {
    animal.skill();
  } else {
    animal.talk();
  }
}

// 类型保护 typeof 语法
function add(first: string | number, second: string | number) {
  // 不做任何的类型保护，只是相加，这时候就会报错
  // return first + second
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// 类型保护 instanceof 语法  instanceof 只能用在类上
class NumberObj {
  count: number;
  constructor(count: number) {
    this.count = count
  }
}
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count 
  }
  return 0
}
export{}