// JS 中 flat-- - 数组扁平化

// 多维数组 ==> 一维数组

let ary = [1, 2, [3, 3, 4, [5, 6], 6], 4]

let str = JSON.stringify(ary)

  ```
  1. 调用 ES6 的 flat 方法
      ary = ary.flat(Infinity)
  
  2. replace  + split
      ary = str.replace(/(\[|\])/g, '').split(',')
  
  3. replace + JSON.parse
      str = str.replace(/(\[|\])/g, '')
      str = '[' + str + ']'
      ary = JSON.parse(str)
  
  4. 普通递归
      let result = []
      let fn = function (ary) {
        for (let i = 0; i < ary.length; i++) {
          let item = ary[i]
          if (Array.isArray(ary[i])) {
            fn(item)
          } else {
            result.push(item)
          }
        }
      }
  
  5. 利用 reduce 函数迭代
      function flatten (ary) {
        return ary.reduce((pre, cur) => {
          return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
        }, [])
      }
      let ary = [1, 2, 3, 4, [4, 5,6], [5,7, [8,9], 0], 9]
      console.log(flatten(ary))
  
  6. 扩展运算符
      while (ary.some(Array.isArray)) {
        ary = [].concat(...ary)
      }
```