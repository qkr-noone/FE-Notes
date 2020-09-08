/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let MAX = Math.pow(2, 31) - 1
  let MIN = Math.pow(-2, 31)
  if (x < MIN || x > MAX) {
    return 0
  } else {
    let val = 0,
      temp = x < 0 ? Math.abs(x) : x
    for (let i = temp; i >= 1; i = Math.floor(i / 10)) {
      const pop = i % 10
      if (val > MAX / 10 || (val === MAX / 10 && pop > 7)) {
        return 0
      }
      if (val < MIN / 10 || (val === MIN / 10 && pop < -8)) {
        return 0
      }
      val = val * 10 + pop
    }
    return x < 0 ? 0 - val : val
  }
};

// 范围思路 https://leetcode-cn.com/problems/reverse-integer/solution/hua-jie-suan-fa-7-zheng-shu-fan-zhuan-by-guanpengc/
// 链接：https://leetcode-cn.com/problems/reverse-integer/solution/7-zheng-shu-fan-zhuan-javascript-de-liang-chong-ji/
// var reverse = function (x) {
//   let ans = 0
//   let value = Math.abs(x);
//   let MAX = Math.pow(2, 31) - 1
//   let MIN = Math.pow(-2, 31)
//   if (x < MIN || x > MAX) {
//     return 0
//   } else {
//     while (value !== 0) {
//       const pop = value % 10
//       if (ans > MAX / 10 || (ans === MAX / 10 && pop > 7)) {
//         return 0
//       }
//       if (ans < MIN / 10 || (ans === MIN / 10 && pop < -8)) {
//         return 0
//       }
//       ans = ans * 10 + pop
//       value = Math.floor(value / 10)
//     }
//     return (x >= 0 ? ans : - ans)
//   }
// };
// @lc code=end

