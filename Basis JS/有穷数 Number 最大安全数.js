let q = 'welcome'
let k = `waiting.....${q}<br/>`
let binary = 0b010101
let octal = 0o6661
document.write(k.repeat(2) + binary + '/' + octal)

// isFinite 是否是一个有穷数
let a = 11 / 4
console.log(Number.isFinite(a))
console.log(Number.isFinite('ss'))
console.log(Number.isFinite(NaN))
console.log(Number.isFinite(undefined))
console.log(Number.isNaN(NaN))
// 判断是否是整数
let isInteer = 92.9
console.log('interIs:' + Number.isInteger(isInteer))
// 整数有一个取值范围的
let max = Math.pow(2, 53) - 1 // 最大 max  -max 最小
console.log(max) //9007199254740991
// 可以通过最大、最小安全整数 取到
console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
// 整数判断isSafeInteger()
console.log('isSafeIntegerisInteer', Number.isSafeInteger(octal))