/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) return false
  let rev = 0
  for (let i = x; i >= 1; i = Math.floor(i / 10)) {
    rev = rev * 10 + i % 10
  }
  return rev === x
};
// @lc code=end

