/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let ret = []

  let helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }

    let rest = k - prev.length
    for (let i = start; i <= n; i++) {
      if (n - i + 1 < rest) {
        continue
      }
      helper(i + 1, prev.concat(i))
    }
  }
  helper(1, [])
  return ret
};
// @lc code=end

