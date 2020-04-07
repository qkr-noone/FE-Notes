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
  // js 极值 存在问题
  let MAX = Math.pow(2, 31) - 1
  let MIN = Math.pow(-2, 31)
  if (x < MIN || x > MAX) return 0
  let val = 0,
    temp = x < 0 ? Math.abs(x) : x
  for (let i = temp; i >= 1; i = Math.floor(i / 10)) {
    val = val * 10 + i % 10
  }
  return x < 0 ? 0 - val : val
};
// @lc code=end

