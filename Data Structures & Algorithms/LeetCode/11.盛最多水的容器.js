/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力解法
// 时间复杂度：O(n^2)， 计算所有 n(n - 1) / 2 种高度组合的面积。
// 空间复杂度：O(1)， 使用恒定的额外空间
// var maxArea = function(height) {
//   let maxarea = 0;
//   for (let i = 0; i < height.length; i++) {
//     for (let j = i + 1; j < height.length; j++) {
//       maxarea = Math.max(maxarea, Math.min(height[i], height[j]) * (j - i));
//     }
//   }
//   return maxarea;
// };
// 双指针
// 论证： https://leetcode-cn.com/problems/container-with-most-water/solution/container-with-most-water-shuang-zhi-zhen-fa-yi-do/
// 面积 S(i,j)=min(h[i],h[j])×(j−i)
// 时间复杂度：O(n)， 一次扫描
// 空间复杂度：O(1)， 使用恒定的额外空间
var maxArea = function(height) {
  let left = 0;
  let right = height.length - 1;
  let maxarea = 0;
  
  while (left < right) {
    const min = Math.min(height[left], height[right])
    maxarea = Math.max(maxarea, min * (right - left))
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return maxarea;
};
// @lc code=end

