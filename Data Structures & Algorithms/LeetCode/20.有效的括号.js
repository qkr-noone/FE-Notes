/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
  let map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  let rest = []
  for (const val of s) {
    if (val in map) {
      rest.push(val)
    } else {
      if (val !== map[rest.pop()]) {
        return false
      }
    }
  }
  return !rest.length
};
// @lc code=end

