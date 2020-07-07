/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 双指针
/* 
  时间复杂度：O(n)，假设数组的长度是 n，那么 i 和 j 分别最多遍历 n 步。
  空间复杂度：O(1)。
*/
var removeDuplicates = function(nums) {
  if (nums.length === 0) return nums
  let i = 0
  for (let j = 0; j < nums.length; j++) {
    const element = nums[j];
    if (nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
};
// @lc code=end

