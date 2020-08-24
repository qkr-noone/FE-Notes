/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
/* 因为最多只需要遍历一次 0~sqrt(target)，所以时间复杂度为 O(sqrt(target))。又因为只使用了两个额外的变量，因此空间复杂度为 O(1) */
var judgeSquareSum = function(c) {
  if (c < 0) return false
  // 主要 Math.sqrt() 取到值 存在丢失精度，使用 Math.floor() 向下取整
  let left = 0, right = Math.floor(Math.sqrt(c))
  while (left <= right) {
    let sum = left * left + right * right
    if (sum === c) return true
    else if (sum > c) right--
    else left++
  }
  return false
};
// @lc code=end

