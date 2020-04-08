/*
    实现可迭代对象
    知识点
    ES6里规定，只要在对象的属性上部署了Iterator接口，
    具体形式为给对象添加Symbol.iterator属性，此属性指向一个迭代器方法，
    这个迭代器会返回一个特殊的对象 - 迭代器对象。

    为对象实现一个简单的iterator
 */
let iteraObj = {
  name: 'starry',
  age: 12,
  gender: 'girl'
}

iteraObj[Symbol.iterator] = function () {
  let values = Object.values(this)
  let index = 0
  return {
    next() {
      if (index >= values.length) {
        return {
          done: true,
          value: undefined
        }
      } else {
        return {
          done: false,
          value: values[index++]
        }
      }
    }
  }
}

for (const v of iteraObj) {
  console.log(v)
}

let iterass = [12, 23, 4][Symbol.iterator]()
console.log(iterass.next().value)
console.log(iterass.next().value)

/* 更优雅的实现方式  Generator 生成器*/
let generaObj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'generator'
  }
}
for (const v of generaObj) {
  console.log(v)
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}
console.log(1)
timeout(2000).then(value => console.log(value, 'timeout'))
console.log(2)