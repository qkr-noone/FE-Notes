/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 双指针 / 从后向前 https://leetcode-cn.com/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-leetcode/
// 时间复杂度：O(M + N) 空间复杂度：O(1)
// https://github.com/azl397985856/leetcode/blob/master/assets/problems/88.merge-sorted-array-1.png?raw=true
/* var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1, p = m + n - 1
  while (p2 >= 0) {
    nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]
  }
  console.log(nums1)
  console.log(nums2)
}; */
// 8/25 双指针
var merge = function (nums1, m, nums2, n) {
  let len = m + n - 1
  let left = m - 1, right = n - 1
  while (right >= 0) {
    if (left < 0) { // 注意 nums1=[0]  nums2=[1]
      nums1[len] = nums2[right]
      right--
      len--
    } else if (nums2[right] >= nums1[left]) {
      nums1[len] = nums2[right]
      right--
      len--
    } else {
      nums1[len] = nums1[left]
      left--
      len--
    }
  }
};
// @lc code=end

// 简单的 js
/* var merge = function (nums1, m, nums2, n) {
  if (n === 0) {
    return
  }
  let cur2 = 0
  for (let i = nums1.length - 1; i >= nums1.length - n; i--) {
    nums1[i] = nums2[cur2++]
  }
  nums1.sort((a, b) => a - b)
  console.log(nums1)
}; */
