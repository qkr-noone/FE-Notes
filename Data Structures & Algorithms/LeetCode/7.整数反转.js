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
// var reverse = function(x) {
//   // js 极值 存在问题
//   let MAX = Math.pow(2, 31) - 1
//   let MIN = Math.pow(-2, 31)
//   if (x < MIN || x > MAX) {
//     return 0
//   } else {
//     let val = 0,
//       temp = x < 0 ? Math.abs(x) : x
//     for (let i = temp; i >= 1; i = Math.floor(i / 10)) {
//       val = val * 10 + i % 10
//     }
//     return x < 0 ? 0 - val : val
//   }
// };
// https://leetcode-cn.com/problems/reverse-integer/solution/wei-yun-suan-ji-jian-jie-fa-by-ijzqardmbd/
var reverse = function (x) {
  let result = 0;
  while (x !== 0) {
    result = result * 10 + x % 10;
    x = (x / 10) | 0; // 运算符规则
  }
  return (result | 0) === result ? result : 0;
};
// @lc code=end

