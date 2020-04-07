/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const valMap = {}
  for (let index = 0; index < nums.length; index++) {
    const cur = nums[index]
    if (valMap[cur] !== undefined) {
      return [valMap[cur], index]
    } else {
      const rest = target - cur
      valMap[rest] = index
    }
  }
};
// @lc code=end

