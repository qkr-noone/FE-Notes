/* 
    Promise.all() 知识点:
    1. 返回一个 Promise 实例 完成状态是一个数组
    2. 参数是可迭代对象 （for of）
    3. 参数是空迭代对象  返回 resolved Promise  => 一个空的数组
    4. 返回按照传入参数顺序返回结果
    5. 只要其中一个 Promise reject 就返回这个 reject
 */


/* Promise.all 的一个简版实现  1 2 3 4 5 */
function myAll(iterable) {
  return new Promise((resolve, reject) => {
    let index = 0
    for (const promise of iterable) {
      const curIndex = index
      // 异步
      promise.then(value => {
        if (anErrorOccurred) {
          return
        }
        // 放入顺序和输入顺序一样
        result[curIndex] = value
        // result 此时长度已确定 通过 elementCount 自增去判断
        // elementCount++
        if (result.length === curIndex + 1) {
          resolve(result)
        }
      }, error => {
        if (anErrorOccurred) {
          return
        }
        anErrorOccurred = true
        reject(error)
      })
      index++
    }
    if (index === 0) {
      resolve([])
      return
    }
    // 异步主体体使用的
    // 此时 index 为参数长度  anErrorOccurred 判断是否有 rejected
    // let elementCount = 0;
    let anErrorOccurred = false;
    const result = new Array(index);
  })
}

let [c, d] = [Promise.resolve(10), Promise.reject(2)]
myAll([c, d]).then(res => {
  console.log('success', res)
}).catch(error => console.log('error', error))