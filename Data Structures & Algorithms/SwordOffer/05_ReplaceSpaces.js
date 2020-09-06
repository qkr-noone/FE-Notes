/* 
剑指 Offer 05. 替换空格

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."
 */

// 2020-09-06

var replaceSpaces = function (str) {
  if (!str || !str.length) {
    return ''
  }

  let initLen = 0, numOfBlank = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      ++numOfBlank
    } else {
      ++initLen
    }
  }
  let newLen = initLen + numOfBlank * 2

  // 双指针
  /* let indexOfInit = initLen
  let indexOfNew = newLen
  console.log(indexOfInit, indexOfNew)
  while(indexOfInit >= 0 && indexOfNew > indexOfInit) {
    if (str[indexOfInit] === ' ') {
      str[--indexOfNew] = '0'
      str[--indexOfNew] = '2'
      str[--indexOfNew] = '%'
      console.log(indexOfNew, 12)
    } else {
      str[--indexOfNew] = str[indexOfInit]
    }
    --indexOfInit
  }
  return str */
  // https://github.com/zhedahht/CodingInterviewChinese2/blob/master/05_ReplaceSpaces/ReplaceSpaces.cpp
  // 失败原因 在原来的字符串上进行替换：
  // 字符串不能追加长度，还需要一个前提条件 => 保证输入的字符串后面有足够多的空余内存
  // 官方的剑指Offer 是提供 length 的。

  // 转成数组 -> 创建了新的字符串
  const arr = new Array(newLen)
  // i 是新字符串的下标
  // j 是原字符串的下标
  for (let i = 0, j = 0; j < str.length; j++) {
    if (str[j] === ' ') {
      arr[i++] = '%'
      arr[i++] = '2'
      arr[i++] = '0'
    } else {
      arr[i++] = str[j]
    }
  }
  return arr.join('')
}
console.log(replaceSpaces('We are happy.'))
// 其他解法

/* return s.replace(/ /g, "%20"); */

/* if (typeof s == "string" && s.length >= 0 && s.length <= 10000) {
  return s.split(' ').join('%20');
}
return ''; */