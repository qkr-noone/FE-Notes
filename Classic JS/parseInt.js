// 手写parseInt的实现，要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()
/*
  1. 返回解析后的整数值  第一个无法解析字符 -> NaN， 解析数字+字符 => 只解析数字  -> 整数值
  2. radix 参数为 n 将会把第一个参数看作是一个数的 n 进制表示，而返回的值则是十进制
    例如：
      parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 3*5^0 + 2*5^1 + 1*5^2  = 38
  3. 2 < radix > 36  =>  NaN
  4. 0 undefined null -> radix 10
 */
/* https://github.com/sisterAn/JavaScript-Algorithms/issues/89  https://www.kunjuke.com/jiaocheng/41875/ https://blog.csdn.net/web_Leeleon/article/details/80531683 */

function _parseInt(str, radix) {
  let str_type = typeof str;
  let res = 0;
  if (str_type !== 'string' && str_type !== 'number') {
    // 如果类型不是 string 或 number 类型返回NaN
    return NaN
  }

  // 字符串处理
  str = String(str).trim().split('.')[0]
  let length = str.length;
  if (!length) {
    // 如果为空则返回 NaN
    return NaN
  }

  if (!radix) {
    // 如果 radix 为0 null undefined
    // 则转化为 10
    radix = 10;
  }
  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN
  }

  // 解析数字+字符 => 只解析数字  -> 整数值

  // 正则匹配[+|-]?[0]?[Xx]?[0-9a-fA-F]+
  const regex = /^(?<fuhao>[\+|\-]*)(?<radix>[0]?[Xx]?)(?<num>[0-9a-fA-F]+)/

  // 匹配出符号、进制、数字三个分组
  const groups = str.match(regex).groups

  // 挨个字符串解析，如果遇到无法解析时则停止解析，返回已经解析好的整数
  let splitArr = groups.num.split('')
  const arr = []
  for (let i = 0; i < splitArr.length; i++) {
    // 根据charCode来做转行为实际数据, 0-9为[48-57],A-F为[65-70]
    const charCode = splitArr[i].toUpperCase().charCodeAt()
    let num

    // 字符为[A-F]时, 实际数字为charCode -55
    if (charCode >= 65) num = charCode - 55

    // 字符为[0-9]时, 实际数字为charCode - 48
    else num = charCode - 48

    // 当实际数字大于radix时, 无法解析则停止字符串遍历
    if (num > radix) {
      break
    } else {
      arr.push(num)
    }
  }
  length = arr.length
  // 当实际数字数组长度为0时, 返回NaN
  if (!length) return NaN


  for (let i = 0; i < length; i++) {
    res += Math.floor(arr[length - i - 1]) * Math.pow(radix, i)
  }

  return res;
}
console.log(_parseInt('12b', 36))