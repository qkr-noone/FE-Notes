/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// 拷贝覆盖 时间复杂度 O(n), 空间复杂度 O(1) 
// https://leetcode-cn.com/problems/remove-element/solution/hua-jie-suan-fa-27-yi-chu-yuan-su-by-guanpengchn/
// 同理 双指针 https://leetcode-cn.com/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode/
/* var removeElement = function(nums, val) {
  let ans = 0
  for (const item of nums) {
    if (item !== val) {
      nums[ans] = item
      ans++
    }
  }
  return ans
}; */
// 双指针 —— 当要删除的元素很少时
var removeElement = function (nums, val) {
  let i = 0, n = nums.length
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1]
      n--
    } else {
      i++
    }
  }
  return n
};
// @lc code=end

