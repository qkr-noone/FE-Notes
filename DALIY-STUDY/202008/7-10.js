// 1.冒泡排序 遍历将最大或最小推到前面，越往后遍历次数越少
const bubbleSort = function (arr) {
  const list = arr.slice()
  let len = list.length
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (list[j] > list[j - 1]) {
        let temp = list[j]
        list[j] = list[j - 1]
        list[j - 1] = temp
      }
      console.log(2)
    }
    console.log(1)
  }
  return list
}
console.log(bubbleSort([6, 555, 4, 1, 2, 3, 5]))

// 2.改进版冒泡排序
// 优化思路：当遍历前后数组不产生变化时，说明改数组已经有序，结束排序。
const bubbleSort2 = arr => {
  const list = arr.slice()
  const len = list.length
  for (let i = 0; i < len; i++) {
    let exchange = false
    for (let j = len - 1; j > i; j--) {
      if (list[j] > list[j - 1]) {
        let temp = list[j]
        list[j] = list[j - 1]
        list[j - 1] = temp
        exchange = true
      }
    }
    if (!exchange) return list
  }
  return list
}
console.log(bubbleSort2([6, 5, 4, 2, 3, 2, 1]))

// 选择排序 在无序区中选出最小的元素，然后将它和无序区的第一个元素交换位置。
const selectionSort = arr => {
  const list = arr.slice()
  const len = list.length
  for(let i = 0; i < len; i++) {
    let key = i
    for(let j = len - 1; j > i; j--) {
      if (list[j] < list[key]) key = j
    }
    if (key !== i) {
      const temp = list[key]
      list[key] = list[i]
      list[i] = temp
    }
  }
  return list
}
console.log(selectionSort([2, 77, 0, 99, 12, 1]))

// 插入排序 img => gif 解释
const insertSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 1; i < len; i++) {
    let temp = list[i]
    let j = i - 1
    while (j >=0 && temp < list[j]) {
      list[j + 1] = list[j]
      j--
    }
    list[j + 1] = temp
  }
  return list;
}

console.log(insertSort([2, 77, 0, 99, 12, 1]))

// 快速排序
function quickSort(arr) {
  const list = arr.slice(); //保证函数为纯函数
  if (list.length <= 1) return list
  const point = list.splice(0, 1)[0] // 选第一个作为基数
  const left = []
  const right = []
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i] < point) {
      left.push(list[i])
    } else {
      right.push(list[i])
    }
  }
  return quickSort(left).concat([point], quickSort(right))
}
console.log(quickSort([2, 77, 0, 99, 12, 1, 0, 9]))

// 异步加载图片
function loadImageAsync (url) {
  return new Promise((resolve, reject) => {
    const image = new Image() // 节点需在html
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('Could not load image at ' + url))
    }
    image.src = url
  })
}

// 加载图片
const preloadImage = path => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = path
  })
}

// 两数之和
function addTwo(arr, target) {
  let map = new Map()
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) return [map.get(arr[i]), i]
    else map.set((target - arr[i]), i)
  }
}
let arr2 = [2, 75, 7, 15], target2 = 90
let arr1 = [2, 7, 11, 15], target1 = 9
console.log(addTwo(arr1, target1)) // [0, 1]
console.log(addTwo(arr2, target2)) // [1, 3]