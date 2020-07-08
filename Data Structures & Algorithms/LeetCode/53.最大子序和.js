/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 动态规划解析： https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/
 */

// 分治法 https://leetcode-cn.com/problems/maximum-subarray/solution/zheng-li-yi-xia-kan-de-dong-de-da-an-by-lizhiqiang/
// 时间复杂度 O(nlog(n))，空间复杂度 O(log(n))
var maxSubArray = function (nums) {
  return maxSubArrayDivideWithBorder(nums, 0, nums.length - 1)
};
var maxSubArrayDivideWithBorder = function(nums, start, end) {
  if (start === end) {
    // 只有一个元素，也就是递归的结束情况
    return nums[start]
  }
  let center = (start + end) / 2
  // 计算左侧子序列最大值
  let leftMax = maxSubArrayDivideWithBorder(nums, start, center)
  // 计算右侧子序列最大值
  let rightMax = maxSubArrayDivideWithBorder(nums, center + 1, end)

  // 计算横跨两个子序列的最大值

  // 计算包含左侧子序列最后一个元素的子序列最大值
  let leftCrossMax = nums[center]
  let leftCrossSum = 0
  for (let i = center; i >= start; i--) {
    leftCrossSum += nums[i]
    leftCrossMax = Math.max(leftCrossSum, leftCrossMax)
  }
  
  // 计算包含右侧子序列最后一个元素的子序列最大值
  let rightCrossMax = nums[cnter + 1]
  let rightCrossSum = 0
  for (let i = center + 1; i <= end; i++) {
    rightCrossSum += nums[i]
    rightCrossMax = Math.max(rightCrossSum, rightCrossMax)
  }

  // 计算跨中心的子序列的最大值
  let crossMax = leftCrossMax + rightCrossMax

  // 比较三者， 返回最大值
  return Math.max(crossMax, Math.max(leftMax, rightMax))
};

//动态规划
// 时间复杂度：O(n)O(n) ，其中 nn 为 nums 数组的长度。我们只需要遍历一遍数组即可求得答案。
// 空间复杂度：O(1)O(1) 。我们只需要常数空间存放若干变量。
/* var maxSubArray = function(nums) {
  let pre = 0, max = nums[0]
  nums.forEach(x => {
    pre = Math.max(pre + x, x)
    max = Math.max(pre, max)
  })
  return max
}; */

// 贪心法
// 从左向右迭代，一个个数字加过去，如果 sum < 0, 重新开始找子序串
// 时间复杂度 O(n)，空间复杂度 O(1)
/* var maxSubArray = function(nums) {
  let result = nums[0], sum = 0
  for (const num of nums) {
    sum += num
    result = Math.max(result, sum)
    // 如果 sum < 0, 重新开始找子序串
    if (sum < 0) {
      sum = 0
    }
  }
  return result
}; */

// 暴力解法 时间复杂度 O(n^2)，空间复杂度 O(1)
/* var maxSubArray = function (nums) {
  // 类似寻找最大最小值的题目，初始值一定要定义成理论上的最小最大值
  let max = nums[0], length = nums.length
  for (let i = 0; i < length; i++) {
    let sum = 0
    for (let j = i; j < length; j++) {
      sum += nums[j]
      if (sum > max) {
        max = sum
      }
    }
  }
  return max
}; */
// @lc code=end

