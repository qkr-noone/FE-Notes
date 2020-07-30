/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
// 暴力解法 Time: O(n^2) 循环运行 n(n-1) / 2 次  Space: O(1)  只使用了常数个变量
var maxProfit = function(prices) {
  let max = 0
  let length = prices.length
  for (let i = 0; i < length; ++i) {
    for (let j = i + 1; j < length; ++j) {
      max = Math.max(max, prices[j] - prices[i])
    }
  }
  return max
};
// @lc code=end

